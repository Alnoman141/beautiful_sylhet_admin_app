<template>
  <div>
    <ElCard class="my-4">
      <VRow class=" ">
        <VCol>
          <b> Events List</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            v-if="$can('create', 'event')"
            type="primary"
            :underline="false"
            :to="{ name: 'createEvents' }"
            class="create-btn"
          >
            <ElTooltip
              class="box-item"
              effect="dark"
              content="Create Event"
              placement="top-start"
            >
              Create Event
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElCard>
      <div class="mb-5">
        <EventsTable
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
import { useEventsStore } from "@/stores/tourism/eventsStore"
import EventsTable from "./eventsTable.vue"

const configStore = useConfigStore()

const eventsStore = useEventsStore()

const spotList = ref([])

const columns = ref([
  { label: "S.L", prop: "id", sortable: false },
  { label: "Name", prop: "name", sortable: false },
  { label: "Location", prop: "location", sortable: false },
  { label: "Time", prop: "time", sortable: false },
  { label: "Expiry", prop: "expiry", sortable: false },

  // { label: 'Description', prop: 'description', sortable: false },
])

const totalData = ref(0)
const loading = ref(false)
const page = ref(1)
const size = ref(10)

const getspotList = async (pageSize, pageNo) => {
  const size = pageSize

  loading.value = true
  let parameter = {
    page: pageNo,
    per_page: pageSize,
    web: 1,
  }
  try {
    const { data } = await eventsStore.getEvents(parameter)

    loading.value = false
    page.value = data.data.current_page

    spotList.value = data.data.data

    // convert expiry date to am/pm format and update the spotList
    spotList.value.forEach(item => {
      const [datePart24, timePart24] = item.expiry
        ? item.expiry.split(" ")
        : ""

      let [hours24, minutes24, seconds24] = timePart24
        ? timePart24.split(":")
        : ""
      const period24 = Number(hours24) >= 12 ? "pm" : "am"

      hours24 = Number(hours24) % 12 || 12

      // if date is expired then show Expired else show the date
      item.expiry =
        item.expiry == null
          ? "No expiry"
          : new Date(item.expiry) < new Date()
            ? `Expired at ${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`
            : `${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`
    })

    totalData.value = data.data.total
  } catch (error) {
    loading.value = false
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
