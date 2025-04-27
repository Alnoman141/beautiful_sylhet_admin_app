<template>
  <table class="log-table">
    <thead>
      <tr>
        <th
          v-for="(column, index) in columns"
          :key="index"
          :style="configStore.getHeaderRowStyle"
        >
          {{ column.label }}
        </th>
        <th>Change Log</th>
      </tr>
      <!-- <tr>
        <template v-for="(_, index) in columns">
          <th></th>
        </template>
        <th></th>
      </tr> -->
    </thead>

    <tbody>
      <tr
        v-for="(row, rowIndex) in filterTableData"
        :key="rowIndex"
        :style="configStore.getRowStyle(row, rowIndex)"
      >
     

        <td
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          :style="{ textAlign: column.align }"
        >
          <div v-if="column.prop !== 'content' && column.prop !== 'info'">
            <span
              v-html="
                column.prop !== 'id'
                  ? formatKey(row[column.prop])
                  : pageNo === 1
                  ? colIndex + 1
                  : (pageNo - 1) * pageSize + colIndex + 1
              "
            ></span>
          </div>
          <div v-else>
            {{ formatKey(row[column.prop]?.data?.title || "") }}
          </div>
        </td>

        <!-- Change Log Button -->
        <td>
          <el-button type="warning" size="small" @click="openChangeLog(row)">
            📋 View Change Log
          </el-button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Modal -->
  <el-dialog
    v-model="logDialogVisible"
    title="Change Log Details"
    width="80%"
    :before-close="handleLogClose"
  >
    <div v-if="selectedLogRow">
      <div
        v-for="(afterVal, key) in selectedLogRow.properties?.attributes || {}"
        :key="key"
        class="mb-3 "
      >
        <div v-if="hasChanged(key)">
          <strong>{{ formatKey(key) }}:</strong>
          <div class="diff-box  px-4 py-2">
            <span
              class="before px-4"
              v-if="isHtml(getNested(oldVals, key))"
              v-html="getNested(oldVals, key)"
            ></span>
            <span class="before" v-else>{{ getNested(oldVals, key) }}</span>
            <span class="arrow">➜</span>
            <span
              class="after"
              v-if="isHtml(afterVal)"
              v-html="afterVal"
            ></span>
            <span class="after" v-else>{{ afterVal }}</span>
          </div>
        </div>
      </div>
      <p class="mt-4">
        <b>Changed At:</b> {{ formatDate(selectedLogRow.created_at) }}
      </p>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config";
import { computed, defineEmits, defineProps, ref } from "vue";

const props = defineProps({
  filterTableData: Array,
  columns: Array,
  pageNo: Number,
  pageSize: Number,
});

const emit = defineEmits(["tableDataEmit"]);

const configStore = useConfigStore();
const search = ref("");

const filterTableData = computed(() =>
  props.filterTableData.filter(
    (d) =>
      !search.value ||
      d.name?.toLowerCase().includes(search.value.toLowerCase())
  )
);

// Modal logic
const logDialogVisible = ref(false);
const selectedLogRow = ref(null);

const openChangeLog = (row) => {
  selectedLogRow.value = row;
  logDialogVisible.value = true;
};

const handleLogClose = (done: () => void) => {
  logDialogVisible.value = false;
  selectedLogRow.value = null;
  done();
};

// Helpers
const formatKey = (key: string) => {
  if (!key) return "";
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const isHtml = (val) =>
  typeof val === "string" && /<\/?[a-z][\s\S]*>/i.test(val);

const formatDate = (datetime) => {
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

// Compare and Diff
const getNested = (obj, path) => {
  return path
    .split(".")
    .reduce((o, p) => (o && o[p] !== undefined ? o[p] : ""), obj);
};

const hasChanged = (key) => {
  const oldVal = getNested(selectedLogRow.value.properties?.old || {}, key);
  const newVal = getNested(
    selectedLogRow.value.properties?.attributes || {},
    key
  );
  return oldVal !== newVal;
};

const oldVals = computed(() => selectedLogRow.value?.properties?.old || {});
</script>

<style scoped>
table {
  border-collapse: collapse;
  font-family: sans-serif;
  inline-size: 100%;
}

th,
td {
  border: 1px solid #ddd;
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

.diff-box {
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  background: #fdf6ec;
  border-inline-start: 3px solid #e6a23c;
  gap: 8px;
  margin-block-start: 4px;
}

.diff-box .before {
  color: #f56c6c;
  text-decoration: line-through;
}

.diff-box .arrow {
  color: #909399;
  font-weight: bold;
}

.diff-box .after {
  color: #67c23a;
  font-weight: bold;
}
</style>
