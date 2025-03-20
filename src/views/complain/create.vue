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
import NewsForm from './complainForm.vue'

const route = useRoute()

const spotStore = useSpotStore()

const ruleForm = ref({

  complain_category_parent_id: null,
  image: '',
  file: '',  
  description: '',
  
})
</script>
