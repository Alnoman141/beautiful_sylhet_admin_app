<!-- eslint-disable camelcase -->
<template>
  <div>
    <RestaurantForm
      :rule-form="ruleForm"
      mode="update"
    />
  </div>
</template>

<script setup lang="ts">
import { useRestaurantStore } from "@/stores/tourism/restaurantStore"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import RestaurantForm from "./restaurantForm.vue"

const route = useRoute()

const restaurantStore = useRestaurantStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  const { data } = await restaurantStore.editRestaurant({
    id: route.params.id,
  })

  ruleForm.value = data.data

  // Convert date back to am/pm format

  ruleForm.value.restaurants.map(e => {
    

    const [timePart] = e.open_time ? e.open_time.split(" ") : ""
    let [hours, minutes, seconds] = timePart ? timePart.split(":") : ""
    const period = Number(hours) >= 12 ? "pm" : "am"

    hours = Number(hours) % 12 || 12

    // Pad with leading zeros
    const pad = val => String(val).padStart(2, "0")

    e.open_time = `${pad(hours)}:${pad(minutes || "00")}:${pad(
      seconds || "00",
    )} ${period}`

    

    // close time
    const [timePart1] = e.close_time ? e.close_time.split(" ") : ""
    let [hours1, minutes1, seconds1] = timePart1 ? timePart1.split(":") : ""
    const period1 = Number(hours1) >= 12 ? "pm" : "am"

    hours1 = Number(hours1) % 12 || 12

    // Pad with leading zeros

    e.close_time = `${pad(hours1)}:${pad(minutes1 || "00")}:${pad(
      seconds1 || "00",
    )} ${period1}`


  })

  ruleForm.value.phoneNumber = data?.data?.restaurants?.[0]?.phone || ""

  ruleForm.value.open_time = data?.data?.restaurants?.[0]?.open_time || ""  
  ruleForm.value.close_time = data?.data?.restaurants?.[0]?.close_time || ""
}

onMounted(() => {
  getNewsDetails()
})
</script>
