<template>
  <div>
    <ElCard class="my-4 ">
     
      <VRow>
        <VCol>
          <b> Tourist Spot {{ mode == 'update' ? 'Edit' : 'Create' }}</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'touristSpot'}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn "
          >
            Tourist Spot List
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
        <VCol cols="12" >
        <ElFormItem
          label="Link"
          prop="link"
          :rules="{
            required: true,
            message: 'link can not be empty and should be like https://www.xyz.com',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="ruleForm.link"  placeholder="https://www.xyz.com"/>

        </ElFormItem>
        </VCol>          
      </VRow>       
          

        <el-tabs
          type="card"
          class="demo-tabs"    
        >
          <VRow>
            <VCol v-for="(item, index) in ruleForm &&  ruleForm.spot ? ruleForm.spot : ruleForm.data" :key="index">
                <el-form-item  :label="index == 0 ? 'Bangla':'English'">
                <fieldset   class="rounded py-2 px-2">
                  <legend class='mx-4'> <b>  {{index == 0 ? 'Bangla':'English'}} </b> </legend>
                  <VRow>
                    <VCol cols="12" md="6"   >
                     
                    <ElFormItem
                      label="Name"                      
                      :prop="ruleForm.spot ? 'spot.' + index + '.name' : 'data.' + index + '.name'"
                      :rules="{
                        required: true,
                        message: 'name can not be empty',
                        trigger: 'blur',
                      }"
                    >
                      <ElInput v-model="item.name"  />

                    </ElFormItem>
                    </VCol>
                     <VCol cols="12" md="6"   >

                    <ElFormItem
                      label="Tagline"
                      prop="tagline"
                    >
                      <ElInput v-model="item.tag_line"  />
                    </ElFormItem>
                    </VCol>
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Distance"
                        prop="distance"
                      >
                        <ElInput v-model="item.distance"  />
                      </ElFormItem>
                    </VCol>
                   
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Foods"
                        prop="foods"
                      >
                        <ElInput v-model="item.foods"  />
                      </ElFormItem>
                    </VCol>
                    <!-- visiting_time -->
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Visiting Time"
                        prop="visiting_time"
                      >                  
                        <el-time-select
                            v-model="item.visiting_time"
                            
                            start="00:00"
                            step="00:60"
                            end="24:00"
                            placeholder="Select time"
                        />
                      </ElFormItem>
                    </VCol>
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Rides"
                        prop="rides"
                      >
                        <ElInput v-model="item.rides"  />
                      </ElFormItem>
                    </VCol>
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Fair"
                        prop="fair"
                      >
                        <ElInput v-model="item.fair"  />
                      </ElFormItem>
                    </VCol>
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Details"
                        prop="details"
                      >
                        <ElInput v-model="item.details"  />
                      </ElFormItem>
                    </VCol>
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Safety Guideline"
                        prop="safety_guideline"
                      >
                        <ElInput v-model="item.safety_guideline"  />
                      </ElFormItem>
                    </VCol>
                      <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Tourist Places"
                        prop="tourist_places"
                      >
                        <ElInput v-model="item.tourist_places"  />
                      </ElFormItem>
                    </VCol>
                    
                    
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Hazard Info"
                        prop="hazard_info"
                      >
                        <ElInput v-model="item.hazard_info"  />
                      </ElFormItem>
                    </VCol>

                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Advice"
                        prop="advice"
                      >
                        <ElInput v-model="item.advice"  />
                      </ElFormItem>
                    </VCol>

                    
                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Others Info"
                        prop="others_info"
                      >
                        <ElInput v-model="item.others_info"  />
                      </ElFormItem>
                    </VCol>

                    

                    <VCol cols="12" md="6"   >
                      <ElFormItem
                        label="Risk Factor"
                        prop="risk_factor"
                      >
                        <ElInput v-model="item.risk_factor"  />
                      </ElFormItem>
                    </VCol>
                     <VCol cols="12" >
                      <ElFormItem
                        label="Travel Info"
                        :prop="ruleForm.spot ? 'spot.' + index + '.travel_info' : 'data.' + index + '.travel_info'"
                        :rules="{
                          required: true,
                          message: 'travel_info can not be empty',
                          trigger: 'blur',
                        }"
                      >
                        <ElInput type="textarea" v-model="item.travel_info"  />
                      </ElFormItem>
                    </VCol>
                    <VCol cols="12"    >

                    <ElFormItem
                      label="Description"
                      :prop="ruleForm.spot ? 'spot.' + index + '.description' : 'data.' + index + '.description'"
                      :rules="{
                        required: true,
                        message: 'description can not be empty',
                        trigger: 'blur',
                      }"
                    >
                      <ElInput type="textarea" v-model="item.description"  />

                    </ElFormItem>
                    </VCol>
                   
                    

                    
                  </VRow>
                </fieldset>
                </el-form-item> 
            </VCol>
          </VRow>
        </el-tabs>          
          <VRow>
            <VCol cols="12" md="6" class=" my-2">
                  <ElFormItem
                    label="Single Image"
                    prop="image">
                    <el-upload
                      class="upload-section"
                      drag
                      :on-change="onFileChange"
                      :before-upload="beforeAvatarUpload"            
                    >
                      
                      <div class="el-upload__text">
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
            <VCol cols="12" md="6" class="d-flex justify-center my-2">
              <ElFormItem
                  label="Multiple Image"
                  prop="images">    
                  <el-upload
                      class="upload-demo"
                      drag
                      action="#"
                      multiple
                      :auto-upload="false"
                      :on-change="onFileChangeMultiple"
                      :before-upload="beforeAvatarUpload"
                    >
                      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                      <div class="el-upload__text">
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
          <VRow class="px-4">
                      <VCol class="btn-section text-center mt-2 d-flex flex-column justify-center align-center" cols="12" md="3" v-for="(item,index) in ruleForm.images" :key="index"> 
                              

                      <img   @click="viewImage(ruleForm.images[index].name)"  :src="item.name" alt="" height="120" width="120" class="border m-1">
                      <button
                                
                                class="dlt-btn"
                                @click.prevent="removeImage(item)"
                              >
                                <el-icon><Delete /></el-icon>
                      </button>
                              
                      </VCol>
                      <VCol class="text-center mt-2" cols="12" md="3" v-for="(item,index) in  previewMultipleImage" :key="index">
                                <img height="100" width="100" :src="item" alt="">
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
     <el-dialog
      v-model="imgViewModal"
      title="Tips"
      width="500"
     >
      <div class="text-center px-2 py-2">
        <img :src="modalImg" alt="" height="400" width="400">
      </div>
      </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from '@/utils/notification';
