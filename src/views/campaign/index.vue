<template>
  <div>
    <ElCard>
      <div class="text-end my-4">
        <RouterLink
          type="primary"
          :underline="false"          
          
          :to="{ name: 'createCampaign'}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
          class="create-btn "
        >
          Create  Campaign
        </RouterLink>
      </div>
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
import { useCampaignStore } from "@/stores/tourism/campaignStore"
import EventsTable from "./campaignTable.vue"

const configStore = useConfigStore()

const campaignStore = useCampaignStore()

const spotList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'parent_id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },        
  { label: 'Description', prop: 'description', sortable: true },        
])

const getCampaignList = async () => {
  try {
    const { data } = await campaignStore.getCampaign()

    console.log("data", data)

    spotList.value = data.data.data

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
