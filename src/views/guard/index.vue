<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Life Guard List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createGuard'}"
            
            class="create-btn "
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Life Guard"
              placement="top-start"
            >                         
              Create Life Guard
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
import { useGuardStore } from "@/stores/tourism/guardStore"
import { onMounted, ref } from "vue"
import BankTable from "./guardTable.vue"

const configStore = useConfigStore()

const guardStore = useGuardStore()

const spotList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Name', prop: 'name', sortable: false },        
  { label: 'Spot Name', prop: 'spot_name', sortable: false },        
        
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
    const { data } = await guardStore.getGuard(parameter)

    

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
