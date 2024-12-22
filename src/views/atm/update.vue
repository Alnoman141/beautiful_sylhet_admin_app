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
import { useAtmStore } from "@/stores/tourism/atmStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './atmForm.vue'

const route = useRoute()

const atmStore = useAtmStore()

const ruleForm = ref({})



const getNewsDetails = async () => {
  console.log(route.params.id)

  const { data } = await atmStore.editAtm({ id: route.params.id })

  

  ruleForm.value = data.data
}

onMounted(() => {
  getNewsDetails()
})
</script>
