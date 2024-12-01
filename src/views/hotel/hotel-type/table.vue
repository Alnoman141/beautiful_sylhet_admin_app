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
          <div v-html="scope.row[column.prop]" />
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
            <RouterLink :to="{ name: 'editHotelType', params: { id: scope.row.parent_id } }">
              <VIcon
                icon="tabler-edit"
                size="20"
              />
            </RouterLink>
          </ElButton>
          <ElButton @click="deleteHotelType(scope.row.parent_id)">
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

    data.status_code == 200 ? notify('Deleted!', data.message, 'warning', 'top-right') : notify('Error', data.message, 'error', 'top-right')

    emit('tableDataEmit')}
  catch(err){
    console.log(err)
  }
}
</script>
