

<template>
  <div>
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
          <VCol
            v-for="(data, index) in transportData"
            :key="index"
            cols="12"
            md="3"
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
import { useDashboardStore } from '@/stores/tourism/dashboardStore'
import RightPanel from "./rightPanel.vue"
import TopCard from "./topCard.vue"

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
    title: 'Tourist Spots',
    value: 8,
    
    isHover: false,
  },
  {
    icon: 'tabler-train',
    color: 'primary',
    title: 'Hotels',
    value: 42,
   
    isHover: false,
  },
  {
    icon: 'tabler-ship',
    color: 'error',
    title: 'Locker',
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
    color: 'info',
    title: 'Jeep',
    value: 27,
   
    isHover: false,
  },
  
])

const dashboardStore = useDashboardStore()
const dashbordData = ref({})

const getDashboadData = async() => {
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
  transportData.value[4].title = "Chander Gari"
  transportData.value[4].value = dashbordData.value.transports[4].count


}



onMounted(() => {
  getDashboadData()
})
</script>

<style scoped>

</style>
