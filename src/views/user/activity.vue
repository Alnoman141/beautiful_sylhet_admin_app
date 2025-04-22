<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Activity Log Report</b>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <ActivityTable
          v-loading="loading"
          :filter-table-data="spotList"
          :columns="columns"
          @table-data-emit="getspotList(20,1)"
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
import { useUserStore } from "@/stores/tourism/userStore"
import { onMounted, ref } from "vue"
import ActivityTable from "./activityTable.vue"

const configStore = useConfigStore()

const userStore = useUserStore()

const spotList = ref([])

const columns = ref( [
  // { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Module', prop: 'log_name', sortable: false },  
  { label: 'Type', prop: 'event', sortable: false },  
  { label: 'User Role', prop: 'roles', sortable: false },   
  { label: 'Description', prop: 'description', sortable: false },   
      
       
        
])

const totalData = ref(0)
const loading = ref(false)

const getspotList = async (pageSize, pageNo) => {
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
    activity: 'new',
  }
  try {
    const { data } = await userStore.getUserActivity(parameter)

    loading.value = false
  
    

    spotList.value = data.data.data
    
    
    totalData.value = data.data.total
    loading.value = false
    
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getspotList(20, 1)
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
