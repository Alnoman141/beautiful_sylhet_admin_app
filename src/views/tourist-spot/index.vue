<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Tourist Spot List</b />
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createTouristSpot'}"
            
            class="create-btn "
          >
            Create  Tourist Spot
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <SpotTable
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
import { useSpotStore } from "@/stores/tourism/spotStore"
import SpotTable from "./spotTable.vue"

const configStore = useConfigStore()

const spotStore = useSpotStore()

const spotList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },        
])

const getspotList = async () => {
  try {
    const { data } = await spotStore.getSpot()

    spotList.value = data.data.data

    
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
