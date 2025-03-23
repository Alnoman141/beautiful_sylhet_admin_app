<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Danger Zone Category List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            v-if="$can('create', 'dangerzone')"
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createRedZoneCategory'}"
            
            class="create-btn "
          >
            <ElTooltip
              effect="dark"
              content="Create Dangar Zone Category"
              placement="top"
            >
              Create  Dangar Zone Category
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
import { useRedZoneCategoryStore } from "@/stores/tourism/redZoneCategoryStore"

import NewsTable from "./table.vue"

const configStore = useConfigStore()

const RedZoneCategoryStore = useRedZoneCategoryStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Category', prop: 'name', sortable: false },

  // { label: 'Category English', prop: 'name_en', sortable: false },        
])

const loading = ref(false)

const getspotList = async () => {

  loading.value = true

  try {
    const { data } = await RedZoneCategoryStore.getRedZoneCategory()

    spotList.value = data.data
    
    loading.value = false

    
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
