<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Hotel {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'hotelList' }"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            class="create-btn"
          >
            Hotel List</RouterLink
          >
        </VCol>
      </VRow>
    </ElCard>

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
        <VCol
          v-for="(item, index) in ruleForm && ruleForm.hotels
            ? ruleForm.hotels
            : ruleForm.data"
          :key="index"
          cols="12"
          md="6"
        >
          <ElCard class="rounded py-2 my-4">
            <b> {{ index == 0 ? "Bangla" : "English" }} </b>
            <hr class="my-2">

            <VRow>
              <VCol cols="12" md="6">
                <ElFormItem
                  label="Hotel Name"
                  :prop="
                    ruleForm.hotels
                      ? 'hotels.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: 'Hotel name is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Hotel Name" v-model="item.name" />
                </ElFormItem>
              </VCol>
              <VCol cols="12" md="6">
                <ElFormItem
                  label="Phone No"
                  :prop="
                    ruleForm.hotels
                      ? 'hotels.' + index + '.phone'
                      : 'data.' + index + '.phone'
                  "
                  :rules="{
                    required: true,
                    message: 'Phone number is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Phone No" v-model="item.phone" />
                </ElFormItem>
              </VCol>
              <VCol cols="12" >
                <ElFormItem label="Address"  :prop="
                    ruleForm.hotels
                      ? 'hotels.' + index + '.address'
                      : 'data.' + index + '.address'
                  " >
                  <!-- :rules="[{ required: true, message: 'address is required', trigger: 'blur' }]" -->
                  <!-- <ElInput placeholder="Address" v-model="item.address" /> -->
                   <div>
                   <QuillEditor
                      ref="addressEditorRef"
                      v-model:content="item.address"                     
                      content-type="html"
                      theme="snow"
                      :text-change="checkData()"
                      toolbar="full"
                      placeholder="Type address here"
                    />
                    </div>
                </ElFormItem>
              </VCol>
              <VCol cols="12" >
                <ElFormItem label="Description"  :prop="
                    ruleForm.hotels
                      ? 'hotels.' + index + '.description'
                      : 'data.' + index + '.description'
                  ">
                  <!-- <ElInput
                    placeholder="Description"
                    v-model="item.description"
                  /> -->
                  <div>
                   <QuillEditor
                      ref="descriptionEditorRef"
                      v-model:content="item.description"                     
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type Description here"
                    />
                    </div>
                </ElFormItem>
              </VCol>
            </VRow>
          </ElCard>
        </VCol>
      </VRow>

      <ElCard>
        <VRow>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Tourist Spot"
              prop="spot_parent_id"
              :rules="{
                required: true,
                message: 'Please select Tourist Spot',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="ruleForm.spot_parent_id"
                placeholder="Select Tourist Spot"
                prop="spot_parent_id"
                :rules="{
                  required: true,
                  message: 'Please select Tourist Spot',
                  trigger: 'change',
                }"
              >
                <el-option
                  v-for="(item, index) in spotDropdownData"
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
              :rules="{
                required: true,
                message: 'Please select hotel type',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="ruleForm.hotel_type_parent_id"
                placeholder="Select Hotel Type"
                prop="hotel_type_parent_id"
                :rules="{
                  required: true,
                  message: 'Please select Hotel Type',
                  trigger: 'change',
                }"
              >
                <el-option
                  v-for="(item, index) in hotelTypeData"
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
              :rules="{
                required: true,
                message: 'Please select hotel Category',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="ruleForm.hotel_category_parent_id"
                placeholder="Select Hotel Category"
              >
                <el-option
                  v-for="(item, index) in hotelCategoryData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem label="Website Link" prop="website_link">
              <ElInput
                placeholder="Website Link"
                type="url"
                v-model="ruleForm.website_link"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Map Link"
              prop="map_link"
              
            >
              <ElInput
                placeholder="Map Link"
                type="url"
                v-model="ruleForm.map_link"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6" class="my-2">
            <!-- <ElFormItem label="Image" prop="image"> -->
            <label for=""
              ><span style="color: #fc6767">*</span> Hotel Image</label
            >
            <br />
            <el-upload
              class="upload-section"
              drag
              :on-change="onFileChange"
              :before-upload="beforeAvatarUpload"
            >
              <div class="el-upload__text">
                <el-icon
                  v-if="!ruleForm.image && !previewImage"
                  class="el-icon--upload"
                  ><upload-filled
                /></el-icon>
                <img
                  v-if="ruleForm.image || previewImage"
                  :src="previewImage ? previewImage : ruleForm.image"
                  alt=""
                  height="60"
                  width="60"
                  class="border mt-2"
                />
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                <br />
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 2MB <br />
                  <span
                    v-if="imgUploadValidation == true"
                    style="color: #fc6767; font-size: 12px; font-weight: light"
                  >
                    Image is required and must be valid format
                  </span>
                </div>
              </template>
            </el-upload>
            <!-- </ElFormItem> -->
          </VCol>
        </VRow>
        <div class="py-4">
          <ElButton
            class="submit"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            {{ mode }}
          </ElButton>
          <!-- reset button -->
          <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)">Reset</ElButton>
          <!-- back  -->
          <ElButton @click="router.go(-1)" type="info" >Back</ElButton>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useHotelCategoryStore } from "@/stores/tourism/hotelCategoryStore";