import { UploadFilled } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { ElMessage, type ComponentSize, type FormInstance, type FormRules } from 'element-plus';
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
const spotStore = useSpotStore()
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log("uploadFile",uploadFile)
  props.ruleForm.image = URL.createObjectURL(uploadFile.raw!)
}
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
const multpleTempImg = ref([])
const previewMultipleImage = ref([])
const onFileChangeMultiple = (file) => {  
  multpleTempImg.value.push(file.raw);  
  const reader = new FileReader()
    reader.readAsDataURL(file.raw)
    reader.onload = () => {
    
      previewMultipleImage.value.push(reader.result)
    }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
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
  console.log("multpleTempImg.value ", multpleTempImg.value)
  // multpleTempImg.value.length == 0 ? props.ruleForm.images = [] : props.ruleForm.images = multpleTempImg.value
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
   
   const updatedData = props.mode == 'update' ? props.ruleForm.spot.map(({ created_at, updated_at, ...rest }) => rest):'';


    

    if (valid) {
      // remove a key value from  array objects using map
      props.ruleForm.images.map((e)=>{
       console.log("props.ruleForm.images",  e.name )
        
      })

      
      
      let form = {
      id: props.ruleForm.id,
      image: tempImg.value ? tempImg.value : '',
      link: props.ruleForm.link,
      images: multpleTempImg.value,
      data: updatedData
      }
      const { data } = props.ruleForm.id ?  await spotStore.updateSpot( form ) : await spotStore.createSpot( props.ruleForm )
      data.status_code == 200 ? notify('Congratulations!', data.message, 'success', 'top-right',
        emit('getEmit')
      ) : ''
       router.push({name:'touristSpot'}) 
    } else {
      console.log('error submit!', fields)
    }
  })
}

const imgViewModal = ref(false)
const modalImg = ref(null)

const removeImage = async(item)=>{
  
  let arr = []
  arr.push(item.id)
  try {
    const {data} = await spotStore.deleteImage({ ids: arr })
    console.log("response", data)
    data.status_code == 200 ? notify('Warning!', data.message, 'warning', 'top-right',
      // getSpotlist()
      emit('getEmit')
    ) : ''
    
  }catch(error){
    console.log("error", error)
  }
}

const viewImage = (item)=>{  
  imgViewModal.value = true
  modalImg.value = item
}


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
