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
import { useBankStore } from "@/stores/tourism/bankStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './bankForm.vue'

const loading = ref(false)
const route = useRoute()

const bankStore = useBankStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await bankStore.editBank({ id: route.params.id })

  ruleForm.value = data.data
  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
