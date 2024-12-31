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
import { useTransportStore } from "@/stores/tourism/transportStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './transportForm.vue'

const route = useRoute()
const loading = ref(false)
const transportStore = useTransportStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await transportStore.editTransport({ id: route.params.id })

  ruleForm.value = data.data

  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
