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
        :width="
          column.prop == 'id'
            ? '100'
            : column.prop == 'log_name' || column.prop == 'event'
            ? '100%'
            : column.prop == 'description'
            ? '100%'
            : ''
        "
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
      <ElTableColumn v-if="route.name == 'userActivity'" align="left">
        <template #header>
          <div class="text-start">Activity Change Log</div>
        </template>
        <template #default="scope" class="mx-0 my-0 px-0 py-0">
          <!-- {{scope.row.properties}} -->
          <!-- <div
            v-for="(section, sectionKey) in scope.row.properties"
            :key="sectionKey"
          >
            <h4>{{ sectionKey }}</h4>
            <div v-for="(value, key) in section" :key="key">
              <strong>{{ key }}:</strong> {{ stripHtml(value) }}
            </div>
          </div>  
          <hr> -->
          <VRow class="mx-0 my-0 px-0 py-0">
            <VCol
              v-for="(section, sectionKey) in scope.row.properties"
              :key="sectionKey"
              class="border-s border-t border-b border-e"
            >
              <h4 class="my-2">
                {{ String(sectionKey) === "old" ? "Before" : "After" }}
              </h4>
              <hr />
              <div v-for="(value, key) in section" :key="key">
                <strong>{{ key }}:</strong>
                <span v-if="isHtml(value)" v-html="value"></span>
                <span v-else>{{ value }}</span>
              </div>
            </VCol>
          </VRow>
        </template>
      </ElTableColumn>
    </ElTable>
    <ElDialog
      v-model="detailDialog"
      :title="`Tourist - ${detailData.name} Details`"
      :before-close="handleClose"
      width="400"
    >
      <VRow class="dialog-body compact-dialog">
        <!-- Avatar & Name -->
        <VCol cols="12" class="d-flex align-center mb-3">
          <img
            :src="detailData.avatar"
            height="50"
            width="50"
            class="detail-avatar me-3"
            @click="showImage(detailData.avatar)"
          />
          <div class="detail-title">{{ detailData.name }}</div>
        </VCol>

        <!-- Contact Info -->
        <VCol cols="12" class="group-box">
          <div class="group-title">Contact Info</div>
          <VRow>
            <VCol cols="6">
              <div class="label">Email</div>
              <div class="value">{{ detailData.email || "—" }}</div>
            </VCol>
            <VCol cols="6">
              <div class="label">Phone</div>
              <div class="value">{{ detailData.phone || "—" }}</div>
            </VCol>
          </VRow>
        </VCol>

        <!-- Identity Info -->
        <VCol cols="12" class="group-box">
          <div class="group-title">Identity</div>
          <VRow>
            <VCol cols="6">
              <div class="label">NID/Passport</div>
              <div class="value">
                {{ detailData?.info?.data.nid_passport || "—" }}
              </div>
            </VCol>
            <VCol cols="6">
              <div class="label">Nationality</div>
              <div class="value">
                {{ detailData?.info?.data.nationality || "—" }}
              </div>
            </VCol>
            <VCol cols="6">
              <div class="label">Country</div>
              <div class="value">
                {{ detailData?.info?.data.country || "—" }}
              </div>
            </VCol>
          </VRow>
        </VCol>

        <!-- Present Address -->
        <VCol cols="12" class="group-box">
          <div class="group-title">Present Address</div>
          <VRow>
            <VCol cols="6">
              <div class="label">Address</div>
              <div class="value">
                {{ detailData?.info?.data.present_address || "—" }}
              </div>
            </VCol>
            <VCol cols="6">
              <div class="label">Upazila</div>
              <div class="value">
                {{ detailData?.info?.data.present_up_name || "—" }}
              </div>
            </VCol>
            <VCol cols="6">
              <div class="label">District</div>
              <div class="value">
                {{ detailData?.info?.data.present_dist_name || "—" }}
              </div>
            </VCol>
          </VRow>
        </VCol>

        <!-- Permanent Address -->
        <VCol cols="12" class="group-box">
          <div class="group-title">Permanent Address</div>
          <VRow>
            <VCol cols="6">
              <div class="label">Address</div>
              <div class="value">
                {{ detailData?.info?.data.permanent_address || "—" }}
              </div>
            </VCol>
            <VCol cols="6">
              <div class="label">Upazila</div>
              <div class="value">
                {{ detailData?.info?.data.permanent_up_name || "—" }}
              </div>
            </VCol>
            <VCol cols="6">
              <div class="label">District</div>
              <div class="value">
                {{ detailData?.info?.data.permanent_dist_name || "—" }}
              </div>
            </VCol>
          </VRow>
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
      callback: (action) => {},
    }
  );
};
const stripHtml = (val) => {
  if (typeof val === "string") {
    const doc = new DOMParser().parseFromString(val, "text/html");
    return doc.body.textContent || "";
  }
  return val;
};
const isHtml = (val) => {
  return typeof val === "string" && /<\/?[a-z][\s\S]*>/i.test(val);
};
</script>
<style scoped>
.compact-dialog {
  padding-block: 0.5rem;
  padding-inline: 1rem;
}

.detail-avatar {
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 20%);
  cursor: pointer;
  object-fit: cover;
}

.detail-title {
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
}

.group-box {
  border: 1px solid #eee;
  border-radius: 6px;
  background-color: #fff;
  margin-block-end: 1rem;
  padding-block: 0.75rem;
  padding-inline: 1rem;
}

.group-title {
  border-block-end: 1px solid #eee;
  color: #444;
  font-size: 0.95rem;
  font-weight: 600;
  margin-block-end: 0.5rem;
  padding-block-end: 4px;
}

.label {
  color: #666;
  font-size: 0.85rem;
  font-weight: 500;
}

.value {
  color: #333;
  font-size: 0.85rem;
}
</style>

