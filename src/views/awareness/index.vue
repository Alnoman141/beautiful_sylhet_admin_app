<template>
  <div>
    <ElCard class="my-4 ">
      <VRow>
        <VCol :cols="awarenessList.length == 0 ?'6' : '12'">
          <b> Awareness </b>
        </VCol>
        <VCol
          v-if="awarenessList.length == 0" 
          :cols="awarenessList.length == 0 ?'6' : '12'"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'awareness')"
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createAwareness'}"
            
            class="create-btn "
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Awareness"
              placement="top-start"
            >
              Create Awareness
            </ElTooltip>
          </RouterLink>
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
    const { data } = await awarenessStore.editAwareness()

    loading.value = false
    awarenessList.value = data.data
    
    
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

onMounted(() => {
  
  getAwarenessList()
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
