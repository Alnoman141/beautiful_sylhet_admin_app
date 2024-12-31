<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Transport Counter List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'createTransport' }"
            
            class="create-btn"
          >
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Create Transport"
              placement="top-start"
            >
              Create Transport Counter
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
import { useTransportStore } from "@/stores/tourism/transportStore"
import NewsTable from "./transportTable.vue"

const loading = ref(false)
const configStore = useConfigStore()

const transportStore = useTransportStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Name", prop: "name", sortable: false },

  // { label: "Phone", prop: "phone", sortable: false },
  // { label: "Address", prop: "address", sortable: false },
  { label: "Description", prop: "description", sortable: false },
])

const totalData = ref(0)

const getspotList = async (pageSize, pageNo) => {
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await transportStore.getTransport(parameter)

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
