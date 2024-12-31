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
        :width="column.prop == 'id' ? '100' : column.prop == 'type' ? '150' : ''"
      >
        <template #default="scope">
          <!-- <div v-html="scope.row[column.prop]" /> -->
          <div v-html="column.prop !== 'id' ? scope.row[column.prop] : pageNo == 1 ? index++ : (pageNo - 1) * 10 + index++" />
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
            style="color:white"
            :to="{ name: 'editHotel', params: { id: scope.row.parent_id } }"
            class="mx-2"
          >
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Edit"
              placement="top-start"
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
            class="box-item"
            effect="dark"
            content="Delete"
          >
            <ElButton
              size="small"
              type="danger"
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
import { useHotelStore } from "@/stores/tourism/hotelStore"
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
  pageNo: {
    type: Number,
    default: 1,
  },
  
})

const emit = defineEmits(["tableDataEmit"]) 

const hotelStore = useHotelStore()

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

const deleteHotel = async item => {
  
  try{
    const { data } = await hotelStore.deleteHotel({ id: item })

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
      action == 'confirm' ? deleteHotel(item) : ''
    },
  })
}
</script>
