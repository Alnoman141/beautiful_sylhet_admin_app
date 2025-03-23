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
            :to="{ name: 'landingPage' }"
            class="create-btn"
          >
            <ElTooltip
              class="item"
              effect="dark"
              content="Landing Page"
              placement="top-start"
            >
              Landing Page
            </ElTooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <!-- {{ landingPage }} -->
    <!-- Tabs -->
    <ElTabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <ElTabPane
        v-for="(component, index) in components"
        :key="index"
        :label="component.name"
        :name="String(index + 1)"
      />
    </ElTabs>

    <Transition
      v-loading="loading"
      name="slide"
      mode="out-in"
    >
      <component
        :is="currentComponent"
        :key="step"
        :rule-form="landingPage[currentComponentKey] || {}"
        :mode="mode"
        @step-increment="stepIncrement"
        @step-decrement="stepDecrement"
        @submit-form="submitForm"
      />
    </Transition>
  </div>
</template>

<script setup>
import { useLandingPageStore } from "@/stores/tourism/landingPageStore"
import { notify } from "@/utils/notification"
import { computed, onMounted, ref, watch } from "vue"
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

const landingPageStore = useLandingPageStore()
const mode = ref("create")

const landingPage = ref({
  header: {
    logo: "",
    logoBase64: "",
    logoTwo: "",
    logoBase64Two: "",

    // navLinks: [
    //   {
    //     name: "Home",
    //     url: "/",
    //   },
    //   {
    //     name: "About",
    //     url: "/about",
    //   },
    //   {
    //     name: "Features",
    //     url: "/features",
    //   },
    //   {
    //     name: "Testimonial",
    //     url: "/testimonial",
    //   },
    //   {
    //     name: "Contact",
    //     url: "/contact",
    //   },
    // ],
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
    videoUrl:
      "https://drive.google.com/file/d/1CGMln7bdAEQ-I-PpmrMNrykZgNuMRANv/preview",
  },
  testimonials: {
    title: "What People Say About Vromonika",
    description:
      "Real Experiences. Genuine Reviews. See how Vromonika is making travel to Cox’s Bazar easier, safer, and more enjoyable!",
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
  },
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

// ✅ Define components with corresponding keys
const components = [
  { name: "Header", component: Header, key: "header" },
  { name: "Carousel", component: Caurosel, key: "caurosel" },
  { name: "About", component: About, key: "about" },
  { name: "Feature", component: Feature, key: "feature" },
  { name: "Speciality", component: Speciality, key: "speciality" },
  {
    name: "Why Choose Vromonica",
    component: WhyChooseVromonica,
    key: "whyChooseVromonica",
  },
  { name: "Workflow", component: Workflow, key: "workflow" },
  { name: "Video Tutorial", component: VideoTutorial, key: "videoInformation" },
  { name: "Testimonial", component: Testimonial, key: "testimonials" },
  { name: "Footer", component: Footer, key: "footer" },
]

const step = ref(1)
const activeName = ref("1")

// ✅ Computed property for the current component
const currentComponent = computed(
  () => components[step.value - 1]?.component || null,
)

// ✅ Computed property for the current key
const currentComponentKey = computed(
  () => components[step.value - 1]?.key || "",
)

// ✅ Watcher to debug and verify data updates
watch(currentComponentKey, newKey => {
  console.log("Switched to:", newKey)
  console.log("Data for this tab:", landingPage[newKey])
})

// ✅ Handle tab click
const handleClick = tab => {
  console.log(tab)

  const newStep = parseInt(tab.paneName, 10)

  if (newStep >= 1 && newStep <= components.length) {
    step.value = newStep
    activeName.value = tab.paneName
  }
}

// editLandingPage
const loading = ref(false)

const getLandingPage = async () => {
  try {
    loading.value = true

    const { data } = await landingPageStore.editLandingPage()

   
    if (data.status_code == 200) {
      landingPage.value = data.data.data
      loading.value = false
      
      
    }
  } catch (error) {
    console.log(error)
  }
}

const submitForm = async () => {
  try {
    loading.value = true

    const { data } = await landingPageStore.createLandingPage({
      data: landingPage.value,
    })

    
    data.status_code == 200
      ? (notify("Congratulations!", data.message, "success", "top-right"),
      (loading.value = false))
      : ""

    // data.status_code == 200 ? router.push({ name: "landingPage" }) : ""
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

onMounted(() => {
  getLandingPage()
})

const componentKey = computed(
  () => Object.keys(landingPage.value)[step.value - 1],
)

const stepIncrement = () => {
  if (step.value < components.length) {
    step.value++
    activeName.value = String(step.value) // ✅ Sync tab change
  }
}

const stepDecrement = () => {
  if (step.value > 1) {
    step.value--
    activeName.value = String(step.value) // ✅ Sync tab change
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

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
