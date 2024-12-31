
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
import { useLockerStore } from "@/stores/tourism/lockerStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './lockerForm.vue'

const route = useRoute()
const loading = ref(false)
const lockerStore = useLockerStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await lockerStore.editLocker({ id: route.params.id })

  

  ruleForm.value = data.data
  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
