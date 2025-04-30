<template>
  <div class="d-flex justify-content-center py-4">

    
  <el-pagination
    v-model:current-page="page"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    :size="pageSizePassed"
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
  pageSizePassed: {
    type: Number,
    default: 10,
  },
  
  
})
const emit = defineEmits(["getEmit"]);
const page = ref(null);

const pageSize = ref(20);

const size = ref<ComponentSize>("default");
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  pageSize.value= props.pageSizePassed
  pageSize.value=val
   emit('getEmit',pageSize.value,page.value)
};
const handleCurrentChange = (val: number) => {
  pageSize.value= props.pageSizePassed
  page.value=val
  emit('getEmit',pageSize.value,page.value)
  
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
