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
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Create Tourist Spot"
              placement="top-start"
            >
              Create  Tourist Spot
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <SpotTable
          v-loading="loading"
          :filter-table-data="spotList"
          :columns="columns"
          @table-data-emit="getspotList"
        />
        <PaginationSection
          :total-data="totalData"
          @get-emit="getspotList"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useSpotStore } from "@/stores/tourism/spotStore"
import SpotTable from "./spotTable.vue"

const loading = ref(false)
const configStore = useConfigStore()

const spotStore = useSpotStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Name', prop: 'name', sortable: false }, 
  { label: 'English Name', prop: 'name_en', sortable: false },       
  { label: 'Image', prop: 'image', sortable: false },        
])

const totalData = ref(0)

const getspotList = async (pageSize, pageNo) => {
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await spotStore.getSpot(parameter)

    spotList.value = data.data.data    
    totalData.value= data.data.total
    loading.value = false
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
