<!-- eslint-disable camelcase -->
<template>
  <div>
    <RestaurantForm
      :rule-form="ruleForm"
      mode="create"
    />  
  </div>
</template>


<script setup lang="ts">
import { useSpotStore } from "@/stores/tourism/spotStore"
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import RestaurantForm from './restaurantForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({

  spot_parent_id: null,
  image: '',
  map_link: '',
  website_link: '',
  description: '',
  restaurant_category_parent_id: null,
  data: [
    {
      language_id: 1, 
      name: '',       
      phone: '',
      open_time: '',
      close_time: '',
      address: '',
      menu: '',
      description: '',
      facilities: '',
    },
    {
      language_id: 2, 
      name: '',       
      phone: '',
      open_time: '',
      close_time: '',
      address: '',
      menu: '',
      description: '',
      facilities: '',
    },
   

    
   
  ],
  
})
</script>
