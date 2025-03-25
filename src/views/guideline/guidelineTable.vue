<template>
  <div>
    <div class="text-end">
      <RouterLink
        v-if="$can('edit', 'guideline')"
        :to="{ name: 'edit-guideline', params: { id: 1 } }"
        style=" color:white !important;text-decoration: none !important;"
      >
        <ElTooltip
          class="box-item"
          effect="dark"
          content="Edit Instructions"
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
    <VRow class="my-2 mx-2">
      <VCol
        v-for="(awareness, index) in filterTableData"
        :key="index"
        :class="index == 0? ' border-s border-t border-b' : 'border-s border-t border-b border-e'"
      >
        <div class="border ps-1">
          <p class="mx-0 my-0 px-0 py-0">
            {{ index == 0 ? "নির্দেশনা বাংলা" : "Instruction English" }}
          </p>
        </div>
        <p
          class="my-4"
          v-html="awareness.name"
        />
      </VCol>
    </VRow>
    <!--
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
      v-if="$can('edit', 'guideline')"
      :to="{ name: 'edit-guideline', params: { id: scope.row.id } }"
      style=" color:white !important;text-decoration: none !important;"
      >
      <ElTooltip
      class="box-item"
      effect="dark"
      content="Edit Instructions"
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
            
      v-html="scope.row[column.prop] "
      />
      </template>
      </ElTableColumn>
      </ElTable> 
    -->
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
