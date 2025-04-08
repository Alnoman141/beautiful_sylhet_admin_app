<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Danger Zone List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'dangerzone')"
            type="primary"
            :underline="false"
            :to="{ name: 'createRedZone' }"
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Danger Zone"
              placement="top-start"
            >
              Create Danger Zone
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <BankTable
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
import { useRedZoneStore } from "@/stores/tourism/redZoneStore"
import { onMounted, ref } from "vue"
import BankTable from "./redZoneTable.vue"

const loading = ref(true)
const configStore = useConfigStore()

const redZoneStore = useRedZoneStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Name", prop: "name", sortable: false },
  { label: "Spot Name", prop: "spot_name", sortable: false },
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
    language_id: 2,
  }
  try {
    const { data } = await redZoneStore.getRedZone(parameter)

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
