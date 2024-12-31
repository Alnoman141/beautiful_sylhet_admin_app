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
import { useGuardStore } from "@/stores/tourism/guardStore"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import NewsForm from "./guardForm.vue"

const route = useRoute()

const guardStore = useGuardStore()

const ruleForm = ref({})

const loading = ref(false)

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await guardStore.editGuard({ id: route.params.id })

  ruleForm.value = data.data

  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
