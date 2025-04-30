<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Complain List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'complaincategory')"
            type="primary"
            :underline="false"
            :to="{ name: 'createComplain' }"
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Complain"
              placement="top-start"
            >
              Create Complain
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <BankTable
          v-loading="loading"
          :filter-table-data="spotList"
          :columns="columns"
          :page-no="page"
          :page-size="size"
          @table-data-emit="getspotList"
        />
      </div>
      <!--
        <PaginationSection
        :total-data="totalData"
        @get-emit="getspotList"
        /> 
      -->
      <PaginationSection
        :total-data="totalData"
        :page-size-passed="size"
        @get-emit="getspotList"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useComplainStore } from "@/stores/tourism/complainStore"
import { onMounted, ref } from "vue"
import BankTable from "./complainTable.vue"

const loading = ref(true)
const configStore = useConfigStore()

const complainStore = useComplainStore()

const spotList = ref([])

const columns = ref([

  { label: 'S.L', prop: 'id', sortable: false },
  { label: 'Category', prop: 'category', sortable: false },
  { label: 'Description', prop: 'description', sortable: false },            
  { label: 'Date', prop: 'date', sortable: false }, 
])

const totalData = ref(0)
const page = ref(1)
const size = ref(10)

const getspotList = async (pageSize, pageNo) => {
  size.value = pageSize
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await complainStore.getComplainList(parameter)

    page.value = data.data.current_page

    spotList.value = data.data.data

    totalData.value = data.data.total
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getspotList(size.value, 1)
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
