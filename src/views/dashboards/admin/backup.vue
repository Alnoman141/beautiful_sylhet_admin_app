<template>
  <div v-loading="loading">
    <ElCard class="my-2">
      <p class="my-0 py-0">Welcome to Admin Dashboard</p>
    </ElCard>

    <TopCard :logistic-data="logisticData" />
    <VRow>
      <VCol cols="12" md="8">
        <VRow>
          <VCol cols="12">
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
                  At a glance the most important information about app
                </div>
              </ElCard>

              <!-- Transport Cards -->
              <VRow>
                <VCol
                  v-for="(data, index) in transportData"
                  :key="index"
                  cols="12"
                  md="4"
                >
                  <VCard
                    class="logistics-card-statistics cursor-pointer w-100"
                    :style="{
                      'border-block-end': data.isHover
                        ? `2px solid rgba(var(--v-theme-${data.color}))`
                        : `2px solid rgba(var(--v-theme-${data.color}), var(--v-disabled-opacity))`,
                    }"
                    @mouseenter="data.isHover = true"
                    @mouseleave="data.isHover = false"
                  >
                    <VCardText>
                      <div class="d-flex align-center gap-x-4 mb-2">
                        <VAvatar variant="tonal" :color="data.color" rounded>
                          <VIcon :icon="data.icon" size="28" />
                        </VAvatar>
                        <h5 class="text-h5 font-weight-medium">
                          {{ data.value }}
                        </h5>
                      </div>
                      <div class="text-body-1">{{ data.title }}</div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>

              <!-- Event Section -->
            </VCol>
            <VCol cols="12">
              <VRow>
                <VCol cols="12" md="6">
                  <ElCard class="event-card">
                    <VWindow>
                      <h3 class="my-2 mx-4">Events</h3>
                      <hr class="my-2" />
                      <VWindowItem class="event">
                        <div>
                          <VTimeline
                            v-for="(item, index) in eventList"
                            :key="index"
                            align="start"
                            truncate-line="both"
                            side="end"
                            density="compact"
                            line-thickness="1"
                          >
                            <VTimelineItem
                              icon="tabler-circle-check"
                              dot-color="rgba(var(--v-theme-surface))"
                              icon-color="primary"
                              fill-dot
                              size="22"
                              :elevation="0"
                            >
                              <div class="text-caption text-uppercase">
                                <h5 class="text-h5" v-html="item.name" />
                                <p
                                  class="app-timeline-title m-0 p-0"
                                  v-html="item.date"
                                />
                                <p
                                  class="app-timeline-text"
                                  v-html="item.location"
                                />
                              </div>
                            </VTimelineItem>
                            <VDivider
                              v-if="index + 1 < eventList.length"
                              class="my-5"
                              style="border-style: dashed"
                            />
                          </VTimeline>
                        </div>
                      </VWindowItem>
                    </VWindow>
                  </ElCard>
                </VCol>

                <VCol cols="12" md="6">
                  <ElCard>
                    <VWindow>
                      <h3 class="my-2 mx-4">Campaign</h3>
                      <hr class="my-2" />
                      <VWindowItem class="event">
                        <div>
                          <VTimeline
                            v-for="(item, index) in campaignList"
                            :key="index"
                            align="start"
                            truncate-line="both"
                            side="end"
                            density="compact"
                            line-thickness="1"
                          >
                            <VTimelineItem
                              icon="tabler-circle-check"
                              dot-color="rgba(var(--v-theme-surface))"
                              icon-color="info"
                              fill-dot
                              size="22"
                              :elevation="0"
                            >
                              <div class="text-caption text-uppercase">
                                <h5 class="text-h5" v-html="item.name" />
                                <p
                                  class="app-timeline-title"
                                  v-html="item.date"
                                />
                              </div>
                            </VTimelineItem>
                            <VDivider
                              v-if="index + 1 < campaignList.length"
                              class="my-5"
                              style="border-style: dashed"
                            />
                          </VTimeline>
                        </div>
                      </VWindowItem>
                    </VWindow>
                  </ElCard>
                </VCol>
                <VCol cols="12">
                  <ElCard class="event-card">
                   
                    <div class="small-cards-container">
                      <VBtn
                        icon="tabler-chevron-left"
                        variant="text"
                        @click="scrollLeft"
                      />
                      <div ref="cardScroll" class="card-scroll">
                        <div
                          v-for="(data, index) in cardData"
                          :key="index"
                          class="small-card"
                        >
                          <div class="card-content">
                            <div class="card-label">
                              <h5 class="text-h6 font-weight-bold mb-1">
                                {{ data.value }}
                              </h5>
                              <p class="text-body-2">{{ data.title }}</p>
                            </div>
                            <div class="card-graph">
                              <GraphMini :value="data.value" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <VBtn
                        icon="tabler-chevron-right"
                        variant="text"
                        @click="scrollRight"
                      />
                    </div>
                    <Graph
                      :today-visitor="cardData[0].value"
                      :all-visitor="cardData[1].value"
                      :today-registered="cardData[2].value"
                      :all-registered="cardData[3].value"
                    />
                  </ElCard>
                </VCol>
              </VRow>
            </VCol>

            <!-- Main Graph -->
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="4" class="right-bar">
        <RightPanel />
      </VCol>
    </VRow>
  </div>
