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
          @table-data-emit="getspotList"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useEventsStore } from "@/stores/tourism/eventsStore"
import EventsTable from "./eventsTable.vue"

const configStore = useConfigStore()

const eventsStore = useEventsStore()

const spotList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'parent_id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },
  { label: 'Location', prop: 'location', sortable: true },
  { label: 'Time', prop: 'time', sortable: true },        
  { label: 'Description', prop: 'description', sortable: true },        
])

const getspotList = async () => {
  try {
    const { data } = await eventsStore.getEvents()

    console.log("data", data)

    spotList.value = data.data.data

    console.log(spotList.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getspotList()
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
