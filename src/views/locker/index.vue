<template>
  <div>
    <ElCard>
      <div class="text-end my-4">
        <RouterLink
          type="primary"
          :underline="false"          
          
          :to="{ name: 'createLocker'}"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
          class="create-btn "
        >
          Create  Locker
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
import { useLockerStore } from "@/stores/tourism/lockerStore"
import NewsTable from "./newsTable.vue"

const configStore = useConfigStore()

const lockerStore = useLockerStore()

const spotList = ref([])

const columns = ref( [
  // { label: 'ID', prop: 'id', sortable: true },
  { label: 'Phone', prop: 'phone', sortable: true },
  { label: 'Address', prop: 'address', sortable: true },        
  { label: 'Description', prop: 'description', sortable: true },        
])

const getspotList = async () => {
  try {
    const { data } = await lockerStore.getLocker()

    console.log("data", data)

    spotList.value = data.data

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
