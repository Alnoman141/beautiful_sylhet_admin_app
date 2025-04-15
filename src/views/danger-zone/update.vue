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
import { useRedZoneStore } from "@/stores/tourism/redZoneStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './redZoneForm.vue'

const route = useRoute()

const redZoneStore = useRedZoneStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  

  const { data } = await redZoneStore.editRedZone({ id: route.params.id })

  

  ruleForm.value = data.data
}

onMounted(() => {
  getNewsDetails()
})
</script>
