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
import { useRestaurantCategoryStore } from "@/stores/tourism/restaurantCategoryStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './form.vue'

const route = useRoute()

const restaurnatCategoryStore = useRestaurantCategoryStore()

const ruleForm = ref({})
const loading = ref(false)

const getNewsDetails = async () => {
  loading.value = true

  const { data } = await restaurnatCategoryStore.editRestaurantCategory({ id: route.params.id })

  ruleForm.value = data.data
  loading.value= false
}

onMounted(() => {
  getNewsDetails()
})
</script>
