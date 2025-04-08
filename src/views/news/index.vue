<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> News List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            v-if="$can('create', 'news')"
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
  { label: "Expiry", prop: "expiry", sortable: false },

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
    language_id: 2,
  }
  try {
    const { data } = await newsStore.getNews(parameter)

    loading.value = false
    page.value = data.data.current_page
    spotList.value = data.data.data

    // convert expiry date to am/pm format and update the spotList
    spotList.value.forEach(item => {
      console.log(item)

      const [datePart24, timePart24] = item.expiry ? item.expiry.split(' ') : ''
      let [hours24, minutes24, seconds24] = timePart24 ? timePart24.split(':') : ''
      const period24 = Number(hours24) >= 12 ? 'pm' : 'am'

      hours24 = Number(hours24) % 12 || 12

      // if date is expired then show Expired else show the date
      item.expiry = item.expiry == null ? ('No expiry')  :  new Date(item.expiry) < new Date() ? `Expired at ${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}` : `${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`
    })
    totalData.value = data.data.total
    loading.value = false
    
  } catch (error) {
    loading.value = false
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
