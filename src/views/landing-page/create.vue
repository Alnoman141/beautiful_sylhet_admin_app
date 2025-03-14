<template>
  <!--
    <div>
    <Header
    v-if="step == 1"
    :rule-form="landingPage.header"
    @step-increment="stepIncrement"
    />
    <Caurosel
    v-if="step == 2"
    :rule-form="landingPage.caurosel"
    />
    <About
    v-if="step == 3"
    :rule-form="landingPage.about"
    />
    <Feature
    v-if="step == 4"
    :rule-form="landingPage.feature"
    />
    <Speciality
    v-if="step == 5"
    :rule-form="landingPage.speciality"
    />
    <WhyChooseVromonica
    v-if="step == 6"
    :rule-form="landingPage.whyChooseVromonica"
    />
    <Workflow
    v-if="step == 7"
    :rule-form="landingPage.workflow"
    />
    <VideoTutorial
    v-if="step == 8"
    :rule-form="landingPage.videoInformation"
    />
    <Testimonial
    v-if="step == 9"
    :rule-form="landingPage.testimonial"
    />
    <Footer
    v-if="step == 10"
    :rule-form="landingPage.footer"
    />
    </div> 
  -->

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
    <Transition
      v-loading="loading"
      name="slide"
      mode="out-in"
    >
      <component
        :is="currentComponent"
        :key="step"
        :rule-form="landingPage[componentKey]"
        :mode="mode"
        @step-increment="stepIncrement"
        @step-decrement="stepDecrement"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import About from "./about.vue"
import Caurosel from "./caurosel.vue"
import Feature from "./feature.vue"
import Footer from "./footer.vue"
import Header from "./header.vue"
import Speciality from "./speciality.vue"
import Testimonial from "./testimonial.vue"
import VideoTutorial from "./videoInformation.vue"
import WhyChooseVromonica from "./whyChooseVromonica.vue"
import Workflow from "./workflow.vue"

import { useLandingPageStore } from "@/stores/tourism/landingPageStore"

const landingPageStore = useLandingPageStore()
const mode = ref("create")

const components = {
  1: Header,
  2: Caurosel,
  3: About,
  4: Feature,
  5: Speciality,
  6: WhyChooseVromonica,
  7: Workflow,
  8: VideoTutorial,
  9: Testimonial,
  10: Footer,
}

