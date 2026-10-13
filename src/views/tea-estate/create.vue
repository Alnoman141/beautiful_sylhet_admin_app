<!-- eslint-disable camelcase -->
<template>
  <div>
    <Form :rule-form="ruleForm" />
  </div>
</template>


<script setup lang="ts">
import { useSpotStore } from "@/stores/tourism/spotStore"
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Form from './Form.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({
  expiry: '',
  image: '',
  data: [
    {
      name: '',
      language_id: 1,
      location: '',
      description: '',
      distance: '',
      contact_info: '',
      map: '',
    },
    {     
      name: '',
      language_id: 2,
      location: '',
      description: '',
      distance: '',
      contact_info: '',
      map: '',
    },
  ],
  
})
</script>
