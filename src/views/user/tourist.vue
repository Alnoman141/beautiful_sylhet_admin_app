<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Tourist List</b>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <VTextField
          v-model="search"
          v-debounce:300="getspotList"
          class="mb-4"
          placeholder="Search Tourist by name email or phone"
          clearable
        >
          <template #prepend-inner>
            <VIcon
              size="22"
              icon="tabler-search"
            />
          </template>
        </VTextField>
        
        <BankTable
          v-loading="loading"
          :filter-table-data="spotList"
          :columns="columns"
          :page-no="page"
          :page-size="size"
          @table-data-emit="getspotList(10, 1)"
        />
      </div>
      <PaginationSection
        :total-data="totalData"
        @get-emit="getspotList"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useUserStore } from "@/stores/tourism/userStore"
import { onMounted, ref } from "vue"
import BankTable from "./userTable.vue"

const configStore = useConfigStore()

const userStore = useUserStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Name", prop: "name", sortable: false },
  { label: "Email", prop: "email", sortable: false },
  { label: "Phone", prop: "phone", sortable: false },
])

const page = ref(1)
const size = ref(10)
const totalData = ref(0)
const loading = ref(false)
const search = ref("")

const getspotList = async (pageSize, pageNo) => {
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
    name: search.value,
  }
  try {
    const { data } = await userStore.getTouristList(parameter)

    loading.value = false
    page.value = data.data.current_page

    spotList.value = data.data.data

    totalData.value = data.data.total
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getspotList(10, 1)
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
