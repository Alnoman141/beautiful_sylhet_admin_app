<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Instructions</b>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <GuidelineTable
          v-loading="loading"
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

const loading = ref(true)
const configStore = useConfigStore()

const guidelineStore = useGuidelineStore()

const guidelineList = ref([])

const columns = ref([
  
  { label: "Guideline", prop: "name", sortable: false },
])

const getGuidelineList = async () => {
  loading.value = true
  try {
    const { data } = await guidelineStore.getGuideline()

    guidelineList.value = data.data

    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getGuidelineList()
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
