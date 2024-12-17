

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
        md="8"
      >
        <ElCard class="mb-4">
          <h5 class="text-h5 mb-2">
            Welcome back to,<span class="text-h4"> Cox's bazar admin panel </span>
          </h5>

          <div
            class="text-wrap text-body-1"
            style="max-inline-size: 370px"
          >
            At glance the most important information about app
          </div>
        </ElCard>
        <div class="d-flex align-center justify-space-between gap-x-4 my-2">
          <VCard
            v-for="(data, index) in transportData"
            :key="index"
            class="logistics-card-statistics cursor-pointer w-100"
            :style="data.isHover ? { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}))` } : { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}), var(--v-disabled-opacity))` }"
            @mouseenter="data.isHover = true"
            @mouseleave="data.isHover = false"
          >
            <VCardText>
              <div class="d-flex align-center gap-x-4 mb-2">
                <VAvatar
                  variant="tonal"
                  :color="data.color"
                  rounded
                >
                  <VIcon
                    :icon="data.icon"
                    size="28"
                  />
                </VAvatar>
                <h5 class="text-h5 font-weight-medium">
                  {{ data.value }}
                </h5>
              </div>
              <div class="text-body-1">
                {{ data.title }}
              </div>
            </VCardText>
          </VCard>
        </div>
        
        <VRow>
          <VCol
            v-for="(data, index) in cardData"
            :key="index"
            cols="12"
            md="6"
            sm="6"
          >
            <div>
              <VCard
                class="logistics-card-statistics cursor-pointer"
                :style="data.isHover ? { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}))` } : { 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}), var(--v-disabled-opacity))` }"
                @mouseenter="data.isHover = true"
                @mouseleave="data.isHover = false"
              >
                <VCardText>
                  <div class="d-flex align-center gap-x-4 mb-2">
                    <VAvatar
                      variant="tonal"
                      :color="data.color"
                      rounded
                    >
                      <VIcon
                        :icon="data.icon"
                        size="28"
                      />
                    </VAvatar>
                    <h5 class="text-h5 font-weight-medium">
                      {{ data.value }}
                    </h5>
                  </div>
                  <div class="text-body-1">
                    {{ data.title }}
                  </div>
                </VCardText>
              </VCard>
            </div>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <ElCard>
              <VWindow>
                <h3 class="my-2 mx-4">
                  Events
                </h3>
                <hr class="my-2">
                <VWindowItem class="event">
                  <div>
                    <VTimeline
                      v-for="(item, index) in eventList"
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
                        <div class="text-caption text-uppercase ">
                          <h5
                            class="text-h5"
                            v-html="item.name"
                          />
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
          <VCol>
            <ElCard>
              <VWindow>
                <h3 class="my-2 mx-4">
                  Campaign
                </h3>
                <hr class="my-2">
                <VWindowItem class="event">
                  <div>
                    <VTimeline
                      v-for="(item, index) in campaignList"
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
                        <div class="text-caption text-uppercase ">
                          <h5
                            class="text-h5"
                            v-html="item.name"
                          />
                          <p
                            class="app-timeline-title"
                            v-html="item.date"
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
        </VRow>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <RightPanel class=" right-panel" />
      </VCol>
    </VRow>
  </div>
</template>

<script lang="ts" setup>
import { useCampaignStore } from "@/stores/tourism/campaignStore"
import { useDashboardStore } from '@/stores/tourism/dashboardStore'
import { useEventsStore } from "@/stores/tourism/eventsStore"
import RightPanel from "./rightPanel.vue"
import TopCard from "./topCard.vue"

const loading = ref(true)
const eventsStore = useEventsStore()

// getCampaign
const eventList = ref([])

const getEventList = async () => {
  try {
    const { data } = await eventsStore.getEvents()

    eventList.value = data.data.data
  } catch (error) {
    console.log(error)
  }
}

const campaignList = ref([])

const getCampaignList = async () => {
  try {
    const { data } = await campaignStore.getCampaign()

    campaignList.value = data.data.data
  } catch (error) {
    console.log(error)
  }
}


// getEvents
const campaignStore = useCampaignStore()

const logisticData = ref([

  {
    icon: 'tabler-map',
    color: 'warning',
    title: 'Tourist Spots',
    value: 8,
    
    isHover: false,
  },
  {
    icon: 'tabler-building-skyscraper',
    color: 'primary',
    title: 'Hotels',
    value: 42,
   
    isHover: false,
  },
  {
    icon: 'tabler-lock',
    color: 'error',
    title: 'Locker',
    value: 27,
   
    isHover: false,
  },
  {
    icon: 'tabler-user',
    color: 'info',
    title: 'Vistors',
    value: 27,
   
    isHover: false,
  },
  
])

const cardData = ref([

  {
    icon: 'tabler-users',
    color: 'warning',
    title: 'Visitors today',
    value: 8,
    
    isHover: false,
  },
  {
    icon: 'tabler-users',
    color: 'primary',
    title: 'Visitors all time',
    value: 42,
   
    isHover: false,
  },
 
  
])

const transportData = ref([

  {
    icon: 'tabler-plane',
    color: 'warning',
    title: 'Airlines',
    value: 8,
    
    isHover: false,
  },
  {
    icon: 'tabler-train',
    color: 'primary',
    title: 'Train',
    value: 42,
   
    isHover: false,
  },
  {
    icon: 'tabler-ship',
    color: 'error',
    title: 'Ship',
    value: 27,
   
    isHover: false,
  },
  {
    icon: 'tabler-bike',
    color: 'info',
    title: 'Bike',
    value: 27,
   
    isHover: false,
  },
  {
    icon: 'tabler-truck',
    color: 'success',
    title: 'Jeep',
    value: 27,
   
    isHover: false,
  },
  
])

const dashboardStore = useDashboardStore()
const dashbordData = ref({})

const getDashboadData = async () => {
  loading.value = true

  const { data } = await dashboardStore.getDashboard()

  dashbordData.value = data.data
  logisticData.value[0].value = dashbordData.value.spot
  logisticData.value[1].value = dashbordData.value.hotel
  logisticData.value[2].value = dashbordData.value.locker
  logisticData.value[3].value = dashbordData.value.locker
  cardData.value[0].value = dashbordData.value.visitor_today
  cardData.value[1].value = dashbordData.value.visitor_all


  transportData.value[0].title = 'Filght'
  transportData.value[0].value = dashbordData.value.transports[0].count
  transportData.value[1].title = 'Train'
  transportData.value[1].value = dashbordData.value.transports[1].count
  transportData.value[2].title = "Ship"
  transportData.value[2].value = dashbordData.value.transports[2].count
  transportData.value[4].title = "Bike"
  transportData.value[4].value = dashbordData.value.transports[3].count
  transportData.value[4].title = "Jeep"
  transportData.value[4].value = dashbordData.value.transports[4].count

  loading.value = false
}



onMounted(() => {
  getDashboadData()
  getEventList()
  getCampaignList()
})
</script>

<style scoped>
.event {
  block-size: 30dvh;
  overflow-y: auto;
}
</style>
