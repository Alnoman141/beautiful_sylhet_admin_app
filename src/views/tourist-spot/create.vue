<!-- eslint-disable camelcase -->
<template>
  <div>
    <SpotForm :rule-form="ruleForm" />
  </div>
</template>


<script setup lang="ts">
import { useSpotStore } from "@/stores/tourism/spotStore"
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import SpotForm from './spotForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = reactive({
  
  // starts from here
  
  image: '',
  map_link: '',
  link: [{
    link: '',
  }],
  images: [],
  data: [
    {
     
      // spot_parent_id: 1,
      language_id: 1,      
      description: null,
      tag_line: null,
      distance: null,
      travel_info: null,
      foods: null,
      visiting_time: null,
      rides: null,

      // fair: null,
      // details: null,
      // safety_guideline: null,
      tourist_places: null,
      hazard_info: null,
      advice: null,
      others_info: null,

      // risk_factor: null,
      
    },
    {
     
      // spot_parent_id: null,
      language_id: 2,      
      description: null,
      tag_line: null,
      distance: null,
      travel_info: null,
      foods: null,
      visiting_time: null,
      rides: null,
      fair: null,
      details: null,
      safety_guideline: null,
      tourist_places: null,
      hazard_info: null,
      advice: null,
      others_info: null,

      // risk_factor: null,
      
    },
    
  ],
  
})
</script>
