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
import NewsForm from './atmForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({

  spot_parent_id: null,
  bank_parent_id: null,
  map_link: null,
  image: '',
  data: [
    {
      language_id: 1, 
      name: '',       
      address: '',
    },
    {
      language_id: 2, 
      name: '',       
      address: '',
    },
   

    
   
  ],
  
})
</script>
