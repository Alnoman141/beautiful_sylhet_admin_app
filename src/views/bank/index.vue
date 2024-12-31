<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Bank List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'createBank' }"
            
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Bank"
              placement="top-start"
            >
              Create Bank
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
          @table-data-emit="getspotList"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useBankStore } from "@/stores/tourism/bankStore"
import BankTable from "./bankTable.vue"

const configStore = useConfigStore()

const bankStore = useBankStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Bank Name", prop: "name", sortable: false },
  { label: "Bank Name English", prop: "name_en", sortable: false },
  
])

const totalData = ref(0)
const loading = ref(false)

const getspotList = async (pageSize, pageNo) => {
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await bankStore.getBank()

    spotList.value = data.data

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
