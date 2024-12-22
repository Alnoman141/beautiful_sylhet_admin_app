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
import NewsForm from './serviceForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({
  type: route.params.type,
  spot_parent_id: null, 
  link: '',
  booking_numbers: [
    { name: '', numbers: [{ phone: '' }] },
  ],
  supervisor_numbers: [
    { name: '', numbers: [{ phone: '' }] },
  ],
  descriptions: [
    { name: '', language_id: 1, fare: null },
    { name: '', language_id: 2, fare: null },
  ],
  
})
</script>
