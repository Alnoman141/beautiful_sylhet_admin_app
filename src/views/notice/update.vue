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
import { useNoticeStore } from "@/stores/tourism/noticeStore"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewsForm from './noticeForm.vue'

const route = useRoute()

const noticeStore = useNoticeStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  console.log(route.params.id)

  const { data } = await noticeStore.editNotice({ id: route.params.id })

 

  

  

  ruleForm.value = data.data


  // Convert date back to am/pm format
  const [datePart24, timePart24] = data.data.expiry.split(' ')
  let [hours24, minutes24, seconds24] = timePart24.split(':')
  const period24 = Number(hours24) >= 12 ? 'PM' : 'AM'

  hours24 = Number(hours24) % 12 || 12
  ruleForm.value.expiry = `${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`

}

onMounted(() => {
  getNewsDetails()
})
</script>
