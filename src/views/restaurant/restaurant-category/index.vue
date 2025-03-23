<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Restaurant Category List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            v-if="$can('create', 'hotelcategory')"
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createRestaurantCategory'}"
            
            class="create-btn "
          >
            <ElTooltip
              effect="dark"
              content="Create Restaurant Category"
              placement="top"
            >
              Create  Restaurant Category
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
import { useRestaurantCategoryStore } from "@/stores/tourism/restaurantCategoryStore"
import NewsTable from "./table.vue"

const configStore = useConfigStore()

const restaurantCategoryStore = useRestaurantCategoryStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Restaurant Category ', prop: 'name', sortable: false },

  // { label: 'Category English', prop: 'name_en', sortable: false },        
])

const loading = ref(false)

const getspotList = async () => {

  loading.value = true

  try {
    const { data } = await restaurantCategoryStore.getRestaurantCategory()

    spotList.value = data.data
    console.log(data)
    data.status_code == 200 ? loading.value = false :''

    
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
