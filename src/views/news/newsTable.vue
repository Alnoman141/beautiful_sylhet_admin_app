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
      >
        <template #default="scope">
          <div
            v-if="column.prop != 'type'"
            v-html="scope.row[column.prop]"
          />
          <div v-else>
            {{ scope.row[column.prop].name }}
          </div>
        </template>
      </ElTableColumn>


      <!-- Action Buttons Column -->
      <ElTableColumn align="right">
        <template #header>
          <div class="text-right">
            Actions
          </div>
        </template>
        <template #default="scope">
          <ElButton>
            <RouterLink :to="{ name: 'editNews', params: { id: scope.row.parent_id } }">
              <VIcon
                icon="tabler-edit"
                size="20"
              />
            </RouterLink>
          </ElButton>
          <ElButton @click="deleteNews(scope.row.parent_id)">
            <VIcon
              icon="tabler-trash"
              size="20"
            />
            <!--  v-if="scope.row.status == 0" -->
          </ElButton>
          <!-- publish button  -->
          
          <ElButton @click="publishNews(scope.row.parent_id)">
            <VIcon
              :icon="scope.row.status == 1 ? 'tabler-check':'tabler-eye-off'"
              size="20"
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

    data.status_code == 200 ? notify('Deleted!', data.message, 'warning', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}

const publishNews = async item => {
  let arr = []
  arr.push(item)
  try{
    const { data } = await newsStore.publishNews({ ids: arr })

    data.status_code == 200 ? notify('Deleted!', data.message, 'warning', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')
    arr = []

  }
  catch(err){
    console.log(err)
  }
}
</script>
