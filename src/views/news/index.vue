<template>
  <div>
    <ElCard>
      <div class="text-end my-4">
        <RouterLink
          type="primary"
          :underline="false"          
          
          :to="{ name: 'createNews'}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
          class="create-btn "
        >
          Create  News
        </RouterLink>
      </div>
      <div class="mb-5">
        <NewsTable
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
import { useNewsStore } from "@/stores/tourism/newsStore"
import NewsTable from "./newsTable.vue"

const configStore = useConfigStore()

const newsStore = useNewsStore()

const spotList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'id', sortable: true },
  { label: 'Type', prop: 'type', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },        
])

const getspotList = async () => {
  try {
    const { data } = await newsStore.getNews()

    spotList.value = data.data.data

    console.log(spotList.value)
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
