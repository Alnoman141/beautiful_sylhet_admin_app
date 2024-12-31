<template>
  <div>
    <SpotForm
      v-loading="loading"
      :rule-form="ruleForm"
      mode="update"
      @get-emit="getSpotlist"
    />
  </div>
</template>


<script setup lang="ts">
import { useSpotStore } from "@/stores/tourism/spotStore"
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SpotForm from './spotForm.vue'

const loading = ref(false)
const route = useRoute()
const ruleForm = ref({})
const spotStore = useSpotStore()

const getSpotlist = async () => {
  loading.value = true
  try {
    
    let parameter = {
      id: route.params.id,
    }

    const { data } = await spotStore.editSpot(parameter)

    ruleForm.value = data.data
    loading.value = false
  }catch(error) {
    console.log("error", error)
  }
}

onMounted (() => {
  getSpotlist()
})
</script>
