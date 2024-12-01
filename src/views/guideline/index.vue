<template>
  <div>
    <ElCard>
      <div class="mb-5">
        <GuidelineTable
          :filter-table-data="guidelineList"
          :columns="columns"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { useGuidelineStore } from "@/stores/tourism/guidelineStore"
import GuidelineTable from "./guidelineTable.vue"

const configStore = useConfigStore()

const guidelineStore = useGuidelineStore()

const guidelineList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },        
])

const getGuidelineList = async () => {
  try {
    const { data } = await guidelineStore.getGuideline()

    guidelineList.value = data.data

    console.log(guidelineList.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getGuidelineList()
})
</script>
