<template>
  <ElTable
    :data="filterTableData"
    border
    :row-style="configStore.getRowStyle"
    :header-cell-style="configStore.getHeaderRowStyle"
    style="inline-size: 100%"
  >
    <!-- Dynamic Columns -->
    <ElTableColumn
      v-for="(column, index) in columns"
      :key="index"
      :label="column.label"
      :prop="column.prop"
      :sortable="column.sortable"
      :align="column.align"
    >
      <template
        v-if="column.slot"
        #default="scope"
      >
        <component
          :is="column.slot"
          v-bind="column.slotProps(scope)"
        />
      </template>
    </ElTableColumn>

    <!-- Action Buttons Column -->
    <ElTableColumn align="right">
      <template #header>
        <ElInput
          v-model="search"
          size="small"
          placeholder="Type to search"
        />
      </template>
      <template #default="scope">
        <ElButton
          size="small"
          :type="scope.row.status === 'active' ? 'success' : 'danger'"
        >
          {{ scope.row.status.toUpperCase() }}
        </ElButton>
        <ElButton
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
        >
          Edit
        </ElButton>
        <ElButton
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { defineEmits, ref } from "vue"

const props = defineProps({
  filterTableData: {
    type: Array,
    default: () => ([]),
  },
  columns: {
    type: Array,
    default: () => ([]),
  },
  
})

const emit = defineEmits(["tableDataEmit"])
const search = ref('')

// I need computed with props
const filterTableData = computed(() =>
  props.filterTableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) || data.email.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

const configStore = useConfigStore()
</script>
