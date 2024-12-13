<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Hotel List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createHotel'}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn "
          >
            Create  Hotel
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <HotelTable
          :filter-table-data="spotList"
          :columns="columns"
          @table-data-emit="getspotList"
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

import { useHotelStore } from "@/stores/tourism/hotelStore"
import HotelTable from "./hotelTable.vue"

const configStore = useConfigStore()

const hotelStore = useHotelStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Name', prop: 'name', sortable: false },
  
  { label: 'Phone', prop: 'phone', sortable: false },
  { label: 'Address', prop: 'address', sortable: false },   

  
  { label: 'Spot Name', prop: 'spot_name', sortable: false },
  { label: 'Category ', prop: 'category_name', sortable: false },

  
  { label: 'Type', prop: 'type_name', sortable: false },

  // { label: 'Description', prop: 'description', sortable: false },        
])

const totalData = ref(0)

const getspotList = async (pageSize, pageNo) => {
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await hotelStore.getHotel(parameter)

    

    spotList.value = data.data.data
    totalData.value= data.data.total
    
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
