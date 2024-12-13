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
          <div v-if="column.prop == 'id'">
            {{ index++ }}
          </div>
          <div v-else>
            {{ scope.row[column.prop].type ? scope.row[column.prop].type[0].toUpperCase() + scope.row[column.prop].type.slice(1) + ' ' + 'News' : scope.row[column.prop] }}
          </div>
        </template>
      </ElTableColumn>


      <!-- Action Buttons Column -->
      <ElTableColumn
        align="left"
        width="200"
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
            :to="{ name: 'editNews', params: { id: scope.row.parent_id } }"
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
          <!-- publish button  -->
          
          <ElButton
            size="small"
            :type="scope.row.status == 1 ? 'success':''"
            @click="showPublishAlert(scope.row.parent_id,scope.row.status)"
          >
            <VIcon
              :icon="scope.row.status == 1 ? 'tabler-check':'tabler-eye-off'"
              size="15"
            />
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useNewsStore } from "@/stores/tourism/newsStore"
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

const newsStore = useNewsStore()

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

const deleteNews = async item => {
  let arr = []
  arr.push(item)
  try{
    const { data } = await newsStore.deleteNews({ ids: arr })

    data.status_code == 200 ? notify('Deleted!', data.message, 'error', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}

const publishNews = async (item, sts) => {
  let arr = []
  arr.push(item)
  let status = null
  sts == 1 ? status = 0 : status = 1
  try{
    const { data } = await newsStore.publishNews({ ids: arr, status: status })

    data.status_code == 200 ? notify('Published!', data.message, 'success', 'top-right') : notify('Success', data.message, 'success', 'top-right')

    emit('tableDataEmit')
    arr = []

  }
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

      
      action == 'confirm' ? deleteNews(item) : ''
    },
  })
}

const showPublishAlert = (parent_id, status) => {
  ElMessageBox.alert(`Are you sure that you want to ${status == 1 ? 'unpublish' : 'publish'}  this news ?`, `${status == 1 ? 'Unpublish' : 'Publish'}`, {
    confirmButtonText: `${status == 1 ? 'Unpublish' : 'Publish'}`,
    confirmButtonClass: 'el-button--primary',
    callback: action => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })

      
      action == 'confirm' ? publishNews(parent_id, status) : ''
    },
  })
}
</script>
