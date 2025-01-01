<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> News List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createNews'}"
            
            class="create-btn "
          >
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Create News"
              placement="top-start"
            >
              Create  News
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
          :page-no="page"
          :page-size="size"
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
import { useNewsStore } from "@/stores/tourism/newsStore"
import NewsTable from "./newsTable.vue"

const configStore = useConfigStore()

const newsStore = useNewsStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Type', prop: 'type', sortable: false },
  { label: 'Headline', prop: 'name', sortable: false },        
])

const totalData = ref(0)
const loading = ref(false)
const page = ref(1)
const size = ref(10)

const getspotList = async (pageSize, pageNo) => {
  size.value = pageSize
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
    web: 1,
  }
  try {
    const { data } = await newsStore.getNews(parameter)

    page.value = data.data.current_page
    spotList.value = data.data.data
    totalData.value = data.data.total
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
