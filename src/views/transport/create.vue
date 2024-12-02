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
import NewsForm from './transportForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({

  transport_type_parent_id: null,
  map_link: null,
  data: [
    {
      language_id: 1, 
      name: '',
      time: '',
      destination: '',
      fare: '',
      phone: '',
      address: '',
      description: '',
    },
    {
      language_id: 2, 
      name: '',
      time: '',
      destination: '',
      fare: '',
      phone: '',
      address: '',
      description: '',
    },
    
   
  ],
  
})
</script>
