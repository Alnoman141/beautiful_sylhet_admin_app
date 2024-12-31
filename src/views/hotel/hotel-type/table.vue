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
        :width="column.prop == 'id' ? '100' : column.prop == 'type' ? '200' : ''"
      >
        <template #default="scope">
          <!-- <div v-html="scope.row[column.prop]" /> -->
          <div v-html="column.prop !== 'id' ? scope.row[column.prop] : index++" />
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
          <RouterLink
            class="mx-2"
            style="color:white"
            :to="{ name: 'editHotelType', params: { id: scope.row.parent_id } }"
          >
            <ElTooltip
              content="Edit"
              placement="top"
            >
              <ElButton
                size="small"
                type="primary"
              >
                <VIcon
                  icon="tabler-edit"
                  size="15"
                />
              </ElButton>
            </ElTooltip>
          </RouterLink>
          <ElTooltip
            content="Delete"
            placement="top"
          >
            <ElButton
              type="danger"
              size="small"
              @click="showAlert(scope.row.parent_id)"
            >
              <VIcon
                icon="tabler-trash"
                size="15"
              />
            <!--  v-if="scope.row.status == 0" -->
            </ElButton>
          </ElTooltip>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useHotelTypeStore } from "@/stores/tourism/hotelTypeStore"
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

const hotelTypeStore = useHotelTypeStore()

const editorContent = ref('') // Reactive variable to store the editor content







const configStore = useConfigStore()
const search = ref('')


const filterTableData = computed(() =>
  props.filterTableData.filter(
    data =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()), 
  ),


)

const deleteHotelType = async item => {
  let arr = []
  arr.push(item)
  try{
    const { data } = await hotelTypeStore.deleteHotelType({ id: item })

    data.status_code == 200 ? notify('Deleted!', data.message, 'error', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}

import { ElMessage, ElMessageBox } from 'element-plus'

const showAlert = item => {
  ElMessageBox.alert('Are you sure that you want to delete this news ?', 'Delete', {
    confirmButtonText: 'Delete',
    confirmButtonClass: 'el-button--danger',
    callback: action => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })

      console.log("action", action)
      action == 'confirm' ? deleteHotelType(item) : ''
    },
  })
}
</script>
