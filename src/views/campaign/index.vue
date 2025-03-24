<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> DC Activities</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'campaign')"
            type="primary"
            :underline="false"
            :to="{ name: 'createCampaign' }"
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Campaign"
              placement="top-start"
            >
              Create DC Activity
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
import { useCampaignStore } from "@/stores/tourism/campaignStore"
import { ref } from "vue"
import EventsTable from "./campaignTable.vue"

const loading = ref(true)
const configStore = useConfigStore()

const campaignStore = useCampaignStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "DC Activity Name Bangla", prop: "name", sortable: false },
  { label: "DC Activity Name English", prop: "name_en", sortable: false },
  { label: "Description", prop: "description", sortable: false },
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
    const { data } = await campaignStore.getCampaign(parameter)

    loading.value = false
    page.value = data.data.current_page
    spotList.value = data.data.data

    totalData.value = data.data.total

    
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
