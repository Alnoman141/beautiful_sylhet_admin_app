<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Announcement List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'announcement')"
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createNotice'}"
            
            class="create-btn "
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Notice"
              placement="top-start"
            >
              Create  Announcement
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <EventsTable
          v-loading="loading"
          :filter-table-data="spotList"
          :columns="columns"
          :page-no="page"
          :page-size="size"
          @table-data-emit="getCampaignList"
        />
      </div>
      <PaginationSection
        :total-data="totalData"
        @get-emit="getCampaignList"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useNoticeStore } from "@/stores/tourism/noticeStore"
import EventsTable from "./noticeTable.vue"

const configStore = useConfigStore()

const noticeStore = useNoticeStore()

const spotList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'id', sortable: false },
  { label: 'Bangla', prop: 'name', sortable: false }, 
  { label: 'English', prop: 'name_en', sortable: false }, 
        
  { label: 'Date', prop: 'date', sortable: false },   
  { label: "Expiry", prop: "expiry", sortable: false },

        
])

const totalData = ref(0)
const loading = ref(false)
const page = ref(1)
const size = ref(10)

const getCampaignList = async (pageSize, pageNo) => {
  size.value = pageSize
  loading.value = true
  let params = {
    type: 'all',
    page: pageNo,
    per_page: pageSize,
    web: 1,
  }
  try {
    const { data } = await noticeStore.getNotice(params)

    loading.value = false
    page.value = data.data.current_page
    

    spotList.value = data.data.data

    // convert expiry date to am/pm format and update the spotList
    spotList.value.forEach(item => {
      

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
  
  getCampaignList(10, 1)
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
