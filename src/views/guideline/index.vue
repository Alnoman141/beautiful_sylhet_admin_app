<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol :cols="guidelineList.length == 0 ?'6' : '12'">
          <b> Instructions</b>
        </VCol>
        <VCol
          v-if="guidelineList.length == 0" 
          :cols="guidelineList.length == 0 ?'6' : '12'"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'guideline')"
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createGuideline'}"
            
            class="create-btn "
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Guideline"
              placement="top-start"
            >
              Create Guideline
            </ElTooltip>
          </RouterLink>
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
  
  { label: "Instructions", prop: "name", sortable: false },
])

const getGuidelineList = async () => {
  loading.value = true
  try {
    const { data } = await guidelineStore.getGuideline()

    loading.value = false
    guidelineList.value = data.data

    
  } catch (error) {
    loading.value = false
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
