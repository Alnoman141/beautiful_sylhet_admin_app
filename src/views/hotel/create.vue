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
import NewsForm from './form.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({

  spot_parent_id: null, 
  hotel_type_parent_id: null,
  hotel_category_parent_id: null,
  website_link: null,
  map_link: null,
  image: '',
  data: [
    {
      language_id: 1,  
      name: '',
      phone: '',
      address: '',
      description: '',
    },
    {
      language_id: 2,  
      name: '',
      phone: '',
      address: '',
      description: '',
    },
   
  ],
  
})
</script>
