<template>
  <div v-loading.fullscreen.lock="loading">
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
            :to="{ name: 'landingPage' }"
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Landign Page "
              placement="top-start"
            >
              Landing Page 
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <Header
      mode="view"
      :rule-form="landingPage.header"
    />
    <Caurosel
      mode="view"
      :rule-form="landingPage.caurosel"
    />
    <About
      mode="view"
      :rule-form="landingPage.about"
    />
    <Feature
      mode="view"
      :rule-form="landingPage.feature"
    />
    <Speciality
      mode="view"
      :rule-form="landingPage.speciality"
    />
    <WhyChooseVromonica
      mode="view"
      :rule-form="landingPage.whyChooseVromonica"
    />
    <Workflow
      mode="view"
      :rule-form="landingPage.workflow"
    />
    <VideoTutorial
      mode="view"
      :rule-form="landingPage.videoInformation"
    />
    <Testimonial
      mode="view"
      :rule-form="landingPage.testimonial"
    />
    <Footer
      mode="view"
      :rule-form="landingPage.footer"
    />

    <div class="py-4">
      <ElTooltip
        class="item"
        effect="dark"
        content="Back"
        placement="top-start"
      >
        <ElButton
          type="info"
          @click="router.go(-1)"
        >
          Back
        </ElButton>
      </ElTooltip>
     

      <ElTooltip
        class="item"
        effect="dark"
        content="Submit"
        placement="top-start"
      >
        <ElButton
          class="submit"
          type="primary"
          @click="submitForm"
        >
          <!-- {{ mode }} -->
          Submit
        </ElButton>
      </ElTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from "@/plugins/1.router"
import { notify } from "@/utils/notification"
import { computed, onMounted, ref } from "vue"
import About from "./components/about.vue"
import Caurosel from "./components/caurosel.vue"
import Feature from "./components/feature.vue"
import Footer from "./components/footer.vue"
import Header from "./components/header.vue"
import Speciality from "./components/speciality.vue"
import Testimonial from "./components/testimonial.vue"
import VideoTutorial from "./components/videoInformation.vue"
import WhyChooseVromonica from "./components/whyChooseVromonica.vue"
import Workflow from "./components/workflow.vue"


// createLandingPage
import { useLandingPageStore } from "@/stores/tourism/landingPageStore"

const landingPageStore = useLandingPageStore()

const landingPage = ref({
  header: {
    logo: "",
    navLinks: [
      
    ],


  },
  caurosel: {
    title: "",
    subTitle:
      "",
    images: [
      // "banner-1.png", "banner-2.png", "banner-3.png"
    ],
  },
  about: {
    title: "",
    description:
      "",
    image: "",
  },
  feature: {
    title: "",
    features: [
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
    ],
  },
  speciality: [
    {
      title: "",
      description:
        "",
      image: "",
    },
    {
      title: "",
      description:
        "",
      image: "",
    },
  ],
  whyChooseVromonica: {
    title: "",
    description:
      "",
    image: "",
  },
  workflow: {
    title: "",
    workDetails: [
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
      {
        name: "",
        description: "",
        image: "",
      },
    ],
  },
  videoInformation: {
    title: "",
    description: "",
    videoUrl:
        "",
  },
  testimonial: [
    
    
    {
      name: "",
      image: "",
      rating: 5,
      description: "",
    },
    {
      name: "",
      image: "",
      rating: 4,
      description: "",
    },
    {
      name: "",
      image: "",
      rating: 3,
      description: "",
    },
    
  ],
  footer: {
    logo: "",
    description: "",
    socialMedia: [
      {
        name: "",
        url: "",
        image: "",
      },
      {
        name: "",
        url: "",
        image: "",
      },
      {
        name: "",
        url: "",
        image: "",
      },
      {
        name: "",
        url: "",
        image: "",
      },
    ],
    
    plannerTitle: "",
    planner: [
      {
        name: "",
        designation: "",
      },
      {
        name: "",
        designation: "",
      },
      {
        name: "",
        designation: "",
      },
    ],
    techSupportImages: [
     
    ],
    
  },
})

onMounted(() => {
  console.log("consolessss", JSON.parse(localStorage.getItem("header")))

  // header
  landingPage.value.header = JSON.parse(localStorage.getItem("header"))

  // caurosel
  landingPage.value.caurosel = JSON.parse(localStorage.getItem("caurosel"))

  // about

  landingPage.value.about = JSON.parse(localStorage.getItem("about"))

  // feature
  landingPage.value.feature = JSON.parse(localStorage.getItem("feature"))

  // speciality
  landingPage.value.speciality = JSON.parse(localStorage.getItem("speciality"))

  // whyChooseVromonica
  landingPage.value.whyChooseVromonica = JSON.parse(localStorage.getItem("whyChooseVromonica"))

  // workflow
  landingPage.value.workflow = JSON.parse(localStorage.getItem("workflow"))

  // videoInformation
  landingPage.value.videoInformation = JSON.parse(localStorage.getItem("videoInformation"))

  // testimonial
  landingPage.value.testimonial = JSON.parse(localStorage.getItem("testimonial"))

  // footer
  landingPage.value.footer = JSON.parse(localStorage.getItem("footer"))

 
  
 
})


// const step = ref(1)
const step = ref(1)

// Dynamically determine the current component
const currentComponent = computed(() => components[step.value])
const componentKey = computed(() => Object.keys(landingPage.value)[step.value - 1])

const stepIncrement = item => {
  
  step.value = item
}

const stepDecrement = () => {
  step.value = step.value - 1
}

const loading = ref(false)

const submitForm = async() => {
  

  try {
    loading.value = true

    const { data } = await landingPageStore.createLandingPage({ data: landingPage.value })

    console.log("data response", data)
    data.status_code == 200
      ? (notify("Congratulations!", data.message, "success", "top-right"),
      (loading.value = false))
      : ""
    data.status_code == 200 ? router.push({ name: "landingPage" }) : ""
  } catch (error) {
    loading.value = false

    // notify("Error", "Something went wrong", "error", "top-right");
    notify(
      error?.response?.data?.message,
      error?.response?.data?.errors
        ? error?.response?.data?.errors
        : error?.response?.data?.error
          ? error?.response?.data?.error
          : "Something went wrong",
      "error",
      "top-right",
    )
  }
}
</script>


<style scoped>
/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 1s ease, opacity 1s;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
