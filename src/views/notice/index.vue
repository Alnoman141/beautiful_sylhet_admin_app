<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Notice List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createNotice'}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn "
          >
            Create  Notice
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
  { label: 'Name', prop: 'name', sortable: false }, 
  { label: 'Name English', prop: 'name_en', sortable: false }, 
        
  { label: 'Date', prop: 'date', sortable: false },        
        
])

const totalData = ref(0)
const loading = ref(false)

const getCampaignList = async (pageSize, pageNo) => {
  loading.value = true
  let params = {
    type: 'all',
    page: pageNo,
    per_page: pageSize }
  try {
    const { data } = await noticeStore.getNotice(params)

    

    spotList.value = data.data.data

    totalData.value = data.data.total

    loading.value = false
  } catch (error) {
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
