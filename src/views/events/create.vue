<!-- eslint-disable camelcase -->
<template>
  <div>
    <NewsForm :rule-form="ruleForm" />
  </div>
</template>


<script setup lang="ts">
import { useSpotStore } from "@/stores/tourism/spotStore"
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './eventsForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({
  expiry: '',
  spot_parent_id: null,
  image: '',
  data: [
    {
      language_id: 1, 
      name: '',
      location: '',
      time: '',
      destination: '',
      fare: '',
      phone: '',
      terms: '',
      description: '',
    },
    {
      language_id: 2, 
      name: '',
      location: '',
      time: '',
      destination: '',
      fare: '',
      phone: '',
      terms: '',
      description: '',
    },

    
   
  ],
  
})
</script>
