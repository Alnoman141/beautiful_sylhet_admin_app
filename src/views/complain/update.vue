<!-- eslint-disable camelcase -->
<template>
  <div>
    <NewsForm
      :rule-form="ruleForm"
      mode="update"
      @get-detail="getNewsDetails"
    />
  </div>
</template>


<script setup lang="ts">
import { useComplainStore } from "@/stores/tourism/complainStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './complainForm.vue'

const route = useRoute()

const complainStore = useComplainStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  

  const { data } = await complainStore.editComplain({ id: route.params.id })

  

  ruleForm.value = data.data
  ruleForm.value.description = ""
  ruleForm.value.image = ""
}

onMounted(() => {
  getNewsDetails()
})
</script>
