<template>
  <div class="">
    <VCard class="mb-4 px-2 py-4">
      <p class="mb-2 font-weight-bold pt-4 px-4 font-poppins text-primary" style="font-size: 3rem !important; ">
        Welcome back to,
        <span class="text-h3">Beautiful Sylhet Admin Panel</span>
      </p>
      <div class="text-wrap text-body-1  font-weight-medium pb-4 px-4 mt-0 pt-0">
        real-time analytics of Beautiful Sylhet mobile application.
      </div>
    </VCard>
    <VRow align="stretch">
      <!-- Left Column -->
      <VCol cols="12" md="5" class="d-flex flex-column h-100">
        <h3 class="text-h5 font-weight-bold mb-4">Visitor Statistics</h3>
        <VRow class="">
          <VCol v-for="(stat, index) in mainStats" :key="index" md="6">
            <VCard class="w-100  rounded-lg">
              <VCardText>
                <VAvatar :color="stat.color" size="48" rounded="sm">
                  <VIcon :icon="stat.icon" size="28" />
                </VAvatar>
                <h2
                  :class="`text-${stat.color}`"
                  class="text-h1 text-white font-weight-bold py-2"
                >
                  {{ stat.value }}
                </h2>
                <h4
                  :class="`text-${stat.color}`"
                  class="text-h5 text-white font-weight-bold"
                >
                  {{ stat.label }}
                </h4>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <h3 class="text-h5 font-weight-bold mb-4">
              Infrastructure Summary
            </h3>
            <VRow dense>
              <VCol
                v-for="(item, index) in infrastructureData"
                :key="index"
                cols="12"
              >
                <VCard class="rounded-lg elevation-2 pa-2">
                  <VCardText
                    class="d-flex align-center justify-space-between pa-2"
                    style="min-block-size: 72px"
                  >
                    <!-- Icon Box -->
                    <VAvatar :color="item.color" size="56" rounded="sm">
                      <VIcon :icon="item.icon" size="32" />
                    </VAvatar>

                    <!-- Text Info -->
                    <div class="text-end ms-2">
                      <h4 class="text-body-2 font-weight-medium mb-1">
                        {{ item.title }}
                      </h4>
                      <h2
                        :class="`text-${item.color}`"
                        class="text-h5 font-weight-bold"
                      >
                        {{ item.value }}
                      </h2>
                    </div>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="7">
        <h3 class="text-h5 font-weight-bold mb-4">Visitor Analytics</h3>

        <VCard class="flex-grow-1 pa-4">
          <div class="h-100 w-100">
            <!-- <Graph
              class="w-100 h-100"
              :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
              :values="[100, 250, 180, 300, 220, 400, 350, 500, 450, 600, 700, 800]"
            /> -->
            <Graph
              class="w-100 h-100"
              :labels="[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ]"
              :values="{
                thisYear: [
                  100, 250, 180, 300, 220, 400, 350, 500, 450, 600, 0, 800,
                ],
                lastYear: [
                  80, 200, 150, 100, 210, 390, 0, 460, 410, 550, 620, 750,
                ],
              }"
            />
          </div>
        </VCard>
        <h3 class="text-h5 font-weight-bold my-4">Transport Summary</h3>

        <VRow>
          <VCol
            v-for="(item, index) in logisticData"
            :key="index"
            cols="12"
            md="4"
            class="h-100"
          >
            <ElCard
              class="h-100 rounded-lg text-center d-flex flex-column justify-center align-center"
              style="block-size: 250px !important"
            >
              <VAvatar :color="item.color" size="64" class="mb-2">
                <VIcon :icon="item.icon" size="36" />
              </VAvatar>
              <h2
                :class="`text-${item.color}`"
                class="text-h1 font-weight-bold mb-1"
              >
                {{ item.value }}
              </h2>
              <p
                :class="`text-${item.color}`"
                class="text-caption font-weight-bold text-medium-emphasis mb-0"
              >
                {{ item.title }}
              </p>
            </ElCard>
          </VCol>
        </VRow>
      </VCol>
      <!-- Right Column -->
    </VRow>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from "@/stores/tourism/dashboardStore";
import { computed, onMounted, ref } from "vue";
import Graph from "./graph.vue";

const loading = ref(true);
const dashboardData = ref<any>({});
const dashboardStore = useDashboardStore();
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
]);

const getTransportIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "flight":
      return "tabler-plane";
    case "train":
      return "tabler-train";
    case "ship":
      return "tabler-ship";
    case "bus":
      return "tabler-bus";
    default:
      return "tabler-truck";
  }
};

const getTransportColor = (name: string) => {
  switch (name.toLowerCase()) {
    case "flight":
      return "info";
    case "train":
      return "success";
    case "ship":
      return "primary";
    case "bus":
      return "warning";
    default:
      return "secondary";
  }
};

const infrastructureData = computed(() => [
  {
    title: "Hotels",
    value: dashboardData.value.hotel ?? 0,
    color: "primary",
    icon: "tabler-building-skyscraper",
    isHover: false,
  },
  {
    title: "Lockers",
    value: dashboardData.value.locker ?? 0,
    color: "success",
    icon: "tabler-lock",
    isHover: false,
  },
  {
    title: "Tourist Spots",
    value: dashboardData.value.spot ?? 0,
    color: "warning",
    icon: "tabler-map-pin",
    isHover: false,
  },
]);

const getDashboardData = async () => {
  loading.value = true;
  try {
    const { data } = await dashboardStore.getDashboard({ language_id: 2 });

    dashboardData.value = data.data;

    logisticData.value = (dashboardData.value.transports || [])
      .filter((item: any) => {
        const name = item.name?.toLowerCase() || "";
        return ["flight", "train", "ship"].includes(name);
      })
      .map((item: any) => ({
        icon: getTransportIcon(item.name),
        color: getTransportColor(item.name),
        value: item.count,
        title: item.name,
      }));
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

onMounted(() => {
  getDashboardData();
});
</script>

<style scoped>
/* Removed unused .visitor and .graph-section styles */
</style>
