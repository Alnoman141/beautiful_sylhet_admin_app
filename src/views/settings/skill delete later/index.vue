<template>
  <ElCard shadow="always" class="mt-3 mb-5">
    <div class="d-flex justify-space-between">
      <h3>Skill List</h3>
      <ElButton type="primary" @click="openCreateModal"> Add New </ElButton>
    </div>
  </ElCard>

  <ElCard>
    <div class="mb-5">
      <el-input
        v-model="query.keyword"
        v-debounce:300="getSkills"
        style="width: 240px"
        placeholder="Search by Name"
      />
      <el-button
        @click.prevent="getSkills"
        :disabled="!query.keyword"
        class="mx-3"
        type="primary"
        >Search</el-button
      >
    </div>
    <ElTable
      v-loading="loading"
      :data="skills"
      border
      style="width: 100%"
      :row-style="configStore.getRowStyle"
      :header-cell-style="configStore.getHeaderRowStyle"
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <ElTableColumn prop="id" label="ID" width="180" sortable />
      <ElTableColumn prop="name" label="Name" sortable min-width="300" />

      <ElTableColumn label="Action" prop="name">
        <template #default="scope">
          <ElButton size="small" type="info" @click="getSkill(scope.row.id)">
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
  <v-card v-if="total > query.limit" class="d-flex justify-end mt-5 mx-auto py-3">
    <ElPagination
      v-model:current-page="query.page"
      v-model:page-size="query.limit"
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
    :title="`${form.id ? 'Update' : 'Create New'} Skill`"
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
      :size="formSize"
      status-icon
      clearable
    >
      <ElFormItem label="Skill name" prop="name">
        <ElInput v-model="form.name" placeholder="Enter skill name" />
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
import { useSkillStore } from "@/stores/skillStore";
import { notify } from "@/utils/notification";
import { onMounted, reactive, ref } from "vue";

const configStore = useConfigStore();
const skillStore = useSkillStore();
const skills = ref([]);
const loading = ref(false);

const pagerCount = ref(5);
const total = ref(0);

const dialogFormVisible = ref(false);

const form = reactive({
  name: "",
  id: null,
});

const query = reactive({
  limit: 20,
  page: 1,
  keyword: "",
});

const formLabelWidth = "140px";
const formSize = ref("default");
const ruleFormRef = ref();

const rules = reactive({
  name: [
    { required: true, message: "Please input the skill name", trigger: "blur" },
    { min: 3, message: "Length should be more than 3", trigger: "blur" },
  ],
});

const openCreateModal = () => {
  form.name = "";
  form.id = null;
  dialogFormVisible.value = true;
};

const getSkills = async () => {
  loading.value = true;
  try {
    const { data } = await skillStore.getSkills(query);

    skills.value = data.data.data;
    total.value = data.data.total;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

const handleSizeChange = (val: number) => {
  query.limit = val;
  getSkills();
};
const handleCurrentChange = (val: number) => {
  query.page = val;
  getSkills();
};

const onSubmit = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true;
        let res = null;
        if (form.id) {
          res = await skillStore.updateSkill(form);
        } else {
          res = await skillStore.createSkill(form);
        }

        if (res.status === 200) {
          dialogFormVisible.value = false;
          getSkills();
          notify("Success", res.data.message, "success", "top-right");

          // Reset form
          form.name = "";
          form.id = null;
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

const getSkill = (id) => {
  const skill = skills.value.find((skill) => skill.id === id);
  if (skill) {
    form.name = skill.name;
    form.id = skill.id;
    dialogFormVisible.value = true;
  }
};

onMounted(() => {
  getSkills();
});
</script>
