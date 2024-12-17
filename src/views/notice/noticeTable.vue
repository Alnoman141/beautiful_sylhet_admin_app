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
        :width="column.prop !== 'id'? column.width : '100'"
      >
        <template #default="scope">
          <div class="px-4">
            <div
              v-if="column.prop !== 'date'"
              class="text-limit"
              v-html="column.prop !== 'id' ? scope.row[column.prop] : index++"
            />
            <div
              v-else
              v-html="new Date(scope.row[column.prop]).toISOString().slice(0, 10)"
            />
          </div>
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
          <ElButton
            size="small"
            type="primary"
          >
            <RouterLink
              style="color:white"
              :to="{ name: 'editNotice', params: { id: scope.row.parent_id } }"
            >
              <VIcon
                icon="tabler-edit"
                size="15"
              />
            </RouterLink>
          </ElButton>
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
import { useNoticeStore } from "@/stores/tourism/noticeStore"
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

const noticeStore = useNoticeStore()

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
    const { data } = await noticeStore.deleteNotice({ id: item })

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
