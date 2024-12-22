<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Tourism Helpline List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            
            :to="{ name: 'createTourism', params: { type: 1 } }"
           
            class="create-btn "
          >
            Create Tourism Helpline
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <NewsTable
          v-loading="loading"
          :filter-table-data="spotList"
          :descriptions="descriptions"
          @table-data-emit="getspotList"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useServiceStore } from "@/stores/tourism/serviceStore"
import { useRoute } from "vue-router"
import NewsTable from "./serviceTable.vue"

const loading   = ref(true)
const configStore = useConfigStore()

const serviceStore = useServiceStore()

const spotList = ref([])
const route = useRoute()
const descriptions = ref({})

// const totalData = ref(0)

const getspotList = async (pageSize, pageNo) => {
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
    type: 1,
  }
  try {
    const { data } = await serviceStore.getService(parameter)

    

    spotList.value = data.data?.services
    descriptions.value = data.data?.descriptions

   

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
