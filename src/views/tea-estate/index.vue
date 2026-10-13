<template>
  <div>
    <ElCard class=" my-4">
      <VRow>
        <VCol>
          <b> Tea Estate List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            v-if="$can('create', 'tea estate')"
            type="primary"
            :underline="false"          
          
            :to="{ name: 'createTeaEstate' }"
            
            class="create-btn "
          >
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Create Tea Estate"
              placement="top-start"
            >
              Create  Tea Estate
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <Table
          v-loading="loading"
          :filter-table-data="teaEstateList"
          :columns="columns"
          :page-no="page"
          :page-size="size"
          @table-data-emit="getteaEstateList"
        />
      </div>

      <PaginationSection
        :total-data="totalData"
        :page-size-passed="size"
        @get-emit="getteaEstateList"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useTeaEstateStore } from "@/stores/tourism/teaEstateStore"
import Table from "./Table.vue"

const configStore = useConfigStore()

const teaEstateStore = useTeaEstateStore()

const teaEstateList = ref([])

const columns = ref( [
  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Name', prop: 'name', sortable: false },
  { label: 'Location', prop: 'location', sortable: false },
  { label: 'Distance', prop: 'distance', sortable: false },

])

const totalData = ref(0)
const loading = ref(false)
const page = ref(1)
const size = ref(10)

const getteaEstateList = async (pageSize, pageNo) => {
  size.value = pageSize
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
    web: 1,
    language_id: 2,
  }
  try {
    const { data } = await teaEstateStore.getTeaEstate(parameter)

    loading.value = false
    page.value = data.data.current_page
    teaEstateList.value = data.data.data

    // convert expiry date to am/pm format and update the teaEstateList
    teaEstateList.value.forEach(item => {
      

      const [datePart24, timePart24] = item.expiry ? item.expiry.split(' ') : ''
      let [hours24, minutes24, seconds24] = timePart24 ? timePart24.split(':') : ''
      const period24 = Number(hours24) >= 12 ? 'pm' : 'am'

      hours24 = Number(hours24) % 12 || 12

      // if date is expired then show Expired else show the date
      item.expiry = item.expiry == null ? ('No expiry')  :  new Date(item.expiry) < new Date() ? `Expired at ${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}` : `${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`
    })
    totalData.value = data.data.total
    loading.value = false
    
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

onMounted(() => {
  
  getteaEstateList(size.value, 1)
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
