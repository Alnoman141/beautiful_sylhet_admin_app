<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> ATM List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'atm')"
            type="primary"
            :underline="false"
            :to="{ name: 'createAtm' }"
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create ATM"
              placement="top-start"
            >
              Create ATM
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
          @table-data-emit="getspotList(10, 1)"
        />
      </div>
      <PaginationSection
        :total-data="totalData"
        :page-size-passed="size"
        @get-emit="getspotList"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useAtmStore } from "@/stores/tourism/atmStore"
import { onMounted, ref } from "vue"
import BankTable from "./atmTable.vue"

const loading = ref(false)
const configStore = useConfigStore()

const atmStore = useAtmStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Spot Name", prop: "spot_name", sortable: false },
  { label: "ATM Name Bangla", prop: "name", sortable: false },

  { label: "ATM Name English", prop: "name_en", sortable: false },
])

const totalData = ref(0)
const page = ref(1)
const size = ref(100)

const getspotList = async (pageSize, pageNo) => {
  size.value = pageSize
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
    language_id: 2,
  }
  try {
    const { data } = await atmStore.getAtm(parameter)

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
