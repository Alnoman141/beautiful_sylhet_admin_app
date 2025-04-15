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
import { useFairStore } from "@/stores/tourism/fairStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './fairForm.vue'

const route = useRoute()

const fairStore = useFairStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  

  const { data } = await fairStore.editFair({ id: route.params.id })

  

  ruleForm.value = data.data
}

onMounted(() => {
  getNewsDetails()
})
</script>
