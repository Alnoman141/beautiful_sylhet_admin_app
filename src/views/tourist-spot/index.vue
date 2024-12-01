<template>
  <div>
    <ElCard>
      <div class="text-end">
        <RouterLink
          type="primary"
          :underline="false"          
          
          :to="{ name: 'createTouristSpot'}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
        >
          Create  Spot
        </RouterLink>
      </div>
      <div class="mb-5">
        <SpotTable
          :filter-table-data="spotList"
          :columns="columns"
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

    console.log(spotList.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getspotList()
})
</script>
