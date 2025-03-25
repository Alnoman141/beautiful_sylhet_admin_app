<template>
  <div>
    <ElTable
      :data="filterTableData"
      border
      :row-style="configStore.getRowStyle"
      :header-cell-style="configStore.getHeaderRowStyle"
      style="inline-size: 100%"
    >
      <ElTableColumn
        v-for="(column, index) in columns"
        :key="index"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.sortable"
        :align="column.align"
        :width="column.prop == 'id' ? '100' : ''"
      >
        <template #default="scope">
          
          <div
            v-if="column.prop !== 'content' && column.prop !== 'info'"
            v-html="
              column.prop !== 'id'
                ? scope.row[column.prop] && scope.row[column.prop].name
                  ? scope.row[column.prop].name
                  : scope.row[column.prop]
                : pageNo == 1
                ? index++
                : (pageNo - 1) * pageSize + index++
            "
          />

          <div v-else>
            {{ scope.row[column.prop].data.title }}
          </div>
        </template>
      </ElTableColumn>

      <!-- Action Buttons Column -->
      <ElTableColumn
        v-if="
          route.name !== 'userActivity' &&
          route.name !== 'touristList' &&
          route.name !== 'complainList'
        "
        align="left"
        width="180"
      >
        <template #header>
          <div class="text-start">Actions {{ route.name }}</div>
        </template>
        <template #default="scope">
          <RouterLink
            v-if="$can('edit', 'user') && scope.row.id !== 1"
            class="mx-2"
            style="color: white"
            :to="{ name: 'editUser', params: { id: scope.row.id } }"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Edit"
              placement="top-start"
            >
              <ElButton size="small" type="primary">
                <VIcon icon="tabler-edit" size="15" />
              </ElButton>
            </ElTooltip>
          </RouterLink>

          <ElTooltip
            class="item"
            effect="dark"
            content="Delete"
            placement="top-start"
          >
            <ElButton
              v-if="$can('delete', 'user') && scope.row.id !== 1"
              size="small"
              type="danger"
              @click="showAlert(scope.row.id)"
            >
              <VIcon icon="tabler-trash" size="15" />
              <!--  v-if="scope.row.status == 0" -->
            </ElButton>
          </ElTooltip>
        </template>
      </ElTableColumn>
      <ElTableColumn
        v-if="
          route.name == 'touristList' &&
          route.name !== 'complainList' &&
          route.name !== 'userActivity'
        "
        align="left"
        width="180"
      >
        <template #header>
          <div class="text-start">Personal Information</div>
        </template>
        <template #default="scope">
          <ElButton plain @click="showDetail(scope.row)">
            <VIcon icon="tabler-eye" size="15" />
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <ElDialog
      v-model="detailDialog"
      :title="`Tourist - ${detailData.name} Details`"
      :before-close="handleClose"
    >
      <VRow class="my-4">
        <VCol
          cols="12"
          md="12"
          class="border d-flex align-center justify-center"
        >
          <img
            :src="detailData.avatar"
            height="50"
            width="50"
            alt=""
            srcset=""
          />
        </VCol>
        <VCol cols="12" md="3" class="border-s border-b d-flex align-center"
          >Name: {{ detailData.name }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b d-flex align-center"
          >Email: {{ detailData.email }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b d-flex align-center"
          >Phone: {{ detailData.phone }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b d-flex align-center"
          >NID: {{ detailData.info.data.nid_passport }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b d-flex align-center"
          >Nationality: {{ detailData.info.data.nationality }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b d-flex align-center"
          >Country:
          {{
            detailData.info.data.country
              ? detailData.info.data.country.name
              : "     &nbsp; &nbsp;&nbsp; -    "
          }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b d-flex align-center"
          >Present Address: {{ detailData.info.data.present_address }}
          {{ detailData.info.data.present_dist_name }}
        </VCol>
        <VCol
          cols="12"
          md="3"
          class="border-s border-b border-e d-flex align-center"
          >Permanent Address: {{ detailData.info.data.permanent_address }}
          {{ detailData.info.data.permanent_dist_name }}</VCol
        >
      </VRow>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config";
import { useUserStore } from "@/stores/tourism/userStore";
import { ElMessage, ElMessageBox } from "element-plus";
import { defineEmits, defineProps, ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  filterTableData: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  pageNo: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["tableDataEmit"]);
const route = useRoute();
const userStore = useUserStore();

const editorContent = ref(""); // Reactive variable to store the editor content

const configStore = useConfigStore();
const search = ref("");

const filterTableData = computed(() =>
  props.filterTableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const deleteTransport = async (item) => {
  let arr = [];
  arr.push(item);
  try {
    const { data } = await userStore.deleteUser({ id: item });

    data.status_code == 200
      ? notify("Deleted!", data.message, "error", "top-right")
      : notify("Error", data.message, "error", "top-right");

    emit("tableDataEmit");
  } catch (err) {
    console.log(err);
  }
};

const showAlert = (item) => {
  ElMessageBox.alert(
    "Are you sure that you want to delete this user ?",
    "Delete",
    {
      confirmButtonText: "Delete",
      confirmButtonClass: "el-button--danger",
      callback: (action) => {
        ElMessage({
          type: "info",
          message: `action: ${action}`,
        });

        console.log("action", action);
        action == "confirm" ? deleteTransport(item) : "";
      },
    }
  );
};

const detailDialog = ref(false);
const detailData = ref({});

const showDetail = (item) => {
  detailDialog.value = true;
  detailData.value = item;
};
const handleClose = (done: () => void) => {
  detailDialog.value = false;
  detailData.value = {};
  done();
  // ElMessageBox.confirm("Are you sure to close this dialog?")
  //   .then(() => {

  //
  //   })
  //   .catch(() => {
  //     // catch error
  //   });
};
</script>
