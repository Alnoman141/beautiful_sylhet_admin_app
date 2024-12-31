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
import { useAtmStore } from "@/stores/tourism/atmStore"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import NewsForm from "./atmForm.vue"

const route = useRoute()

const loading = ref(false)
const atmStore = useAtmStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await atmStore.editAtm({ id: route.params.id })

  ruleForm.value = data.data

  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