</template>

<script lang="ts" setup>
import { useCampaignStore } from "@/stores/tourism/campaignStore";
import { useDashboardStore } from "@/stores/tourism/dashboardStore";
import { useEventsStore } from "@/stores/tourism/eventsStore";
import { onMounted, ref } from "vue";
import Graph from "./graph.vue";
import GraphMini from "./GraphMini.vue";
import RightPanel from "./rightPanel.vue";
import TopCard from "./topCard.vue";
const loading = ref(true);
const eventList = ref([]);
const campaignList = ref([]);
const cardScroll = ref<HTMLElement>();

const eventsStore = useEventsStore();
const campaignStore = useCampaignStore();
const dashboardStore = useDashboardStore();
const dashboardData = ref({});

const logisticData = ref([
  {
    icon: "tabler-truck",
    color: "primary",
    value: "120",
    title: "Total Vehicles",
  },
  {
    icon: "tabler-map-pin",
    color: "success",
    value: "32",
    title: "Active Routes",
  },
  {
    icon: "tabler-users",
    color: "warning",
    value: "540",
    title: "Total Drivers",
  },
]);

const cardData = ref([
  { title: "Today Visitors", value: 120 },
  { title: "All Visitors", value: 1200 },
  { title: "Today Registered", value: 20 },
  { title: "All Registered", value: 300 },
]);

const transportData = ref([
  {
    title: "Total Buses",
    value: "100",
    icon: "tabler-bus",
    color: "primary",
    isHover: false,
  },
  {
    title: "Total Trains",
    value: "40",
    icon: "tabler-train",
    color: "success",
    isHover: false,
  },
  {
    title: "Total Flights",
    value: "25",
    icon: "tabler-plane",
    color: "info",
    isHover: false,
  },
]);

const scrollLeft = () => {
  cardScroll.value?.scrollBy({ left: -200, behavior: "smooth" });
};

const scrollRight = () => {
  cardScroll.value?.scrollBy({ left: 200, behavior: "smooth" });
};

const getEventList = async () => {
  //   let parameter = {

  //   language_id: 2,

  // }
  // loading.value = true
  // eventList.value = await eventsStore.getEvents(parameter)
  // loading.value = false
  let parameter = {
    language_id: 2,
  };
  try {
    const { data } = await eventsStore.getEvents(parameter);

    loading.value = false;
    eventList.value = data.data.data;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};

const getCampaignList = async () => {
  let parameter = {
    language_id: 2,
  };
  try {
    const { data } = await campaignStore.getCampaign(parameter);

    campaignList.value = data.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getDashboardData = async () => {
  loading.value = true;
  let parameter = {
    language_id: 2,
  };
  const { data } = await dashboardStore.getDashboard(parameter);
  dashboardData.value = data.data;
  console.log("dashboardData.value", dashboardData.value);
  loading.value = false;
};

onMounted(() => {
  getDashboardData();
  getEventList();
  getCampaignList();
});
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
