<script setup>
const currentTab = ref("New")

import { useNoticeStore } from "@/stores/tourism/noticeStore"



const noticeStore = useNoticeStore()



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
 
  getNoticeList()
})
</script>

<template>
  <VCard class="country-order-card right-bar ">
    <VCardText class="py-4">
      <VWindow>
        <h3 class="my-2 mx-4">
          Notices
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
                  <h5
                    class="text-h5"
                    v-html="item.name_en"
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
        <!--
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
        -->
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
  block-size: 100dvh;
}

.notice {
  block-size: 70dvh;
  overflow-y: auto;
}
</style>
