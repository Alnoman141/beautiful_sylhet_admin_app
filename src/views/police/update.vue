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
import { usePoliceStore } from "@/stores/tourism/policeStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './policeForm.vue'

const route = useRoute()

const policeStore = usePoliceStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  console.log(route.params.id)

  const { data } = await policeStore.editPolice({ id: route.params.id })

  console.log("data", data)

  ruleForm.value = data.data
}

onMounted(() => {
  getNewsDetails()
})
</script>
