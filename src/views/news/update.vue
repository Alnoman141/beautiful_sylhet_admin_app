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
import { useNewsStore } from "@/stores/tourism/newsStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './newsForm.vue'

const route = useRoute()
const loading = ref(false)
const newsStore = useNewsStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  
  loading.value = true

  const { data } = await newsStore.editNews({ id: route.params.id })

  ruleForm.value = data.data
  loading.value = false


  // Convert date back to am/pm format
  const [datePart24, timePart24] = data.data.expiry ?  data.data.expiry.split(' ') :''
  let [hours24, minutes24, seconds24] = timePart24 ?  timePart24.split(':') :''
  const period24 = Number(hours24) >= 12 ? 'pm' : 'am'

  hours24 = Number(hours24) % 12 || 12
  ruleForm.value.expiry = `${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`
}

onMounted(() => {
  getNewsDetails()
})
</script>
