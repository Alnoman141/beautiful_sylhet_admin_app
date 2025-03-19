<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Landing Page </b>
        </VCol>
        <VCol
          cols="6"
          class="text-right"
        >
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'createLandingPage' }"
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Landign Page "
              placement="top-start"
            >
              {{ landingPage ? "Update" : "Create" }} Landing Page
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <!-- check the objec is empty or not -->
    <div v-loading="loading">
      <div
        v-if="Object.keys(landingPage).length != 0"
    
        element-loading-text="Loading..."
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(122, 122, 122, 0.8)"
      >
        <!--
          <Header
          :rule-form="
          landingPage.header"
          mode="view"
          /> 
        -->
        <Caurosel
          :rule-form="landingPage.caurosel"
          mode="view"
        />
        <About
          :rule-form="landingPage.about"
          mode="view"
        />
        <Feature
          mode="view"
          :rule-form="landingPage.feature"
        />
        <Speciality
          :rule-form="landingPage.speciality"
          mode="view"
        />
        <WhyChooseVromonica
          :rule-form="landingPage.whyChooseVromonica"
          mode="view"
        />
        <Workflow
          :rule-form="landingPage.workflow"
          mode="view"
        />
        <VideoTutorial
          :rule-form="landingPage.videoInformation"
          mode="view"
        />
        <Testimonial
          mode="view"
          :rule-form="landingPage.testimonial"
        />
        <Footer
          mode="view"
          :rule-form="landingPage.footer"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import About from "./components/about.vue"
import Caurosel from "./components/caurosel.vue"

import Feature from "./components/feature.vue"

import Footer from "./components/footer.vue"

import Speciality from "./components/speciality.vue"

import Testimonial from "./components/testimonial.vue"
import VideoTutorial from "./components/videoInformation.vue"
import WhyChooseVromonica from "./components/whyChooseVromonica.vue"

import Workflow from "./components/workflow.vue"

const getImageUrl = name => {
  return new URL(
    `../../assets/images/vromonica-landing-page/${name}`,
    import.meta.url,
  ).href
}

const landingPage = ref({})

// createLandingPage
import { useLandingPageStore } from "@/stores/tourism/landingPageStore"

const landingPageStore = useLandingPageStore()
const loading = ref(false)

const detLandidingPageData = async () => {
  try {
    loading.value = true

    const { data } = await landingPageStore.getLandingPage()

    console.log("dataa", data)
    data.status_code == 200
      ? ((loading.value = false), (landingPage.value = data.data.data))
      : ""
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  detLandidingPageData()
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
