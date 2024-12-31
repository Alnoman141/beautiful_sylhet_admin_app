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
import { useVolunteerStore } from "@/stores/tourism/volunteerStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './volunteerForm.vue'

const route = useRoute()

const loading = ref(false)

const volunteerStore = useVolunteerStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await volunteerStore.editVolunteer({ id: route.params.id })

  ruleForm.value = data.data

  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
