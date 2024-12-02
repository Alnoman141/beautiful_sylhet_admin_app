<template>
  <div>
    <ElCard>
      <div class="text-end my-4">
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
      </div>

      
      <div class="mb-5">
        <HotelTable
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
import { useHotelStore } from "@/stores/tourism/hotelStore"
import HotelTable from "./hotelTable.vue"

const configStore = useConfigStore()

const hotelStore = useHotelStore()

const spotList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },
  
  { label: 'Phone', prop: 'phone', sortable: true },
  { label: 'Address', prop: 'address', sortable: true },   

  
  { label: 'Spot Name', prop: 'spot_name', sortable: true },
  { label: 'Category ', prop: 'category_name', sortable: true },

  
  { label: 'Type', prop: 'type_name', sortable: true },
  { label: 'Description', prop: 'description', sortable: true },        
])

const getspotList = async () => {
  try {
    const { data } = await hotelStore.getHotel()

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
