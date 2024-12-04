<!-- eslint-disable camelcase -->
<template>
  <div>
    <NewsForm
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

const volunteerStore = useVolunteerStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  console.log(route.params.id)

  const { data } = await volunteerStore.editVolunteer({ id: route.params.id })

  console.log("data", data)

  ruleForm.value = data.data
}

onMounted(() => {
  getNewsDetails()
})
</script>
