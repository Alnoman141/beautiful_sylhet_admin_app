<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
      <b> Notice {{mode == 'update' ? 'Edit' : 'Create'}} </b>
      </VCol>
      <VCol cols="6" class="text-right">
      <RouterLink
        type="primary"
        :underline="false"          
          
        :to="{ name: 'noticeList'}"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
        class="create-btn "
      >
        Notice List
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
          <VCol v-for="(item, index) in ruleForm && ruleForm.notice ? ruleForm.notice : ruleForm.data" :key="index" cols="12" md="6">
        
               <fieldset   class="rounded py-2 px-2">
                  <legend class='mx-4'> <b>  {{index == 0 ? 'Bangla':'English'}} </b> </legend>
                  <VRow>
                    <VCol cols="12">                      
                      <ElFormItem
                        label="Name"
                        prop="name"
                      >
                        <ElInput v-model="item.name"  />
                      </ElFormItem>
                    </VCol>                    
                  </VRow>
                </fieldset>            
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="6" class=" my-2">
                  <ElFormItem
                    label="Image"
                    prop="image">
                    <el-upload
                      class="upload-section"
                      drag
                      :on-change="onFileChange"
                      auto-upload="false"
                                
                    >
                      
                      <div class="el-upload__text" >
                        <el-icon v-if="!ruleForm.image" class="el-icon--upload"><upload-filled /></el-icon> 
                        <img :src="previewImage ? previewImage : ruleForm.image" alt="" height="60" width="60" class="border mt-2">                  
                        <el-icon  class="avatar-uploader-icon"><Plus /></el-icon> <br>
                        Drop file here or <em>click to upload</em>
                      </div>
                      <template #tip>
                        
                        <div class="el-upload__tip">
                          jpg/png files with a size less than 500kb
                        </div>
                      </template>
                    </el-upload>   
                  </ElFormItem>           
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

import { useNoticeStore } from "@/stores/tourism/noticeStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from '@/utils/notification';
import { type ComponentSize, type FormInstance, type FormRules } from 'element-plus';
import { defineEmits, defineProps, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const spotStore = useSpotStore()
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
const noticeStore = useNoticeStore()
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
    let data = []

    let form = {
      id: props.ruleForm.id,
      image: tempImg.value ? tempImg.value : null,
      spot_parent_id: props.ruleForm.spot_parent_id,
      
      data: props.ruleForm.notice
    }
    props.ruleForm.image = tempImg.value ? tempImg.value : ''
    props.ruleForm.spot_parent_id = props.ruleForm.spot_parent_id
    if (valid) {
      const { data } = props.ruleForm.id ?  await noticeStore.updateNotice( form ) : await noticeStore.createNotice( props.ruleForm )
      data.status_code == 200 ? notify('Congratulations!', data.message, 'success', 'top-right',
        emit('getEmit')
      ) : ''
      data.status_code == 200 ? router.push({ name: 'noticeList' }) : ''
    } else {
      console.log('error submit!', fields)
    }
  })
}

const typeList = ref([])

const previewImage = ref(null)
const tempImg = ref('')
const onFileChange = (file) => {
    
    tempImg.value = file.raw;

    

    const reader = new FileReader()

    reader.readAsDataURL(file.raw)
    reader.onload = () => {
      previewImage.value = reader.result
    }

}

const imgViewModal = ref(false)
const modalImg = ref(null)
const viewImage = (item)=>{  
  imgViewModal.value = true
  modalImg.value = item
}

 






</script>

<style scoped>
.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px; 
}

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
