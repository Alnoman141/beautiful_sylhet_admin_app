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
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import RestaurantForm from './restaurantForm.vue'

const route = useRoute()

const restaurantStore = useRestaurantStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  

  const { data } = await restaurantStore.editRestaurant({ id: route.params.id })

  

  ruleForm.value = data.data

  // Convert date back to am/pm format
  

  ruleForm.value.restaurants.map(e => {
    const [ timePart] = e.open_time ? e.open_time.split(" ") : ""
    let [hours, minutes, seconds] = timePart ? timePart.split(":") : ""
    const period = Number(hours) >= 12 ? "pm" : "am"

    hours = Number(hours) % 12 || 12
    e.open_time = `${hours ? hours :'00' }:${minutes ? minutes : '00'}:${seconds ? seconds : '00'} ${period ? period : 'am'}`
    

    // close time
    const [timePart1] = e.close_time ? e.close_time.split(" ") : ""
    let [hours1, minutes1, seconds1] = timePart1 ? timePart1.split(":") : ""
    const period1 = Number(hours1) >= 12 ? "pm" : "am"

    hours1 = Number(hours1) % 12 || 12
    e.close_time = `${hours1 ? hours1 : '00'}:${minutes1 ? minutes1 : '00'}:${seconds1 ? seconds1 : '00'} ${period1 ? period1 : 'am'}`
    
  })

  // const [datePart24, timePart24] = data.data.expiry ?  data.data.expiry.split(' ') :''
  // let [hours24, minutes24, seconds24] = timePart24 ?  timePart24.split(':') :''
  // const period24 = Number(hours24) >= 12 ? 'pm' : 'am'

  // hours24 = Number(hours24) % 12 || 12
  // ruleForm.value.expiry = `${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`
}

onMounted(() => {
  getNewsDetails()
})
</script>
