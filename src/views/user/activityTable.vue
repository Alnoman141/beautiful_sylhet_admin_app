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
          column.prop == 'log_name' || column.prop == 'event'
            ? '120'
            : column.prop == 'description'
            ? '300'
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

      <ElTableColumn align="left">
        <template #header>
          <div class="text-start">Activity Change Log</div>
        </template>
        <template #default="scope" class="mx-0 my-0 px-0 py-0">

          <VRow class="mx-2">

          <VCol
              v-for="(section, sectionKey) in scope.row.properties"
              :key="sectionKey"
            >

            <!-- {{String(sectionKey) !="old" && String(sectionKey) == "attributes" ? "Created":'' }} -->
              <h4>{{ String(sectionKey) === "old" ? "Before" :String(sectionKey) === "attributes" ? "After":'' }}</h4>
              <hr>
              <div v-for="(value, key) in section" :key="key">
                <strong>{{ key }}:</strong>
                <span v-if="isHtml(value)" v-html="value"></span>
                <span v-else>{{ value }}</span>
              </div>
            </VCol>
          </VRow>
     

          <p class="mx-2 my-2">
            <b>Changed At:</b>{{ formatDate(scope.row.created_at) }}
          </p>
        </template>
      </ElTableColumn>
    </ElTable>
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

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium", // or 'short', 'long'
    timeStyle: "short",
  }).format(date);
};
</script>

<style scoped>
.log-table-tr:hover {
  background-color: #f2f2f2;
}

.log-table:hover {
  background-color: #f2f2f2;
}
</style>
