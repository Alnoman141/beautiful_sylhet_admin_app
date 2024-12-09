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
          :filter-table-data="spotList"
          :columns="columns"
          @table-data-emit="getCampaignList"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useNoticeStore } from "@/stores/tourism/noticeStore"
import EventsTable from "./noticeTable.vue"

const configStore = useConfigStore()

const noticeStore = useNoticeStore()

const spotList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'parent_id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },        
        
])

const getCampaignList = async () => {
  try {
    const { data } = await noticeStore.getNotice()

    console.log("data", data.data.data)

    spotList.value = data.data

    console.log(spotList.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getCampaignList()
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
