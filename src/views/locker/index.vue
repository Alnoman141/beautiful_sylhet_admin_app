<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Locker List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createLocker'}"
            
            class="create-btn "
          >
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Create Locker"
              placement="top-start"
            >
              Create  Locker
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
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"

import { useLockerStore } from "@/stores/tourism/lockerStore"
import NewsTable from "./lockerTable.vue"

const loading   = ref(true)
const configStore = useConfigStore()

const lockerStore = useLockerStore()

const spotList = ref([])

const columns = ref([
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Spot Name', prop: 'spot_name', sortable: false },
  { label: 'Phone', prop: 'phone', sortable: false },
  { label: 'Address', prop: 'address', sortable: false },        

  // { label: 'Description', prop: 'description', sortable: false },        
])

const totalData = ref(0)

const getspotList = async (pageSize, pageNo) => {
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await lockerStore.getLocker()

    

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
