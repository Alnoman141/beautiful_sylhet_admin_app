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
import NewsForm from './campaignForm.vue'

const route = useRoute()

const noticeStore = useNoticeStore()

const ruleForm = ref({})

const getNewsDetails = async () => {
  console.log(route.params.id)

  const { data } = await noticeStore.editNotice({ id: route.params.id })

  console.log("data", data)

  ruleForm.value = data.data
}

onMounted(() => {
  getNewsDetails()
})
</script>
