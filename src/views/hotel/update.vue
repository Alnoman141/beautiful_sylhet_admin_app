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
import { useHotelStore } from "@/stores/tourism/hotelStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './hotelForm.vue'

const route = useRoute()
const loading = ref(false)
const hotelStore = useHotelStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await hotelStore.editHotel({ id: route.params.id })

 

  ruleForm.value = data.data

  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
