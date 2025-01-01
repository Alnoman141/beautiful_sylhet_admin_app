<!-- eslint-disable camelcase -->
<template>
  <div>
    <NewsForm
      v-loading="loading"
      :rule-form="ruleForm"
      mode="update"
    />
    
    <Password :id="userData.id" />
  </div>
</template>


<script setup lang="ts">
import { useUserStore } from "@/stores/tourism/userStore"
import { getUserData } from '@/utils/auth'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Password from './password.vue'
import NewsForm from './userForm.vue'

const route = useRoute()

const userStore = useUserStore()

const ruleForm = ref({})

const loading = ref(false)

const userData = getUserData()

const getNewsDetails = async () => {

  loading.value = true

  const { data } = await userStore.editUser({ id: userData.id })

 

  ruleForm.value = data.data

  loading.value = false
}

onMounted(() => {
  getNewsDetails()
  
})
</script>
