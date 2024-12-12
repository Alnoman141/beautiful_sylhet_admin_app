<template>
  <div class="d-flex justify-content-center py-4">
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    :size="size"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalData"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  </div>
</template>
<script lang="ts" setup>
import type { ComponentSize } from "element-plus";
import { defineEmits, defineProps, ref } from "vue";
const props = defineProps({
  totalData: {
    type: Number,
    
  },
  
  
})
const emit = defineEmits(["getEmit"]);
const currentPage = ref(null);

const pageSize = ref(null);

const size = ref<ComponentSize>("default");
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  
  pageSize.value=val
   emit('getEmit',pageSize.value,currentPage.value)
};
const handleCurrentChange = (val: number) => {
  
  currentPage.value=val
  emit('getEmit',pageSize.value,currentPage.value)
  
};
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-block-start: 10px;
}

.demo-pagination-block .demonstration {
  margin-block-end: 16px;
}
</style>
