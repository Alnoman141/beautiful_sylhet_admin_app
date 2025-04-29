<template>
  <div class="graph-mini">
    <VProgressCircular
      :model-value="circleValue"
      :size="40"
      :width="4"
      color="primary"
    >
      <span class="text-caption">{{ value }}</span>
    </VProgressCircular>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ value: number }>()

const circleValue = computed(() => {
  // For the circle fill
  return props.value >= 100 ? 100 : props.value
})
</script>

<style scoped>
.graph-mini {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
