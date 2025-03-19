<script setup>
import { router } from '@/plugins/1.router'
import { defineExpose, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const bufferValue = ref(20)
const progressValue = ref(10)
const isFallbackState = ref(false)
const interval = ref()
const showProgress = ref(false)

// const currentRoute = useRoute().path

let routeNames = ref([])

// const initialRoute = useRoute().path
// if (initialRoute) {
//   routeNames.value = initialRoute.split('/').filter(route => route !== '' && route !== 'dashboards')
// }
const initialRoute = useRoute().path
if (initialRoute) {
  routeNames.value = initialRoute
    .split('/')
    .filter(route => route !== '' && route !== 'dashboards' && !/^\d+$/.test(route)) // Ignore numbers
}

// watch(() => router.currentRoute.value.path, () => {
//   routeNames.value = router.currentRoute.value.path.split('/').filter(route => route !== '' && route !== 'dashboards')
// })
watch(() => router.currentRoute.value.path, () => {
  routeNames.value = router.currentRoute.value.path
    .split('/')
    .filter(route => route !== '' && route !== 'dashboards' && !/^\d+$/.test(route)) // Ignore numbers
})



watch([
  progressValue,
  isFallbackState,
], () => {
  if (progressValue.value > 80 && isFallbackState.value)
    progressValue.value = 82
  startBuffer()
})
function startBuffer() {
  clearInterval(interval.value)
  interval.value = setInterval(() => {
    progressValue.value += Math.random() * (15 - 5) + 5
    bufferValue.value += Math.random() * (15 - 5) + 6
  }, 800)
}

const fallbackHandle = () => {
  showProgress.value = true
  progressValue.value = 10
  isFallbackState.value = true
  startBuffer()
}

const resolveHandle = () => {
  isFallbackState.value = false
  progressValue.value = 100
  setTimeout(() => {
    clearInterval(interval.value)
    progressValue.value = 0
    bufferValue.value = 20
    showProgress.value = false
  }, 300)
}

defineExpose({
  fallbackHandle,
  resolveHandle,
})
</script>

<template>
  <!-- loading state via #fallback slot -->
  <div class="d-flex justify-end mb-5 mx-5">
    <ElBreadcrumb separator-class="el-icon-arrow-right">
      <ElBreadcrumbItem :to="{ path: '/' }">
        Dashboard
      </ElBreadcrumbItem>
      <ElBreadcrumbItem
        v-for="(route, index) in routeNames"
        :key="index"
        class="text-capitalize"
      >
        {{ route }}
      </ElBreadcrumbItem>
    </ElBreadcrumb>
  </div>
  <div
    v-if="showProgress"
    class="position-fixed"
    style="z-index: 9999; inset-block-start: 0; inset-inline: 0 0;"
  >
    <VProgressLinear
      v-model="progressValue"
      :buffer-value="bufferValue"
      color="primary"
      height="2"
      bg-color="background"
    />
  </div>
</template>
