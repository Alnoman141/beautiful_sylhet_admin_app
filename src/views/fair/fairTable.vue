<template>
  <div>
    <div class="border px-2 py-2">
      <div class="text-end">
        <RouterLink
          v-if="$can('edit', 'fare')"
          class="mx-2"
          style="color:white"
          :to="{ name: 'editFair', params: { id: filterTableData?.fair_board_parent_id || 0 } }"
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
      </div>
      <label for="">  Fare Detail </label>

      <hr>
      <div v-html="filterTableData.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useFairStore } from "@/stores/tourism/fairStore"
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineEmits, defineProps, ref } from "vue"


const props = defineProps({
  filterTableData: {
    type: Array,
    default: () => ({}),
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

const fairStore = useFairStore()

const editorContent = ref('') // Reactive variable to store the editor content







const configStore = useConfigStore()
const search = ref('')


// const filterTableData = computed(() =>
//   props.filterTableData.filter(
//     data =>
//       !search.value ||
//       data.name.toLowerCase().includes(search.value.toLowerCase()), 
//   ),


// )

const deleteTransport = async item => {
  let arr = []
  arr.push(item)
  try{
    const { data } = await fairStore.deleteFair({ id: item })

    data.status_code == 200 ? notify('Deleted!', data.message, 'error', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}

const showAlert = item => {
  ElMessageBox.alert('Are you sure that you want to delete this Fare Board ?', 'Delete', {
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

<style>
  table {
    background-color: #fff;
    border-collapse: collapse;
    box-shadow: 0 0 10px rgba(0, 0, 0, 10%);
    font-family: Arial, sans-serif;
    font-size: 14px;
    inline-size: 100%;
    margin-block: 20px;
    margin-inline: 0;
  }

  
  tr:first-child {
    background-color: #868585b0;
  }

  tr:first-child:hover {
    background-color: #868585b0;
  }

  thead tr {
    background-color: #f4f4f4;
  }

  th, td {
    border: 1px solid #ddd;
    padding-block: 12px;
    padding-inline: 15px;
    text-align: center;
  }

  th {
    background-color: #f0f0f0;
    color: #333;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  tr:hover {
    background-color: #f1f7ff;
  }

  td:first-child {
    text-align: start;
  }

  @media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }

    thead tr {
      display: none;
    }

    tr {
      padding: 10px;
      border: 1px solid #ddd;
      margin-block-end: 15px;
    }

    td {
      position: relative;
      padding-inline-start: 50%;
      text-align: end;
    }

    td::before {
      position: absolute;
      content: attr(data-label);
      font-weight: bold;
      inline-size: 45%;
      inset-inline-start: 10px;
      padding-inline-end: 10px;
      text-align: start;
      white-space: nowrap;
    }
  }
</style>

