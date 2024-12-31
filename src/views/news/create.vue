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
import NewsForm from './newsForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({
  expiry: '',
  news_type_id: null, 
  data: [
    {
      name: '',
      language_id: 1,      
    },
    {     
      name: '',
      language_id: 2,      
    },
  ],
  
})
</script>
