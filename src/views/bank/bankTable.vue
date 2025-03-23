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
        :width="column.prop == 'id' ? 100 : ''"
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
          <div class="text-start">
            Actions
          </div>
        </template>
        <template #default="scope">
          <RouterLink
            v-if="$can('edit', 'bank')"
            class="mx-2"
            style="color:white"
            :to="{ name: 'editBank', params: { id: scope.row.parent_id } }"
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
              v-if="$can('delete', 'bank')"
              size="small"
              type="danger"
              @click="showAlert(scope.row.parent_id)"
            >
              <VIcon
                icon="tabler-trash"
                size="15"
              />
            </ElButton>
          </ElTooltip>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useBankStore } from "@/stores/tourism/bankStore"
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

const bankStore = useBankStore()

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
    const { data } = await bankStore.deleteBank({ id: item })

    data.status_code == 200 ? notify('Deleted!', data.message, 'error', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}

const showAlert = item => {
  ElMessageBox.alert('Are you sure that you want to delete this Bank ?', 'Delete', {
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
