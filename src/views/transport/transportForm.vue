<template>
  <div>
    <ElCard class="my-4 ">
      <VRow>
        <VCol>
      <b> Transport {{mode == 'update' ? 'Edit' : 'Create'}} </b>
      </VCol>
      
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'transportList'}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed" 
            class="create-btn "
          >
              Transport List
          </RouterLink>
        </VCol>
      </VRow>
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

      
      <VRow>
        <VCol cols="12" md="6">

         <ElFormItem
            label="Transport Type"
            prop="spot_parent_id"
          > 

          <el-select
              v-model="ruleForm.transport_type_parent_id"
              placeholder="Select Transport Type"
            
              
            >
            
              <el-option
                v-for="(item,index) in transportDropdownData"
                :key="index"
                :label="item.name"
                :value="item.parent_id"
                
              />
          </el-select>
         </ElFormItem>
        </VCol>
        <VCol cols="12" md="6">
          <ElFormItem
            label="Link"
            prop="link"
          >         
            <ElInput v-model="ruleForm.map_link"  />

          </ElFormItem>
        </VCol>          
      </VRow>       
    

        <VRow>
          <VCol v-for="(item, index) in ruleForm && ruleForm.transports ? ruleForm.transports : ruleForm.data" :key="index" cols="12" md="6">
        
               <fieldset   class="rounded py-2 px-2">
                  <legend class='mx-4'> <b>  {{index == 0 ? 'Bangla':'English'}} </b> </legend>
                  <VRow>
                    <VCol cols="12"  md="6"  >
                      
                    <ElFormItem
                      label="Name"
                      prop="name"
                    >
                      <ElInput v-model="item.name"  />

                    </ElFormItem>
                    </VCol>
                    <VCol cols="12"  md="6"  >
                      
                    <ElFormItem
                      label="Phone"
                      prop="phone"
                    >
                      <ElInput v-model="item.phone"  />

                    </ElFormItem>
                    </VCol>
                    <VCol cols="12"  md="6"  >
                      
                    <ElFormItem
                      label="Address"
                      prop="address"
                    >
                      <ElInput v-model="item.address"  />

                    </ElFormItem>
                    </VCol>
                    <VCol cols="12"  md="6"  >
                      
                    <ElFormItem
                      label="Time"
                      prop="time"
                    >
                      <ElInput v-model="item.time"  />

                    </ElFormItem>
                    </VCol>
                    <VCol cols="12"  md="6"  >
                      
                    <ElFormItem
                      label="Fare"
                      prop="fare"
                    >
                      <ElInput v-model="item.fare"  />

                    </ElFormItem>
                    </VCol>
                    <VCol cols="12"  md="6"  >
                      
                    <ElFormItem
                      label="Destination"
                      prop="destination"
                    >
                      <ElInput v-model="item.destination"  />

                    </ElFormItem>
                    </VCol>
                     <VCol cols="12"    >
                      
                    <ElFormItem
                      label="Description"
                      prop="description"
                    >
                      <ElInput type="textarea" v-model="item.description"  />

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

import { useTransportStore } from "@/stores/tourism/transportStore";
import { notify } from '@/utils/notification';
import { type ComponentSize, type FormInstance, type FormRules } from 'element-plus';
import { defineEmits, defineProps, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const emit = defineEmits(["getEmit"]);
const route = useRoute()

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
const transportStore = useTransportStore()
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const locationOptions = ['Home', 'Company', 'School']
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],  
})
const transportDropdownData = ref([])
const getTransportTypeDropdownList = async () => {
  try{
  const { data } = await transportStore.getTransportType()
  
  transportDropdownData.value = data.data
  }catch(e){
      console.log(e)
  }
  
}

const submitForm = async (formEl: FormInstance | undefined) => {
  
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    let data = []

    let form = {
      id: props.ruleForm.id,
      spot_parent_id: props.ruleForm.transport_type_parent_id,
      map_link: props.ruleForm.map_link,
      data: props.ruleForm.transports
    }
    props.ruleForm.parent_spot_id = props.ruleForm.spot_parent_id
    if (valid) {
      const { data } = props.ruleForm.id ?  await transportStore.updateTransport( form ) : await transportStore.createTransport( props.ruleForm )
      data.status_code == 200 ? notify('Congratulations!', data.message, 'success', 'top-right',
        emit('getEmit')
      ) : ''
    } else {
      console.log('error submit!', fields)
    }
  })
}

const typeList = ref([])


 

onMounted(() => {
  getTransportTypeDropdownList()
})




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

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px; 
}
</style>
