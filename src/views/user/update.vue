<!-- eslint-disable camelcase -->
<template>
  <div>
    <NewsForm
      v-loading="loading"
      :rule-form="ruleForm"      
      mode="update"
    />
    <Password :id="route.params.id" />
  </div>
</template>


<script setup lang="ts">
import { useUserStore } from "@/stores/tourism/userStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Password from './password.vue'
import NewsForm from './userForm.vue'

const route = useRoute()

const userStore = useUserStore()

const ruleForm = ref({})

const loading = ref(false)

const getNewsDetails = async () => {

  loading.value = true

  const { data } = await userStore.editUser({ id: route.params.id })

 

  ruleForm.value = data.data

  loading.value = false
}

onMounted(() => {
  getNewsDetails()
})
</script>
