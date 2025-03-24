<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Restaurant List</b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            v-if="$can('create', 'dangerzone')"
            type="primary"
            :underline="false"
            :to="{ name: 'createRestaurant' }"
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Create Restaurant"
              placement="top-start"
            >
              Create Restaurant
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <RestaurantTable
          v-loading="loading"
          :filter-table-data="spotList"
          :columns="columns"
          :page-no="page"
          :page-size="size"
          @table-data-emit="getRestaurantList"
        />
      </div>
      <PaginationSection
        :total-data="totalData"
        @get-emit="getRestaurantList"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useRestaurantStore } from "@/stores/tourism/restaurantStore"
import { onMounted, ref } from "vue"
import RestaurantTable from "./restaurantTable.vue"

const loading = ref(true)
const configStore = useConfigStore()

const restaurantStore = useRestaurantStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Restaurant Name", prop: "name", sortable: false },

  { label: "Spot Name", prop: "spot", sortable: false },
])

const totalData = ref(0)
const page = ref(1)
const size = ref(10)

const getRestaurantList = async (pageSize, pageNo) => {
  size.value = pageSize
  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
  }
  try {
    const { data } = await restaurantStore.getRestaurant(parameter)

    loading.value = false
    page.value = data.data.current_page

    spotList.value = data.data.data

    totalData.value = data.data.total
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

onMounted(() => {
  getRestaurantList(10, 1)
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
