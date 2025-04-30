<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Tourist Places List</b />
        </VCol>
        <VCol class="text-right">
          <RouterLink
            v-if="$can('create', 'tourismcorporation')"
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createTouristSpot'}"
            
            class="create-btn "
          >
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Create Tourist Place"
              placement="top-start"
            >
              Create  Tourist Place
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
          :page-no="page"
          :page-size="size"
          @table-data-emit="getspotList"
        />

        
        <!--
          <PaginationSection
          :total-data="totalData"
          @get-emit="getspotList"
          /> 
        -->
        <PaginationSection
          :total-data="totalData"
          :page-size-passed="size"
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
  { label: 'পর্যটন কেন্দ্রের নাম', prop: 'name', sortable: false }, 
  { label: 'Tourist Spot Name', prop: 'name_en', sortable: false },       
  { label: 'Image', prop: 'image', sortable: false },        
])

const totalData = ref(0)
const page = ref(1)
const size = ref(10)

const getspotList = async (pageSize, pageNo) => {
  size.value = pageSize
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await spotStore.getSpot(parameter)

    loading.value = false
    page.value = data.data.current_page
    spotList.value = data.data.data    
    totalData.value= data.data.total
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

onMounted(() => {  
  getspotList(size.value, 1)
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
