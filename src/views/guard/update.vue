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
import { useGuardStore } from "@/stores/tourism/guardStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './guardForm.vue'

const route = useRoute()

const guardStore = useGuardStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  console.log(route.params.id)

  const { data } = await guardStore.editGuard({ id: route.params.id })

  console.log("data", data)

  ruleForm.value = data.data
}

onMounted(() => {
  getNewsDetails()
})
</script>
