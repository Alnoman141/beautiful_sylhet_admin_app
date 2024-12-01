<template>
  <ElCard shadow="always" class="mt-3 mb-5">
    <div class="d-flex justify-space-between">
      <h3>Sub Location List</h3>
      <ElButton type="primary" @click="openCreateModal"> Add New </ElButton>
    </div>
  </ElCard>

  <ElCard>
    <div class="mb-5">
      <el-input
        v-model="query.name"
        v-debounce:300="getSubLocations"
        style="width: 240px"
        placeholder="Search by Name"
      />
      <el-button
        @click.prevent="getSubLocations"
        :disabled="!query.name"
        class="mx-3"
        type="primary"
        >Search</el-button
      >
    </div>
    <ElTable
      v-loading="loading"
      :data="subLocations"
      border
      style="width: 100%"
      :row-style="configStore.getRowStyle"
      :header-cell-style="configStore.getHeaderRowStyle"
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <ElTableColumn prop="id" label="ID" width="100" sortable />
      <ElTableColumn prop="name" label="Name" sortable min-width="200" />
      <ElTableColumn prop="name" label="Location Name" sortable min-width="200">
        <template #default="scope">
          <span>{{ scope.row?.location?.name }}</span>
        </template>
      </ElTableColumn>

      <ElTableColumn label="Action" prop="name">
        <template #default="scope">
          <ElButton size="small" type="info" @click="getSubLocation(scope.row.id)">
            Edit
          </ElButton>
          <!-- <ElButton
          size="small"
          type="danger"
        >
          Delete
        </ElButton> -->
        </template>
      </ElTableColumn>
    </ElTable>
  </ElCard>
  <v-card v-if="total > query.per_page" class="d-flex justify-end mt-5 mx-auto py-3">
    <ElPagination
      v-model:current-page="query.page"
      v-model:page-size="query.per_page"
      background
      :pager-count="pagerCount"
      :page-sizes="[20, 50, 100, 250, 500, 1000]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </v-card>
  <ElDialog
    v-model="dialogFormVisible"
    :title="`${form.id ? 'Update' : 'Create New'} Sub Location`"
    width="500"
  >
    <ElForm
      ref="ruleFormRef"
      v-loading="loading"
      style="max-width: 600px"
      :model="form"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      label-position="left"
      :size="formSize"
      status-icon
      clearable
    >
      <ElFormItem label="Location name" prop="location_id">
        <ElAutocomplete
          v-model="location"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          class="inline-input w-100"
          placeholder="Type location name to search"
          @select="handleSelect"
          @clear="form.location_id = null"
        />
      </ElFormItem>
      <ElFormItem label="Sub Location name" prop="name">
        <ElInput v-model="form.name" placeholder="Enter sub location name" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialogFormVisible = false"> Cancel </ElButton>
        <ElButton type="primary" @click="onSubmit"> Confirm </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup>
import { useConfigStore } from "@/@core/stores/config";
import { useSubLocationStore } from "@/stores/subLocationStore";
import { useLocationStore } from "@/stores/locationStore";
import { notify } from "@/utils/notification";
import { onMounted, reactive, ref } from "vue";

const configStore = useConfigStore();
const subLocationStore = useSubLocationStore();
const locationStore = useLocationStore();

const subLocations = ref([]);
const loading = ref(false);

const pagerCount = ref(5);
const total = ref(0);

const dialogFormVisible = ref(false);

const location = ref(null);
const form = reactive({
  name: "",
  location_id: null,
  id: null,
});

const query = reactive({
  per_page: 20,
  page: 1,
  name: "",
});

const formLabelWidth = "140px";
const formSize = ref("default");
const ruleFormRef = ref();

const rules = reactive({
  name: [
    { required: true, message: "Please input the sub location name", trigger: "blur" },
    { min: 3, message: "Length should be more than 3", trigger: "blur" },
  ],
  location_id: [
    { required: true, message: "Please select a location", trigger: "input" },
    {
      type: "number",
      message: "Please select a valid location",
      trigger: "blur",
    },
  ],
});

const openCreateModal = () => {
  form.name = "";
  form.id = null;
  form.location_id = null;
  location.value = null;

  dialogFormVisible.value = true;
};

const getSubLocations = async () => {
  loading.value = true;
  try {
    const { data } = await subLocationStore.getSubLocations(query);

    subLocations.value = data.data.data;
    total.value = data.data.total;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

const handleSizeChange = (val: number) => {
  query.per_page = val;
  getSubLocations();
};
const handleCurrentChange = (val: number) => {
  query.page = val;
  getSubLocations();
};

const onSubmit = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        let res = null;
        if (form.id) {
          res = await subLocationStore.updateSubLocation(form);
        } else {
          res = await subLocationStore.createSubLocation(form);
        }

        if (res.status === 200) {
          dialogFormVisible.value = false;
          getSubLocations();
          notify("Success", res.data.message, "success", "top-right");

          // Reset form
          form.name = "";
          form.id = null;
          form.location_id = null;
          location.value = null;
        }
        loading.value = false;
      } catch (error) {
        notify(
          error?.response?.data?.message,
          error?.response?.data?.error,
          "error",
          "top-right"
        );
        loading.value = false;
      }
    }
  });
};

const getSubLocation = (id) => {
  const subLocation = subLocations.value.find((subLocation) => subLocation.id === id);
  if (subLocation) {
    form.name = subLocation.name;
    form.id = subLocation.id;
    form.location_id = subLocation.location_id;
    location.value = subLocation.location?.name;
    dialogFormVisible.value = true;
  }
};

const querySearch = async (queryString, cb) => {
  if (!queryString) {
    return;
  }

  try {
    const { data } = await locationStore.getLocations({ name: queryString });

    const results = data.data.data.map((item) => {
      return {
        value: item.name,
        location_id: item.id,
      };
    });

    cb(results);
  } catch (error) {
    console.log(error);
  }
};

const handleSelect = (item) => {
  form.location_id = item.location_id;
  location.value = item.value;
};

onMounted(() => {
  getSubLocations();
});
</script>
