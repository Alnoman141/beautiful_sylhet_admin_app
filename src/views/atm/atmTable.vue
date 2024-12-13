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
          <!-- <div v-html="scope.row[column.prop]" /> -->
          <div v-html="column.prop == 'name' || column.prop == 'spot_name' ? scope.row[column.prop] : index++" />
        </template>
      </ElTableColumn>


      <!-- Action Buttons Column -->
      <ElTableColumn
        align="left"
        width="180"
      >
        <template #header>
          <div class="text-start">
            Actions
          </div>
        </template>
        <template #default="scope">
          <RouterLink
            class="mx-2"
            style="color:white"
            :to="{ name: 'editAtm', params: { id: scope.row.parent_id } }"
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
          </RouterLink>
            
          
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
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useAtmStore } from "@/stores/tourism/atmStore"
import { ElMessage, ElMessageBox } from 'element-plus'
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

const atmStore = useAtmStore()

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

const deleteTransport = async item => {
  let arr = []
  arr.push(item)
  try{
    const { data } = await atmStore.deleteAtm({ id: item })

    data.status_code == 200 ? notify('Deleted!', data.message, 'error', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}

const showAlert = item => {
  ElMessageBox.alert('Are you sure that you want to delete this Transport ?', 'Delete', {
    confirmButtonText: 'Delete',
    confirmButtonClass: 'el-button--danger',
    callback: action => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })

      console.log("action", action)
      action == 'confirm' ? deleteTransport(item) : ''
    },
  })
}
</script>
