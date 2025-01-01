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
          <div
            v-if="column.prop !== 'content'"
            v-html="column.prop !== 'id' ? scope.row[column.prop] : pageNo == 1 ? index++ : (pageNo - 1) * pageSize + index++"
          />
          <div v-else>
            {{ scope.row[column.prop].data.title }}
          </div>
        </template>
      </ElTableColumn>


      <!-- Action Buttons Column -->
      <ElTableColumn
        v-if="route.name !== 'userActivity'"
        align="left"
        width="180"
      >
        <template #header>
          <div class="text-start">
            Actions {{ route.name }}
          </div>
        </template>
        <template #default="scope">
          <RouterLink
            v-if="scope.row.id !== 1"
            class="mx-2"
            style="color:white"
            :to="{ name: 'editUser', params: { id: scope.row.id } }"
          >
            <ElTooltip
              class="item"
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
            class="item"
            effect="dark"
            content="Delete"
            placement="top-start"
          >
            <ElButton
              v-if="scope.row.id !== 1"
              size="small"
              type="danger"
              @click="showAlert(scope.row.id)"
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
import { useUserStore } from "@/stores/tourism/userStore"
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineEmits, defineProps, ref } from "vue"
import { useRoute } from "vue-router"

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
  pageSize: {
    type: Number,
    default: 10,
  },
  
})

const emit = defineEmits(["tableDataEmit"])
const route = useRoute()
const userStore = useUserStore()

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
    const { data } = await userStore.deleteUser({ id: item })

    data.status_code == 200 ? notify('Deleted!', data.message, 'error', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}

const showAlert = item => {
  ElMessageBox.alert('Are you sure that you want to delete this User ?', 'Delete', {
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
