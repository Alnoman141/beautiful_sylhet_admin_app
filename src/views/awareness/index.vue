<template>
  <div>
    <ElCard>
      <div class="mb-5">
        <!-- {{ awarenessList }} -->
        <AwarenessTable
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

const configStore = useConfigStore()

const awarenessStore = useAwarenessStore()

const awarenessList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },        
])

const getAwarenessList = async () => {
  try {
    const { data } = await awarenessStore.getAwareness()

    awarenessList.value = data.data

    console.log(awarenessList.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getAwarenessList()
})
</script>
