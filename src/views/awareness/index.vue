<template>
  <div>
    <ElCard class="my-4 ">
      <VRow>
        <VCol>
          <b> Awareness </b>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <!-- {{ awarenessList }} -->
        <AwarenessTable
          v-loading="loading"
          :filter-table-data="awarenessList"
          :columns="columns"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useAwarenessStore } from "@/stores/tourism/awarenessStore"
import AwarenessTable from "./awarenessTable.vue"

const loading = ref(true)
const configStore = useConfigStore()

const awarenessStore = useAwarenessStore()

const awarenessList = ref([])

const columns = ref( [
  
  { label: 'Awareness', prop: 'name', sortable: false },        
])

const getAwarenessList = async () => {
  loading.value = true
  try {
    const { data } = await awarenessStore.getAwareness()

    awarenessList.value = data.data
    loading.value = false
    
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getAwarenessList()
})
</script>
