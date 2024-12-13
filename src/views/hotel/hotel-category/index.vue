<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Hotel Category List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createHotelCategory'}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn "
          >
            Create  Hotel Category
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
import { useHotelCategoryStore } from "@/stores/tourism/hotelCategoryStore"
import NewsTable from "./table.vue"

const configStore = useConfigStore()

const hotelCategoryStore = useHotelCategoryStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'parent_id', sortable: false },
  { label: 'Name', prop: 'name', sortable: false },    
])

const getspotList = async () => {
  try {
    const { data } = await hotelCategoryStore.getHotelCategory()

    spotList.value = data.data

    
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
