<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Hotel Type List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            v-if="$can('create', 'hoteltype')"
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createHotelType'}"
            
            class="create-btn "
          >
            <ElTooltip 
              class="box-item"
              effect="dark"
              content="Create Hotel Type"
            >
              Create
              Hotel
              Type
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>

    <ElCard>
      <div class="mb-5">
        <NewsTable
          v-loading="loading"
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
import { useHotelTypeStore } from "@/stores/tourism/hotelTypeStore"
import NewsTable from "./table.vue"

const configStore = useConfigStore()

const hotelTypeStore = useHotelTypeStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Type Bangla', prop: 'name', sortable: false },    
  { label: 'Type English', prop: 'name_en', sortable: false },    
])

const loading = ref(false)

const getspotList = async () => {
  loading.value = true
  try {
    const { data } = await hotelTypeStore.getHotelType()

    loading.value = false
    spotList.value = data.data
   
    
  } catch (error) {
    loading.value = false
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
