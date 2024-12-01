<!-- eslint-disable camelcase -->
<template>
  <div>
    <CategoryForm :rule-form="ruleForm" />
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import CategoryForm from './form.vue'

const route = useRoute()



const ruleForm = ref({

  
  data: [
    {
      language_id: 1,  
      name: '',
      
    },
    {
      language_id: 2,  
      name: '',
      
    },
   
  ],
  
})
</script>
