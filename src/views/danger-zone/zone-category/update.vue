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
import { useRedZoneCategoryStore } from "@/stores/tourism/redZoneCategoryStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './form.vue'

const route = useRoute()

const redZoneCategoryStore = useRedZoneCategoryStore()

const ruleForm = ref({})
const loading = ref(false)

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await redZoneCategoryStore.editRedZoneCategory({ id: route.params.id })

  ruleForm.value = data.data
  loading.value= false
}

onMounted(() => {
  getNewsDetails()
})
</script>
