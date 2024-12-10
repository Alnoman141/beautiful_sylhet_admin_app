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
          <div v-html="column.prop == 'name' ? scope.row[column.prop] : index++" />
        </template>
      </ElTableColumn>


      <!-- Action Buttons Column -->
      <ElTableColumn
        align="left"
        width="180"
      >
        <template #header>
          <div class="text-left">
            Actions
          </div>
        </template>
        <template #default="scope">
          <ElButton
            size="small"
            type="success"
          >
            <RouterLink
              style="color: white"
              :to="{ name: 'editTouristSpot', params: { id: scope.row.parent_id } }"
            >
              <VIcon
                icon="tabler-edit"
                size="20"
              />
            </RouterLink>
          </ElButton>
          <ElButton
            type="danger"
            size="small"
            @click="showAlert(scope.row.parent_id)"
          >
            <VIcon
              icon="tabler-trash"
              size="20"
            />
            <!--  v-if="scope.row.status == 0" -->
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useSpotStore } from "@/stores/tourism/spotStore"
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

const emit = defineEmits(["tableDataEmit"])
const editorContent = ref('') // Reactive variable to store the editor content





const spotStore = useSpotStore()

const configStore = useConfigStore()
const search = ref('')


const filterTableData = computed(() =>
  props.filterTableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()), 
  ),
)

const deleteSpot = async item => {

  // el message
  

  
  try{
    const { data } = await spotStore.deleteSpot({ id: item })

    data.status_code == 200 ? notify('Deleted!', data.message, 'warning', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}

import { ElMessage, ElMessageBox } from 'element-plus'

const showAlert = item => {
  ElMessageBox.alert('Are you sure that you want to delete this Tourist Spot ?', 'Delete', {
    confirmButtonText: 'Delete',
    confirmButtonClass: 'el-button--danger',
    callback: action => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })

      
      action == 'confirm' ? deleteSpot(item) : ''
    },
  })
}
</script>
