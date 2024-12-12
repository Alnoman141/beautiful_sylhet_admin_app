<script setup>
const currentTab = ref("New")
import { useCampaignStore } from "@/stores/tourism/campaignStore"
import { useEventsStore } from "@/stores/tourism/eventsStore"
import { useNoticeStore } from "@/stores/tourism/noticeStore"

const eventsStore = useEventsStore()

// getEvents
const campaignStore = useCampaignStore()

const noticeStore = useNoticeStore()

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

const noticeList = ref([])

const getNoticeList = async () => {
  let params = { type: "all" }
  try {
    const { data } = await noticeStore.getNotice(params)

    noticeList.value = data.data.data
  } catch (error) {
    console.log(error)
  }
}

const tabsData = ["Events", "Campaigns"]

onMounted(() => {
  getEventList()
  getCampaignList()
  getNoticeList()
})
</script>

<template>
  <VCard class="country-order-card right-bar ">
    <VCardText class="py-4">
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
                <div class="text-caption text-uppercase py-2">
                  <h3
                    class="text-primary"
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
                <div class="text-caption text-uppercase py-2">
                  <h3
                    class="text-info"
                    v-html="item.name"
                  />
                </div>
                <div
                  class="app-timeline-title"
                  v-html="item.date"
                />
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
     
      <VWindow>
        <h3 class="my-2 mx-4">
          Notice
        </h3>
        <hr class="my-2">
        <VWindowItem class="notice">
          <div>
            <VTimeline
              v-for="(item, index) in noticeList"
              align="start"
              truncate-line="both"
              side="end"
              density="compact"
              line-thickness="1"
            >
              <VTimelineItem
                icon="tabler-alert-circle"
                dot-color="rgba(var(--v-theme-surface))"
                icon-color="warning"
                fill-dot
                size="22"
                :elevation="0"
              >
                <div class="text-caption text-uppercase py-2">
                  <h3
                    class="text-warning"
                    v-html="item.name"
                  />
                  {{ new Date(item.date).toISOString().slice(0, 10) }}
                </div>
              </VTimelineItem>
              <VDivider
                v-if="index + 1 < noticeList.length"
                class="my-2"
                style="border-style: dashed"
              />
            </VTimeline>
          </div>
          <div class="mb-4" />
        </VWindowItem>
        <VWindowItem>
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
                :icon-color="
                  new Date(item.date) < new Date() ? 'error' : 'success'
                "
                fill-dot
                size="22"
                :elevation="0"
              >
                <div class="text-caption text-uppercase">
                  <h3
                    class="text-success"
                    v-html="item.name"
                  />
                </div>
                <div
                  class="app-timeline-title"
                  v-html="item.date"
                />
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
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.country-order-card {
  .v-timeline .v-timeline-divider__dot .v-timeline-divider__inner-dot {
    box-shadow: none !important;
  }
}
</style>

<style scoped>
.right-bar {
  block-size: 80dvh;
}

.notice {
  block-size: 20dvh;
  overflow-y: auto;
}

.event {
  block-size: 15dvh;
  overflow-y: auto;
}
</style>
