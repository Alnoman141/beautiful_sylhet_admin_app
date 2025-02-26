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
import NewsForm from './fairForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({

  spot_parent_id: null,
  image: '',
  map_link: '',
  short_description: '',
  data: [
    {
      language_id: 1, 
      name: '',       
      instruction: '',
    },
    {
      language_id: 2, 
      name: '',       
      instruction: '',
    },
   

    
   
  ],
  
})
</script>
