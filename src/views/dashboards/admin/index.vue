<template>
  <div v-loading="loading">
    <ElCard class="my-2">
      <p class="my-0 py-0">
        Welcome to Admin Dashboard
      </p>
    </ElCard>

    <TopCard :logistic-data="logisticData" />

    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <VRow>
          <VCol cols="12">
            <ElCard class="mb-4">
              <h5 class="text-h5 mb-2">
                Welcome back to,
                <span class="text-h4">Cox's Bazar Admin Panel</span>
              </h5>
              <div
                class="text-wrap text-body-1"
                style="max-inline-size: 370px"
              >
                Get the real-time analytics of your tourism application.
              </div>
            </ElCard>
          </VCol>

          <!-- Visitor and Registration Stats -->
          <VCol cols="12">
            <VRow>
              <VCol
                v-for="(stat, index) in mainStats"
                :key="index"
                cols="12"
                md="6"
              >
                <VCard class="mb-4">
                  <VCardText class="d-flex justify-space-between align-center">
                    <div>
                      <h4 class="text-h5 font-weight-medium mb-2">
                        {{ stat.label }}
                      </h4>
                      <h2 class="text-h4 font-weight-bold">
                        {{ stat.value }}
                      </h2>
                    </div>
                    <VAvatar
                      variant="tonal"
                      :color="stat.color"
                      size="48"
                    >
                      <VIcon
                        :icon="stat.icon"
                        size="28"
                      />
                    </VAvatar>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCol>

      <!-- Removed Right Panel: Empty Space -->
      <VCol
        cols="12"
        md="6"
      >
        <ElCard>
          <Graph
            :today-visitor="dashboardData.visitor_today"
            :all-visitor="dashboardData.visitor_all"
            :today-registered="dashboardData.today_registered"
            :all-registered="dashboardData.all_registered"
          />
        </ElCard>
      </VCol>
      <!-- Hotels, Lockers, Spots -->
      <VCol cols="12">
        <ElCard class="mb-4">
          <h5 class="text-h5 mb-4">
            Infrastructure Overview
          </h5>
          <VRow>
            <VCol
              v-for="(item, idx) in infrastructureData"
              :key="idx"
              cols="12"
              md="4"
            >
              <VCard class="text-center pa-4">
                <h2 class="text-h4 font-weight-bold">
                  {{ item.value }}
                </h2>
                <p class="text-body-1">
                  {{ item.label }}
                </p>
              </VCard>
            </VCol>
          </VRow>
        </ElCard>
      </VCol>
    
    </VRow>
  </div>
</template>

<script lang="ts" setup>
import { useDashboardStore } from "@/stores/tourism/dashboardStore"

import { computed, onMounted, ref } from "vue"
import Graph from "./graph.vue"
import TopCard from "./topCard.vue"

const loading = ref(true)
const dashboardData = ref<any>({})

const dashboardStore = useDashboardStore()

// const logisticData = ref([
//   {
//     icon: "tabler-bus",
//     color: "primary",
//     value: "120",
//     title: "Total Vehicles",
//   },
//   {
//     icon: "tabler-map-pin",
//     color: "success",
//     value: "32",
//     title: "Active Routes",
//   },
//   {
//     icon: "tabler-users",
//     color: "warning",
//     value: "540",
//     title: "Total Drivers",
//   },
// ])
const logisticData = ref<any[]>([]);


const mainStats = computed(() => [
  {
    label: "Today's Visitors",
    value: dashboardData.value.visitor_today ?? 0,
    icon: "tabler-eye",
    color: "info",
  },
  {
    label: "Total Visitors",
    value: dashboardData.value.visitor_all ?? 0,
    icon: "tabler-users",
    color: "primary",
  },
  {
    label: "Today's Registrations",
    value: dashboardData.value.today_registered ?? 0,
    icon: "tabler-user-plus",
    color: "success",
  },
  {
    label: "Total Registrations",
    value: dashboardData.value.all_registered ?? 0,
    icon: "tabler-user-check",
    color: "warning",
  },
])

const infrastructureData = computed(() => [
  {
    label: "Hotels",
    value: dashboardData.value.hotel ?? 0,
  },
  {
    label: "Lockers",
    value: dashboardData.value.locker ?? 0,
  },
  {
    label: "Tourist Spots",
    value: dashboardData.value.spot ?? 0,
  },
])

const getDashboardData = async () => {
  loading.value = true
  try {
    const { data } = await dashboardStore.getDashboard({ language_id: 2 })

    dashboardData.value = data.data
     // Now transform dashboardData.transports into logisticData
  logisticData.value = (dashboardData.value.transports || []).filter((item: any) => {
      const name = item.name?.toLowerCase() || '';
      return ['flight', 'train', 'ship'].includes(name);
    })
    .map((item: any) => ({
      icon: getTransportIcon(item.name),
      color: getTransportColor(item.name),
      value: item.count,
      title: item.name,
    }));
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}
const getTransportIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'flight':
      return 'tabler-plane';
    case 'train':
      return 'tabler-train';
    case 'ship':
      return 'tabler-ship';
    case 'bus':
      return 'tabler-bus';
    default:
      return 'tabler-truck'; // default icon
  }
};

const getTransportColor = (name: string) => {
  switch (name.toLowerCase()) {
    case 'flight':
      return 'info';
    case 'train':
      return 'success';
    case 'ship':
      return 'primary';
    case 'bus':
      return 'warning';
    default:
      return 'secondary'; // default color
  }
};

onMounted(() => {
  getDashboardData()
})
</script>

<style scoped>
/* your style part is already fine */
.event {
  block-size: 30dvh;
  overflow-y: auto;
}

.small-cards-container {
  display: flex;
  overflow: hidden;
  align-items: center;
  gap: 8px;
  margin-block: 16px;
}

.card-scroll {
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  gap: 16px;
  overflow-x: auto;
  padding-block: 8px;
  scroll-behavior: smooth;
}

.small-card {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid rgba(var(--v-theme-surface), var(--v-disabled-opacity));
  border-radius: 12px;
  background: var(--v-theme-surface);
  background-color: white;
  block-size: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 10%);
  cursor: pointer;
  max-inline-size: 250px;
  min-inline-size: 224px;
  transition: 0.3s ease;
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
}

.card-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-graph {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 50px;
  inline-size: 50px;
}

.right-bar {
  border-radius: 4px;
  background: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 10%);
  margin-block-end: 1.5% !important;
}
</style>