import { useHotelStore } from "@/stores/tourism/hotelStore";
import { useHotelTypeStore } from "@/stores/tourism/hotelTypeStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from "@/utils/notification";
import { UploadFilled } from "@element-plus/icons-vue";
import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const emit = defineEmits(["getEmit"]);
const route = useRoute();
const router = useRouter();
const props = defineProps({
  ruleForm: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    default: "create",
  },
});
const hotelStore = useHotelStore();
const spotStore = useSpotStore();
const categoryStore = useHotelCategoryStore();
const typeStore = useHotelTypeStore();
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
});
const spotDropdownData = ref([]);
const getSpotDropdownList = async () => {
  try {
    const { data } = await spotStore.getSpotDropdown();

    spotDropdownData.value = data.data;
  } catch (e) {
    console.log(e);
  }
};
const hotelCategoryData = ref([]);
const getCategoryDropdownList = async () => {
  try {
    const { data } = await categoryStore.getHotelCategoryDropdown();

    hotelCategoryData.value = data.data;
  } catch (e) {
    console.log(e);
  }
};
const hotelTypeData = ref([]);
const getTypeDropdownList = async () => {
  try {
    const { data } = await typeStore.getHotelTypeDropdown();

    hotelTypeData.value = data.data;
  } catch (e) {
    console.log(e);
  }
};
const imgUploadValidation = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  props.mode == "create" && !tempImg.value
    ? (imgUploadValidation.value = true)
    : (imgUploadValidation.value = false);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    let data = [];
    props.mode == "update" ? (data = props.ruleForm.news) : "";
    let form = {
      id: props.ruleForm.id,
      spot_parent_id: props.ruleForm.spot_parent_id,
      image: tempImg.value ? tempImg.value : "",
      hotel_type_parent_id: props.ruleForm.hotel_type_parent_id,
      hotel_category_parent_id: props.ruleForm.hotel_category_parent_id,
      link: props.ruleForm.link,
      map_link:props.ruleForm.map_link,
      data: props.ruleForm.hotels,

    };
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    props.ruleForm.parent_spot_id = props.ruleForm.spot_parent_id;
    if (valid && !imgUploadValidation.value) {
      const { data } = props.ruleForm.id
        ? await hotelStore.updateHotel(form)
        : await hotelStore.createHotel(props.ruleForm);
      data.status_code == 200
        ? notify(
            "Congratulations!",
            data.message,
            "success",
            "top-right",
            emit("getEmit")
          )
        : "";
      router.push({ name: "hotelList" });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const previewImage = ref(null);
const tempImg = ref("");
const onFileChange = (file) => {
  tempImg.value = file.raw;

  const reader = new FileReader();

  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewImage.value = reader.result;
  };
};

const imgViewModal = ref(false);
const modalImg = ref(null);
const viewImage = (item) => {
  imgViewModal.value = true;
  modalImg.value = item;
};
const descritionEditorRef = ref(null);
const addressEditorRef = ref(null);
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
  addressEditorRef.value?.map((e) => e.setHTML(""));
};
const checkData = () => {
  addressEditorRef.value?.map((e) => {
    e.getHTML == "<p><br></p>" ? e.setHTML("") : "";
  });
  props.ruleForm?.hotels?.map((e) => {
    e.address === "<p><br></p>" ? (e.address = "") : "";
  })
  props.ruleForm?.data?.map((e) => {
    e.address ==="<p><br></p>" ? (e.address = "") : "";
  })
}
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/jpg"
  ) {
    ElMessage.error("Avatar picture must be JPG / JPEG / PNG format!");
    imgUploadValidation.value = true;
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");

    return false;
  }

  return true;
};
const typeList = ref([]);

onMounted(() => {
  getSpotDropdownList();
  getCategoryDropdownList();
  getTypeDropdownList();
  addressEditorRef.value?.map((e) => e.setHTML(""));

});
</script>

<style scoped>
.upload-section {
  display: block;
  text-align: center;
}

.dlt-btn {
  position: relative;
  display: none;
  border-radius: 50%;
  background-color: white;
  block-size: 30px;
  inline-size: 30px;
  inset-block-start: -25%;
  opacity: 0.8;

  /* transition: 0.3s; */
}

.btn-section:hover .dlt-btn {
  display: block;
}

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}

.submit {
  text-transform: capitalize;
}
</style>
