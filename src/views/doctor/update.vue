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
import { useDoctorStore } from "@/stores/tourism/doctorStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './doctorForm.vue'

const route = useRoute()

const doctorStore = useDoctorStore()

const ruleForm = ref({})

const loading = ref(false)

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await doctorStore.editDoctor({ id: route.params.id })

  

  ruleForm.value = data.data

  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
