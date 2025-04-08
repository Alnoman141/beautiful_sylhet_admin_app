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
            v-if="$can('edit', 'user') && scope.row.role !== 'superadmin'"
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
              v-if="$can('delete', 'user') && scope.row.role !== 'superadmin'"
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
            class="rounded-circle cursor-pointer"
            @click="showImage(detailData.avatar)"
          />
        </VCol>
        <VCol cols="12" md="3" class="border-s border-b"
          >Name: {{ detailData.name }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b"
          >Email: {{ detailData.email ? detailData.email : "" }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b"
          >Phone: {{ detailData.phone ? detailData.phone : "" }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b border-e"
          >NID/Passport:
          {{
            detailData?.info?.data.nid_passport
              ? detailData?.info?.data.nid_passport
              : ""
          }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b"
          >Nationality:
          {{
            detailData?.info?.data.nationality
              ? detailData?.info?.data.nationality
              : ""
          }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b"
          >Country:
          {{
            detailData?.info?.data.country ? detailData?.info?.data.country : ""
          }}</VCol
        >
        <VCol cols="12" md="3" class="border-s border-b px-0 py-0 mx-0 my-0">
          <p class="mx-0 px-1 py-1 my-0 border-b">Present Address</p>
          <p class="mx-1 px-0 py-0 my-1">
            Address:
            {{
              detailData?.info?.data.present_address
                ? detailData?.info?.data.present_address
                : " &nbsp; -"
            }}
          </p>
          <p class="mx-1 px-0 py-0 my-1">
            Upazila:
            {{
              detailData?.info?.data.present_dist_name
                ? detailData?.info?.data.present_dist_name
                : " &nbsp; -"
            }}
          </p>
          <p class="mx-1 px-0 py-0 my-1">
            District:

            {{
              detailData?.info?.data.present_up_name
                ? detailData?.info?.data.present_up_name
                : " &nbsp; -"
            }}
          </p>
        </VCol>
        <VCol
          cols="12"
          md="3"
          class="border-s border-b border-e px-0 py-0 mx-0 my-0"
          ><p class="mx-0 px-1 py-1 my-0 border-b">Permanent Address</p>

          <p class="mx-1 px-0 py-0 my-1">
            Address:
            {{
              detailData?.info?.data.permanent_address
                ? detailData?.info?.data.permanent_address
                : " &nbsp; -"
            }}
          </p>
          <p class="mx-1 px-0 py-0 my-1">
            Upazila:
            {{
              detailData?.info?.data.permanent_up_name
                ? detailData?.info?.data.permanent_up_name
                : " &nbsp; -"
            }}
          </p>
          <p class="mx-1 px-0 py-0 my-1">
            District:
            {{
              detailData?.info?.data.permanent_dist_name
                ? detailData?.info?.data.permanent_dist_name
                : " &nbsp; -"
            }}
          </p>
        </VCol>
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
  detailData.value = item;
  detailDialog.value = true;
};
const handleClose = (done: () => void) => {
  detailDialog.value = false;

  done();
  detailData.value = {};
};
const showImage = (item) => {
  ElMessageBox.alert(
    `<img src="${item}" alt="Image" style="width: 100%; height: auto; ' " />`,
    "Image",
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: "Close",
      callback: (action) => {
        console.log("action", action);
      },
    }
  );
};
</script>
