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
import { usePoliceStore } from "@/stores/tourism/policeStore"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import NewsForm from "./policeForm.vue"

const route = useRoute()

const policeStore = usePoliceStore()

const ruleForm = ref({})

const loading = ref(false)

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await policeStore.editPolice({ id: route.params.id })

  ruleForm.value = data.data
  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
