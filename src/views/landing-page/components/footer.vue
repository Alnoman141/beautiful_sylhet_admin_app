<template>
  <div>
    <ElForm
      ref="ruleFormRef"
      v-loading="loading"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      label-position="top"
      status-icon
    >
      <ElCard class="rounded py-2 px-2">
        <h4 class="">Landing Page Footer</h4>
        <hr />
        <VRow class="my-2">
          <VCol class="my-2" md="6">
            <label for="">
              <span style="color: #f89797">*</span> Footer Logo</label
            >
            <el-upload
              class="upload-section"
              drag
              :on-change="onLogoFileChange"
              :auto-upload="false"
              :disabled="mode == 'view'"
            >
              <div class="el-upload__text">
                <el-icon
                  v-if="!ruleForm.logo && !previewLogo && !ruleForm.logoBase64"
                  class="el-icon--upload"
                  ><upload-filled
                /></el-icon>

                <img
                  v-if="ruleForm.logoBase64 || previewLogo"
                  :src="previewLogo ? previewLogo : ruleForm.logoBase64"
                  alt=""
                  height="60"
                  width="60"
                  class="border mt-2"
                />

                <p v-if="mode != 'view'">
                  Drop image here or <em>click to upload</em>
                </p>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 2MB <br />
                  <span
                    v-if="logoUploadValidation == true"
                    style="color: #fc6767; font-size: 12px; font-weight: light"
                  >
                    Image is required and must be valid format
                  </span>
                </div>
              </template>
            </el-upload>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Description"
              :prop="'description'"
              :rules="{
                required: true,
                message: 'Description  is required',
                trigger: 'blur',
              }"
            >
              <ElInput
                type="textarea"
                :rows="5"
                v-model="ruleForm.description"
                placeholder="Description"
                :disabled="mode == 'view'"
              />
            </ElFormItem>
          </VCol>
          <VCol
            v-for="(item, index) in ruleForm.socialMedia"
            :key="index"
            cols="12"
            md="6"
          >
            <div class="border rounded px-4 py-4">
              <ElFormItem
                label="Social Media Name"
                :prop="'socialMedia.' + index + '.name'"
                :rules="{
                  required: true,
                  message: 'Social Media name  is required',
                  trigger: 'blur',
                }"
              >
                <ElInput
                  :disabled="mode == 'view'"
                  v-model="item.name"
                  placeholder="Social Media Name"
                />
              </ElFormItem>
              <ElFormItem
                label="Social Media URL"
                :prop="'socialMedia.' + index + '.url'"
                :rules="{
                  required: true,
                  message: 'Social Media URL  is required',
                  trigger: 'blur',
                }"
              >
                <ElInput
                  :disabled="mode == 'view'"
                  v-model="item.url"
                  placeholder="Social Media URL"
                />
              </ElFormItem>
              <!-- :on-change="onFileChange" -->
              <div class="mt-2">
                <label for="">Social Media Icon</label>
                <el-upload
                  class="upload-section"
                  drag
                  :on-change="(file) => onFileChange(file, index)"
                  :auto-upload="false"
                  :disabled="mode == 'view'"
                >
                  <div class="el-upload__text">
                    <el-icon
                      v-if="
                        !item.image && !previewImage[index] && !item.imageBase64
                      "
                      class="el-icon--upload"
                      ><upload-filled
                    /></el-icon>

                    <img
                      v-if="item.imageBase64 || previewImage[index]"
                      :src="
                        previewImage[index]
                          ? previewImage[index]
                          : item.imageBase64
                      "
                      alt=""
                      height="60"
                      width="60"
                      class="border mt-2"
                    />

                    <br />
                    <p v-if="mode != 'view'">
                      Drop image here or <em>click to upload</em>
                    </p>
                  </div>
                  <template #tip>
                    <div class="el-upload__tip" v-if="mode != 'view'">
                      jpg/png files with a size less than 2MB <br />

                      <span
                        v-if="imgUploadValidation[index]?.validation == true"
                        style="
                          color: #fc6767;
                          font-size: 12px;
                          font-weight: light;
                        "
                      >
                        Image is required and must be valid format
                      </span>
                    </div>
                  </template>
                </el-upload>
              </div>
            </div>
          </VCol>
          <VCol v-if="mode != 'view'" cols="12" md="6" class="my-2">
            <label for="">Tech Support Sponsor Images </label> <br />

            <el-upload
              class="upload-demo"
              drag
              action="#"
              multiple
              :limit="10"
              :auto-upload="false"
              :on-change="onFileChangeMultiple"
              :before-upload="beforeAvatarUpload"
              :disabled="
                multpleTempImg.length == 3 || route.name == 'previewLandingPage'
              "
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 2MB
                  <p
                    v-if="multpleTempImg.length == 3"
                    style="color: #fc6767; font-size: 12px; font-weight: light"
                  >
                    You have already reached maximum image upload limit
                  </p>
                </div>
              </template>
            </el-upload>
            <!-- </ElFormItem> -->
          </VCol>
        </VRow>
        <label for="">Tech Support Sponsor Images </label>
        <hr />
        <VRow class="px-4">
          <VCol
            class="btn-section text-center mt-2 d-flex flex-column justify-center align-center"
            cols="12"
            md="2"
            v-for="(item, index) in ruleForm.techSupportImagesBase64"
            :key="index"
          >
            <img
              :src="item"
              alt=""
              height="100"
              width="100"
              class="border m-1"
            />
            <button
              v-if="mode != 'view'"
              class="dlt-btn"
              @click.prevent="showAlert(index)"
            >
              <VIcon icon="tabler-trash" size="20" class="text-danger" />
            </button>
          </VCol>
        </VRow>
      </ElCard>
      <div class="py-4" v-if="mode != 'view'">
        <el-tooltip
          class="item"
          effect="dark"
          content="Back"
          placement="top-start"
        >
          <ElButton @click="emit('stepDecrement')" type="info"> Back</ElButton>
        </el-tooltip>
        

        <el-tooltip
          class="item"
          effect="dark"
          content="Submit"
          placement="top-start"
        >
          <ElButton
            class="submit"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            <!-- {{ mode }} -->
            Save
          </ElButton>
        </el-tooltip>
      </div>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { defineEmits, defineProps, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { UploadFilled } from "@element-plus/icons-vue";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  ruleForm: {
    type: Object,
    default: () => [],
  },
  mode: {
    type: String,
    default: "create",
  },
});
const emit = defineEmits(["stepIncrement", "submitForm"]);
const headerRef = ref(null);
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
});
const loading = ref(false);