const landingPage = ref({
  header: {
    logo: "",
    logoBase64: "",
    navLinks: [
      {
        name: "Home",
        url: "/",
      },
      {
        name: "About",
        url: "/about",
      },
      {
        name: "Features",
        url: "/features",
      },
      {
        name: "Testimonial",
        url: "/testimonial",
      },
      {
        name: "Contact",
        url: "/contact",
      },
    ],
  },
  caurosel: {
    title: "Explore Cox’s Bazar Like Never Before!",
    subTitle:
      "Your Ultimate Travel Companion for the World's Longest Sea Beach – Plan, Explore, and Stay Safe with Vromonika!",
    images: [
      // "banner-1.png", "banner-2.png", "banner-3.png"
    ],
    imageBase64: [],
  },
  about: {
    title: "Vromonika – Your Trusted e-Travel Guide to Cox's Bazar",
    description:
      "Cox’s Bazar, home to the world’s longest sea beach, is a paradise for travelers. To make your journey seamless, safe, and enjoyable, Vromonika has been developed by the Cox’s Bazar District Administration as the ultimate travel companion. Whether you're a first-time visitor or a frequent explorer, Vromonika ensures you have all the necessary information at your fingertips. Vromonika is designed to provide tourists with authentic, up-to-date, and essential travel information in one place. From finding the best attractions to ensuring your safety, this app is your one-stop solution for a worry-free trip.",
    image: "",
    imageBase64: "",
  },
  feature: {
    title: "Features",
    features: [
      {
        name: "Discover Tourist Attractions",
        description:
          "Find must-visit places with travel guides, routes & tips.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Find Hotels & Accommodations",
        description: "Explore hotels, motels & resorts with booking details.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Transport & Ticketing",
        description:
          "Get transport info & book your tourist bus tickets online.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Stay Alert with Danger Zone Warnings",
        description: "Receive real-time safety alerts for risky areas.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Emergency Help & Tourist Safety",
        description:
          "Access tourist police, lifeguards & beach safety services instantly.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Local Events & Administration Updates",
        description:
          "Stay informed about upcoming events & government initiatives.",
        image: "",
        imageBase64: "",
      },
      {
        name: "ATM & Locker Services",
        description:
          "Find nearby banks, ATMs & secure locker services with ease.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Food & Local Cuisine Guide",
        description: "Discover the best local delicacies & dining spots.",
        image: "",
        imageBase64: "",
      },
    ],
  },
  speciality: [
    {
      title: "Seamless Tourist Bus Booking Travel with Ease!",
      description:
        "Exploring Cox’s Bazar is now more convenient than ever with Vromonika’s Tourist Bus Booking System. Whether you’re traveling from Dhaka, Chattogram, or any nearby district, our app allows you to find and book bus tickets hassle-free.",
      image: "",
      imageBase64: "",
    },
    {
      title: "AI-Powered Tour Planning Travel Smart, Spend Wisely!",
      description:
        "Planning your dream trip to Cox’s Bazar has never been easier! With Vromonika’s AI-Based Tour Planner, you can create a personalized itinerary that matches your budget, preferences, and travel style—all in just a few clicks.",
      image: "",
      imageBase64: "",
    },
  ],
  whyChooseVromonica: {
    title: "Why Tourists Love Vromonika Your Smart Travel Companion!",
    description:
      "Visiting Cox’s Bazar? Vromonika makes your journey effortless, safe, and memorable. From planning to exploring, this all-in-one travel app ensures you have everything you need at your fingertips.",
    image: "",
    imageBase64: "",
  },
  workflow: {
    title: "How Vromonika Works?",
    workDetails: [
      {
        name: "Explore & Plan",
        description:
          "Browse detailed information on top attractions, hotels, transport, and food options based on your preferences and budget.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Customize Your Trip",
        description:
          "Use the AI-powered budget planner to create a personalized itinerary, including the best routes, accommodations, and local experiences.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Book & Secure Your Travel",
        description:
          "Instantly book tourist bus tickets, hotels, and other services directly from the app, ensuring a seamless and stress-free trip.",
        image: "",
        imageBase64: "",
      },
      {
        name: "Stay Updated & Safe",
        description:
          "Receive real-time alerts on weather conditions, danger zones, and emergency contacts, ensuring your safety throughout your journey.",
        image: "",
        imageBase64: "",
      },
    ],
  },
  videoInformation: {
    title: "What People Say About Vromonika",
    description:
      "Real Experiences. Genuine Reviews. See how Vromonika is making travel to Cox’s Bazar easier, safer, and more enjoyable!",
    videoUrl:
      "https://drive.google.com/file/d/1CGMln7bdAEQ-I-PpmrMNrykZgNuMRANv/preview",
  },
  testimonial: [
    {
      name: "Mohammad Salahuddin",
      image: "",
      imageBase64: "",
      rating: 5,
      description:
        "Vromonika made my trip to Cox’s Bazar so much easier! From finding the best places to visit to booking my bus tickets, everything was seamless. The danger zone alerts and emergency contact options gave me peace of mind while exploring. Highly recommended for anyone visiting Cox’s Bazar!",
    },
    {
      name: "Abdullah Al Noman",
      image: "",
      imageBase64: "",
      rating: 4,
      description:
        "Vromonika made my trip to Cox’s Bazar so much easier! From finding the best places to visit to booking my bus tickets, everything was seamless. The danger zone alerts and emergency contact options gave me peace of mind while exploring. Highly recommended for anyone visiting Cox’s Bazar!",
    },
    {
      name: "Nizam Uddin Ahmed",
      image: "",
      imageBase64: "",
      rating: 3,
      description:
        "Vromonika made my trip to Cox’s Bazar so much easier! From finding the best places to visit to booking my bus tickets, everything was seamless. The danger zone alerts and emergency contact options gave me peace of mind while exploring. Highly recommended for anyone visiting Cox’s Bazar!",
    },
  ],
  footer: {
    logo: "",
    logoBase64: "",
    description:
      "Vromonika is your ultimate travel companion for exploring Cox’s Bazar with ease. From discovering top attractions to booking transport and ensuring your safety, we provide everything you need for a hassle-free trip. Plan smarter, travel safer, and enjoy more with Vromonika!",
    socialMedia: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
        image: "",
        imageBase64: "",
      },
      {
        name: "Twitter",
        url: "https://twitter.com/",
        image: "",
        imageBase64: "",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
        image: "",
        imageBase64: "",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/",
        image: "",
        imageBase64: "",
      },
    ],

    plannerTitle: "Plan & Implementation",
    planner: [
      {
        name: "Mohammad Salahuddin",
        designation: "Deputy Commissioner & District Magistrate",
      },
      {
        name: "Nizam Uddin Ahmed",
        designation: "Additional Deputy Commissioner (Genaral)",
      },
      {
        name: "& district administration officials",
        designation: "",
      },
    ],
    techSupportImages: [],
    techSupportImagesBase64: [],
  },
})


// editLandingPage
const loading = ref(false)

const getLandingPage = async () => {
  try {
    loading.value = true

    const { data } = await landingPageStore.editLandingPage()

    console.log("data", data)
    if(data.status_code == 200){
      landingPage.value = data.data.data
      loading.value = false
    }
    
  } catch (error) {
    console.log(error)
  }
  

  console.log("dataa", data.data.data)
  
}

onMounted(() => {
  getLandingPage()
})


// const step = ref(1)
const step = ref(1)

// Dynamically determine the current component
const currentComponent = computed(() => components[step.value])

const componentKey = computed(
  () => Object.keys(landingPage.value)[step.value - 1],
)

const stepIncrement = item => {
  console.log("item", item)
  step.value = item
}

const stepDecrement = () => {
  step.value = step.value - 1
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

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}
</style>

