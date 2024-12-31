<!-- eslint-disable camelcase -->
<template>
  <div>
    <NewsForm
      v-loading="loading"
      :rule-form="ruleForm"
      mode="update"
    />
  </div>
</template>


<script setup lang="ts">
import { useServiceStore } from "@/stores/tourism/serviceStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './serviceForm.vue'

const route = useRoute()

const serviceStore = useServiceStore()

const loading = ref(false)

const ruleForm = ref({
  id: null,
  type: route.name == 'editTourism' ? 1 : route.name == 'editDc' ? 2 : route.name == 'editBus' ? 3 : 4,
  spot_parent_id: null, 
  link: '',
  booking_numbers: [
    { name: '', number: [] },
  ],
  supervisor_numbers: [
    { name: '', number: [] },
  ],
  descriptions: [
    { name: '', language_id: 1, fare: null },
    { name: '', language_id: 2, fare: null },
  ],
  
})

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await serviceStore.editService({ id: route.params.id })

  
  let supNumber = []
  
  data.data.supervisor_numbers?.map(element => {
    // supNumber.push({ name: e.name, number: e.numbers })
    
    element?.numbers?.map(e => {
      
      supNumber.push( {  phone: e } )
    })

    
    

  })


  let bookNumber = []
  data.data.booking_numbers?.map(element => {
    // supNumber.push({ name: e.name, number: e.numbers })
    
    element?.numbers?.map(e => {
      
      bookNumber.push( {  phone: e } )
    })

  
    

  })
  ruleForm.value.descriptions = data.data.parent.descriptions
  ruleForm.value.id = data.data.id
  
  ruleForm.value.spot_parent_id = data.data.spot_parent_id
  ruleForm.value.booking_numbers[0].name = data.data.booking_numbers[0].name
  ruleForm.value.booking_numbers[0].numbers = bookNumber
  ruleForm.value.type != 1 && ruleForm.value.type != 2 ? ruleForm.value.supervisor_numbers[0].name = data.data.supervisor_numbers[0].name :''
  ruleForm.value.type != 1 && ruleForm.value.type != 2 ? ruleForm.value.supervisor_numbers[0].numbers = supNumber :''

  // ruleForm.value = data.data
  ruleForm.value.link = data.data.parent.link


  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