const submitForm = async (formEl: FormInstance | undefined) => {
  props.mode == "create" &&
  !tempLogo.value &&
  props.ruleForm.logoBase64.length == 0
    ? (logoUploadValidation.value = true)
    : (logoUploadValidation.value = false);
  if (!formEl) return;

  let isValid = true;

  props.ruleForm.socialMedia.forEach((_, index) => {
    if (
      !tempImg.value[index] &&
      !props.ruleForm.socialMedia[index].image &&
      !props.ruleForm.socialMedia[index].imageBase64
    ) {
      imgUploadValidation.value[index] = { validation: true };
      isValid = false;
    } else {
      imgUploadValidation.value[index] = { validation: false };
    }
  });

  if (!isValid) {
    console.log("Image validation failed.");
    return;
  }

  // Proceed with form validation
  await formEl.validate(async (valid, fields) => {
    props.ruleForm.techSupportImages = multpleTempImg.value
      ? multpleTempImg.value
      : "";
    props.ruleForm.logo = tempLogo.value ? tempLogo.value : "";
    if (valid && !logoUploadValidation.value) {
      loading.value = true;
      try {
        // localStorage.setItem("footer", JSON.stringify(props.ruleForm));
        emit("submitForm");
        loading.value = false;
        //router.push({ name: "previewLandingPage" });
      } catch (error) {
        loading.value = false;
        console.log("Error submitting form");
      }
    } else {
      console.log("Form validation failed!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// image functionality
const typeList = ref([]);

// const imgUploadValidation = ref(props.ruleForm.socialMedia?.map(() => ({ validation: false })));
const imgUploadValidation = ref(
  (props.ruleForm.socialMedia || []).map(() => ({ validation: false }))
);

const previewImage = ref([]);
const tempImg = ref([]);

const onFileChange = (file, index) => {
  tempImg.value[index] = file.raw; // Store in an array using index
  props.ruleForm.socialMedia[index].image = file.raw;

  const reader = new FileReader();

  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewImage.value[index] = reader.result; // Store preview in an array using index
    props.ruleForm.socialMedia[index].imageBase64 = previewImage.value[index];
    imgUploadValidation.value[index].validation = false; // Reset validation on successful upload
  };
};

// logo image
// image functionality

const logoUploadValidation = ref(false);
const previewLogo = ref(null);
const tempLogo = ref("");
const onLogoFileChange = (file) => {
  tempLogo.value = file.raw;

  const reader = new FileReader();

  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewLogo.value = reader.result;
    props.ruleForm.logoBase64 = previewLogo.value;
  };
};

/*  multiple image upload section   */
const multpleTempImg = ref([]);
const previewMultipleImage = ref([]);
const onFileChangeMultiple = (file) => {
  multpleTempImg.value.push(file.raw);
  const reader = new FileReader();
  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewMultipleImage.value.push(reader.result);
    // props.ruleForm.techSupportImagesBase64 = previewMultipleImage.value;
    props.ruleForm.techSupportImagesBase64 = [
      ...props.ruleForm.techSupportImagesBase64,
      previewMultipleImage.value,
    ];
    previewMultipleImage.value =[]
  };
};
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

const removeUploadedImage = (index) => {
  ElMessageBox.alert(
    "Are you sure that you want to delete this image ?",
    "Delete",
    {
      confirmButtonText: "Delete",
      confirmButtonClass: "el-button--danger",
      callback: (action) => {
        ElMessage({
          type: "info",
          message: `action: ${action}`,
        });

        action == "confirm"
          ? ( props.ruleForm.techSupportImages.splice(index, 1))
          : "";
      },
    }
  );
};
const imgViewModal = ref(false);
const modalImg = ref(null);
const showAlert = (index) => {
  ElMessageBox.alert(
    "Are you sure that you want to delete this image ?",
    "Delete",
    {
      confirmButtonText: "Delete",
      confirmButtonClass: "el-button--danger",
      callback: (action) => {
        ElMessage({
          type: "info",
          message: `action: ${action}`,
        });

        action == "confirm" ? removeImage(index) : "";
      },
    }
  );
};

const removeImage = async (index) => {
 
  try {
    props.ruleForm.techSupportImagesBase64.splice(index, 1)

  } catch (error) {
    console.log("error", error);
  }
};

const viewImage = (item) => {
  imgViewModal.value = true;
  modalImg.value = item;
};
</script>

<style scoped>
.submit {
  text-transform: capitalize;
}

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}

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
</style>
