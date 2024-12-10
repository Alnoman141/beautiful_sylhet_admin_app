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
import { useNewsStore } from "@/stores/tourism/newsStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './newsForm.vue'

const route = useRoute()

const newsStore = useNewsStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  

  const { data } = await newsStore.editNews({ id: route.params.id })

  

  ruleForm.value = data.data
}

onMounted(() => {
  getNewsDetails()
})
</script>
