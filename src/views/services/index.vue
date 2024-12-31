<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Tourism Helpline List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            v-if="spotList.length == 0"
            type="primary"
            :underline="false"          
          
            
            :to="{ name: 'createTourism', params: { type: 1 } }"
           
            class="create-btn "
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Tourism Helpline"
              placement="top-start"
            >
              Create Tourism Helpline
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    
    <div class="mb-5">
      <NewsTable
        v-loading="loading"
        :filter-table-data="spotList"
        :descriptions="descriptions"
        @table-data-emit="getspotList"
      />
    </div>
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

const getspotList = async () => {
  loading.value = true
  let parameter = {
   
    type: 1,
  }
  try {
    const { data } = await serviceStore.getService(parameter)

    

    spotList.value = data.data?.services
    descriptions.value = data.data

   

    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getspotList()
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
