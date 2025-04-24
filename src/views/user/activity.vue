<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b>Activity Log Report</b>
        </VCol>
      </VRow>
    </ElCard>

    <ElCard>
      <div class="mb-5">
        <ElRow :gutter="24" class="mb-4">
          <!-- User Dropdown -->
          <ElCol :span="4">
      <!-- <label class="text-body-2 text-high-emphasis">User</label> -->

            <ElSelect
              v-model="selecteUserId"
              filterable
              clearable
              placeholder="Select User"
              @change="getspotList(20, 1)"
            >
              <ElOption
                v-for="user in userList"
                :key="user.id"
                :label="user.name"
                :value="user.id"
              />
            </ElSelect>
          </ElCol>

          <!-- Module Dropdown -->
          <ElCol :span="4">
            <ElSelect
              v-model="module"
              clearable
              placeholder="Select Module"
              @change="getspotList(20, 1)"
            >
              <ElOption
                v-for="m in moduleList"
                :key="m.key"
                :label="m.value"
                :value="m.key"
              />
            </ElSelect>
          </ElCol>

          <!-- Event Dropdown -->
          <ElCol :span="4">
            <ElSelect
              v-model="event"
              clearable
              placeholder="Select Event Type"
              @change="getspotList(20, 1)"
            >
              <ElOption
                v-for="e in eventList"
                :key="e"
                :label="e"
                :value="e"
              />
            </ElSelect>
          </ElCol>

          <!-- Today Date Picker -->
          <ElCol :span="4">
            <ElDatePicker
              v-model="todayRaw"
              type="date"
              placeholder="Select Date"
              clearable
              style="inline-size: 100%"
              @change="handleTodayChange"
            />
          </ElCol>

          <!-- Date Range Picker -->
          <ElCol :span="4">
            <ElDatePicker
              v-model="dateRange"
              type="daterange"
              range-separator="To"
              start-placeholder="From"
              end-placeholder="To"
              clearable
              style="inline-size: 100%"
              @change="handleDateRangeChange"
            />
          </ElCol>
        </ElRow>

        <ActivityTable
          v-loading="loading"
          :filter-table-data="spotList"
          :columns="columns"
          @table-data-emit="getspotList(20,1)"
        />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from "@/@core/stores/config"
import PaginationSection from "@/components/tourism/pagination.vue"
import { useUserStore } from "@/stores/tourism/userStore"
import { onMounted, ref } from "vue"
import ActivityTable from "./activityTable.vue"
const configStore = useConfigStore()
const userStore = useUserStore()

const spotList = ref([])
const columns = ref([
  { label: "Module", prop: "log_name", sortable: false },
  { label: "Type", prop: "event", sortable: false },
  {label:"Username",prop:"user",sortable:false},
  { label: "User Role", prop: "roles", sortable: false },
  { label: "Description", prop: "description", sortable: false },
])

const totalData = ref(0)
const loading = ref(false)
const selecteUserId = ref(null)
const event = ref("")
const todayRaw = ref<Date | null>(null)
const today = ref("")
const from = ref("")
const to = ref("")
const dateRange = ref<[Date, Date] | null>(null)
const module = ref("")
const userList = ref([])
const eventList = ref([])
const moduleList = ref([])

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10)
}

const handleTodayChange = (val: Date | null) => {
  today.value = val ? formatDate(val) : ""
  getspotList(20, 1)
}

const handleDateRangeChange = (val: [Date, Date] | null) => {
  if (val) {
    from.value = formatDate(val[0])
    to.value = formatDate(val[1])
  } else {
    from.value = ""
    to.value = ""
  }
  getspotList(20, 1)
}

const getspotList = async (pageSize: number, pageNo: number) => {
  loading.value = true
  const parameter = {
    page: pageNo,
    per_page: pageSize,
    activity: "new",
    user_id: selecteUserId.value,
    event: event.value,
    today: today.value,
    from: from.value,
    to: to.value,
    module: module.value,
  }

  try {
    const { data } = await userStore.getUserActivity(parameter)
    spotList.value = data.data.data
    userList.value = data.users
    eventList.value = data.events
    moduleList.value = data.modules
    totalData.value = data.data.total
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  
  getspotList(20, 1)
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
