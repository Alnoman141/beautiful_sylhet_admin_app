<template>
  <table border style=" border-collapse: collapse;inline-size: 100%;" class="table table-bordered table-striped table-hover log-table">
  <thead>
    <tr>
      <th v-for="(column, index) in columns" :key="index" :style="configStore.getHeaderRowStyle">
        {{ column.label }}
      </th>
      <th colspan="2" style="text-align: start;">Change Log</th>
    </tr>
    <tr>
      <!-- Empty headers for other columns -->
      <template v-for="(column, index) in columns">
        <th></th>
       
        
      </template>
      <th>Before</th>
      <th>After</th>
    </tr>
  </thead>

  <tbody>
    <tr class="mx-2" v-for="(row, rowIndex) in filterTableData" :key="rowIndex" :style="configStore.getRowStyle(row, rowIndex)">
      <!-- Dynamic table columns -->
      <td class="px-2" v-for="(column, colIndex) in columns" :key="colIndex" :style="{ textAlign: column.align }">
        <div v-if="column.prop !== 'content' && column.prop !== 'info'" v-html="
              column.prop !== 'id'
                ? row[column.prop] && row[column.prop].name
                  ? row[column.prop].name
                  : row[column.prop]
                : pageNo == 1
                ? colIndex + 1
                : (pageNo - 1) * pageSize + colIndex + 1
            ">
        </div>

        <div v-else>
          {{ row[column.prop].data.title }}
        </div>
      </td>

      <!-- Activity Change Log - BEFORE -->
      <td style="vertical-align: top;" class="px-2">
        <template v-if="row.properties && row.properties.old">
          <div v-for="(value, key) in row.properties.old" :key="key">
            <strong>{{ key }}:</strong>
            <span v-if="isHtml(value)" v-html="value"></span>
            <span v-else>{{ value }}</span>
          </div>
        </template>
      </td>

      <!-- Activity Change Log - AFTER -->
      <td style="vertical-align: top;" class="px-2">
        <template v-if="row.properties && row.properties.attributes">
          <div v-for="(value, key) in row.properties.attributes" :key="key">
            <strong>{{ key }}:</strong>
            <span v-if="isHtml(value)" v-html="value"></span>
            <span v-else>{{ value }}</span>
          </div>
        </template>

        <p>
          <b>Changed At:</b> {{ formatDate(row.created_at) }}
        </p>
      </td>
    </tr>
  </tbody>
</table>

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

        ;
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
        ;
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
  table {
    border-collapse: collapse;
    font-family: sans-serif;
    inline-size: 100%;
  }

  th, td {
    border: 1px solid #ddd; /* Muted gray border */
    padding-block: 8px;
    padding-inline: 12px;
    text-align: start;
    vertical-align: top;
  }

  th {
    background-color: #f9f9f9;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
</style>
