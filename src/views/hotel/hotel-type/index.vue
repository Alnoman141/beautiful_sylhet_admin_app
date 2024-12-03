<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Hotel Type List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createHotelType'}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn "
          >
            Create  Hotel Type
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>

    <ElCard>
      <div class="mb-5">
        <NewsTable
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
  { label: 'ID', prop: 'parent_id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },    
])

const getspotList = async () => {
  try {
    const { data } = await hotelTypeStore.getHotelType()

    spotList.value = data.data

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
