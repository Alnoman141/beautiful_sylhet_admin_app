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
        :align="column.align"
      >
        <template #default="scope">
          <div class="text-end">
            <RouterLink
              v-if="$can('edit', 'awareness')"
              :to="{ name: 'edit-awareness', params: { id: scope.row.id } }"
              style=" color:white !important;text-decoration: none !important;"
            >
              <ElTooltip
                class="box-item"
                effect="dark"
                content="Edit Awareness"
                placement="top-start"
              >
                <ElButton
                  type="primary"
                  size="small"
                >
                  <VIcon
                    icon="tabler-edit"
                    size="15"
                  />
                </ElButton>
              </ElTooltip>
            </RouterLink>
          </div>
          <div
            class="px-4"
            v-html="scope.row[column.prop]"
          />
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useAwarenessStore } from "@/stores/tourism/awarenessStore"
import { defineEmits, defineProps, ref } from "vue"

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

const emit = defineEmits(["tableDataEmit"]) ;const editorContent = ref('') // Reactive variable to store the editor content





const awarenessStore = useAwarenessStore()

const configStore = useConfigStore()
const search = ref('')


const filterTableData = computed(() =>
  props.filterTableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()), 
  ),


)
</script>
