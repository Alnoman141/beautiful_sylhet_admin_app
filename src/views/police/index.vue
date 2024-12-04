<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Police List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createPolice'}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn "
          >
            Create Police
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <BankTable
          :filter-table-data="spotList"
          :columns="columns"
          @table-data-emit="getBankList"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import { usePoliceStore } from "@/stores/tourism/policeStore"
import { onMounted, ref } from "vue"
import BankTable from "./policeTable.vue"

const configStore = useConfigStore()

const policeStore = usePoliceStore()

const spotList = ref([])

const columns = ref( [
  { label: 'ID', prop: 'parent_id', sortable: true },
  { label: 'Name', prop: 'name', sortable: true },        
  { label: 'Spot Name', prop: 'spot_name', sortable: true },        
        
])

const getBankList = async () => {
  try {
    const { data } = await policeStore.getPolice()

    console.log("data", data)

    spotList.value = data.data.data

    console.log(spotList.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  
  getBankList()
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
