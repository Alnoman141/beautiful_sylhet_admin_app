<!-- eslint-disable camelcase -->
<template>
  <div>
    <Form
      v-loading="loading"
      :rule-form="ruleForm"
      mode="update"
    />
  </div>
</template>


<script setup lang="ts">
import { useTeaEstateStore } from "@/stores/tourism/teaEstateStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Form from './Form.vue'

const route = useRoute()
const loading = ref(false)
const teaEstateStore = useTeaEstateStore()

const ruleForm = ref({})

const getTeaEstateDetails = async () => {
  
  loading.value = true

  const { data } = await teaEstateStore.getTeaEstateById({ id: route.params.id })

  ruleForm.value = data.data
  loading.value = false
}

onMounted(() => {
  getTeaEstateDetails()
})
</script>
