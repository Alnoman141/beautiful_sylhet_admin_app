<template>
  <div>
    <ElCard class="my-4 ">
      <b> Hotel Create </b>

      
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
            label="Tourist Spot"
            prop="spot_parent_id"
          > 
          <el-select
              v-model="ruleForm.spot_parent_id"
              placeholder="Select Tourist Spot"
              size="small"
              
            >
            
              <el-option
                v-for="(item,index) in spotDropdownData"
                :key="index"
                :label="item.name"
                :value="item.id"
                
              />
            </el-select>
          </ElFormItem>
        </VCol>
         <VCol cols="12" md="6">

         
          <ElFormItem
            label="Hotel Type"
            prop="hotel_type_parent_id"
          > 
            <el-select
              v-model="ruleForm.hotel_type_parent_id"
              placeholder="Select Hotel Type"
              size="small"
              
            >
            
              <el-option
                v-for="(item,index) in hotelTypeData"
                :key="index"
                :label="item.name"
                :value="item.id"
                
              />
            </el-select>
          </ElFormItem>
        </VCol>
        <VCol cols="12" md="6">  
                 
           <ElFormItem
            label="Hotel Category"
            prop="hotel_category_parent_id"
          > 
          <el-select
              v-model="ruleForm.hotel_category_parent_id"
              placeholder="Select Hotel Type"
              size="small"
              
            >
            
              <el-option
                v-for="(item,index) in hotelCategoryData"
                :key="index"
                :label="item.name"
                :value="item.id"
                
              />
          </el-select>
          </ElFormItem> 
        </VCol>
        <VCol cols="12" md="6">
          <ElFormItem
            label="Website Link"
            prop="website_link"
          >         
            <ElInput size="small" v-model="ruleForm.website_link"  />

          </ElFormItem>
        </VCol>  
        <VCol cols="12" md="6">
          <ElFormItem
            label="Map Link"
            prop="map_link"
          >         
            <ElInput size="small" v-model="ruleForm.map_link"  />
          </ElFormItem>
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
                                
                    >
                      
                      <div class="el-upload__text" @click="viewImage(ruleForm.image)">
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
        <el-tabs
          type="card"
          class="demo-tabs"    
        >
          <el-tab-pane
            v-for="(item, index) in ruleForm && ruleForm.hotels ? ruleForm.hotels : ruleForm.data" :key="index"
            :label="index == 0 ? 'Bangla':'English'"
            :name="index == 0 ? 'Bangla':'English'"
          >
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
                      label="Description"
                      prop="description"
                    >
                      <ElInput v-model="item.description"  />

                    </ElFormItem>
                    </VCol>
                  </VRow>
                </fieldset>
          </el-tab-pane>
        </el-tabs>

          
                                
        <div class=" py-4 text-center">
          <ElButton
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            Create
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
import { useHotelCategoryStore } from "@/stores/tourism/hotelCategoryStore";
import { useHotelStore } from "@/stores/tourism/hotelStore";
import { useHotelTypeStore } from "@/stores/tourism/hotelTypeStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
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
const hotelStore = useHotelStore()
const spotStore = useSpotStore()
const categoryStore = useHotelCategoryStore()
const typeStore = useHotelTypeStore()
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const locationOptions = ['Home', 'Company', 'School']
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],  
})
const spotDropdownData = ref([])
const getSpotDropdownList = async () => {
  try{
  const { data } = await spotStore.getSpotDropdown()
  
  spotDropdownData.value = data.data
  }catch(e){
      console.log(e)
  }
  
}
const hotelCategoryData = ref([])
const getCategoryDropdownList = async () => {
  try{
  const { data } = await categoryStore.getHotelCategoryDropdown()
  
  hotelCategoryData.value = data.data
  }catch(e){
      console.log(e)
  }
  
}
const hotelTypeData = ref([])
const getTypeDropdownList = async () => {
  try{
  const { data } = await typeStore.getHotelTypeDropdown()
  
  hotelTypeData.value = data.data
  }catch(e){
      console.log(e)
  }
  
}

const submitForm = async (formEl: FormInstance | undefined) => {
  
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    let data = []
    props.mode == 'update' ? data = props.ruleForm.news : '';
    let form = {
      id: props.ruleForm.id,
      spot_parent_id: props.ruleForm.spot_parent_id,
      image: tempImg.value ? tempImg.value : '',
      hotel_type_parent_id: props.ruleForm.hotel_type_parent_id,
      hotel_category_parent_id: props.ruleForm.hotel_category_parent_id,
      link: props.ruleForm.link,
      data: props.ruleForm.hotels
    }
    props.ruleForm.image = tempImg.value ? tempImg.value : ''
    props.ruleForm.parent_spot_id = props.ruleForm.spot_parent_id
    if (valid) {
      const { data } = props.ruleForm.id ?  await hotelStore.updateHotel( form ) : await hotelStore.createHotel( props.ruleForm )
      data.status_code == 200 ? notify('Congratulations!', data.message, 'success', 'top-right',
        emit('getEmit')
      ) : ''
    } else {
      console.log('error submit!', fields)
    }
  })
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

const imgViewModal = ref(false)
const modalImg = ref(null)
const viewImage = (item)=>{  
  imgViewModal.value = true
  modalImg.value = item
}

const typeList = ref([])


 

onMounted(() => {
  getSpotDropdownList()
  getCategoryDropdownList()
  getTypeDropdownList()
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


</style>
