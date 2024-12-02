<template>
  <div>
    <ElCard class="my-4 ">
      <b> Hotel Category {{mode == 'update' ? 'Edit' : 'Create'}} </b>
    </ElCard>
    <ElCard>
      <ElForm
        ref="ruleFormRef"
        
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        label-position="top"
        status-icon
      > 
        <VRow
          
        >
          <VCol
          
            v-for="(item, index) in ruleForm && ruleForm.categories ? ruleForm.categories : ruleForm.data" :key="index"
          
          >
                <fieldset   class="rounded py-2 px-2">
                  <legend class='mx-4'> <b>  {{index == 0 ? 'Bangla':'English'}} </b> </legend>
                  <VRow>
                    <VCol cols="12"   >
                      
                    <ElFormItem
                      label="Name"
                      :prop="ruleForm && ruleForm.categories ? `categories.${index}.name` : `data.${index}.name`"
                      :rules="{
                        required: true,
                        message: 'Please input Activity name',
                        trigger: 'blur'
                    }"

                    >
                      <ElInput v-model="item.name"  placeholder="Enter Category name" />

                    </ElFormItem>
                    </VCol>
                    
                  </VRow>
                </fieldset>
          </VCol>
        </VRow>

          
                                
        <div class=" py-4 text-center">
          <ElButton
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            {{mode}}
          </ElButton>
        
        </div>
      </ElForm>
    </ElCard>    
  </div>
</template>


<script setup lang="ts">

import { useHotelCategoryStore } from "@/stores/tourism/hotelCategoryStore";
import { notify } from '@/utils/notification';
import { type ComponentSize, type FormInstance, type FormRules } from 'element-plus';
import { defineEmits, defineProps, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const emit = defineEmits(["getEmit"]);
const route = useRoute()
const router = useRouter()
const props = defineProps({
  ruleForm: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    default:'create'
  },
  
}) 

const hotelCategoryStore = useHotelCategoryStore()
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const locationOptions = ['Home', 'Company', 'School']
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],  
})


const submitForm = async (formEl: FormInstance | undefined) => {
  
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    
      
    let form = {
      id: props.ruleForm.id,      
      data: props.ruleForm.categories
    }   
    if (valid) {
      const { data } = props.ruleForm.id ?  await hotelCategoryStore.updateHotelCategory( form ) : await hotelCategoryStore.createHotelCategory( props.ruleForm )
      data.status_code == 200 ? notify('Congratulations!', data.message, 'success', 'top-right',
        emit('getEmit')
      ) : ''
      router.push({name:'hotelCategoryList'})
    } else {
      console.log('error submit!', fields)
    }
  })
}

const typeList = ref([])


 






</script>

<style scoped>
.upload-section{
  display: block;
  text-align: center;
}

.dlt-btn{
  position: relative;
  display: none;
  border-radius: 50%;
  background-color: white;
  block-size: 30px;
  inline-size:30px;
  inset-block-start:-25%;
  opacity: 0.8;

  /* transition: 0.3s; */
  
}

.btn-section:hover  .dlt-btn{
  display: block;
  
}


</style>
