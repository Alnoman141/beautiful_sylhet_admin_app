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
import NewsForm from './lockerForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({

  spot_parent_id: null, 
  link: '',
  data: [
    {
      language_id: 1,      
      phone: '',
      address: '',
      description: '',
    },
    {
      language_id: 2,      
      phone: '',
      address: '',
      description: '',
    },
   
  ],
  
})
</script>
