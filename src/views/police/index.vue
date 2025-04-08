<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Tourist Police List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'police')"
            type="primary"
            :underline="false"
            :to="{ name: 'createPolice' }"
            
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Police"
              placement="top-start"
            >
              Create Tourist Police
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
import { usePoliceStore } from "@/stores/tourism/policeStore"
import { onMounted, ref } from "vue"
import BankTable from "./policeTable.vue"

const configStore = useConfigStore()

const policeStore = usePoliceStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Name", prop: "name", sortable: false },
  { label: "Spot Name", prop: "spot_name", sortable: false },
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
    language_id: 2, 
  }
  try {
    const { data } = await policeStore.getPolice(parameter)

    loading.value = false
    page.value = data.data.current_page     
    spotList.value = data.data.data

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
