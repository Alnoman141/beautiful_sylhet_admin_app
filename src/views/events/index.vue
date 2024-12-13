<template>
  <div>
    <ElCard class="my-4">
      <VRow class=" ">
        <VCol>
          <b> Events List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createEvents'}"
            
            class="create-btn "
          >
            Create  Event
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <EventsTable
          :filter-table-data="spotList"
          :columns="columns"
          @table-data-emit="getspotList(10,1)"
        />
      </div>
      <PaginationSection
        :total-data="totalData"
        @get-emit="getspotList"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useEventsStore } from "@/stores/tourism/eventsStore"
import EventsTable from "./eventsTable.vue"

const configStore = useConfigStore()

const eventsStore = useEventsStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'parent_id', sortable: false },
  { label: 'Name', prop: 'name', sortable: false },
  { label: 'Location', prop: 'location', sortable: false },
  { label: 'Time', prop: 'time', sortable: false },        

  // { label: 'Description', prop: 'description', sortable: false },        
])

const totalData = ref(0)

const getspotList = async (pageSize, pageNo) => {
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await eventsStore.getEvents(parameter)

    

    spotList.value = data.data.data

    totalData.value = data.data.total
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getspotList(10, 1)
})
</script>


<style scoped>
.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px; 
}
</style>
