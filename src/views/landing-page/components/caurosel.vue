<template>
  <div class="my-2">
  
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
         
        <VRow>
          <VCol cols="12">
            <b>
            Landing Page Caurosel 
          </b>
            <hr>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Title"
              :prop="'title'"
              :rules="{
                required: true,
                message: 'Title  is required',
                trigger: 'blur',
              }"
            >
              <ElInput
                type="textarea"
                v-model="ruleForm.title"
                placeholder="Caurosel Title"
                :disabled="mode == 'view'"
                rows="3"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Sub-Title"
              :prop="'subTitle'"
              :rules="{
                required: true,
                message: 'Sub-Title  is required',
                trigger: 'blur',
              }"
            >
              <ElInput
                type="textarea"
                v-model="ruleForm.subTitle"
                placeholder="Caurosel Sub-Title"
                :disabled="mode == 'view'"
                rows="3"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6" class="my-2" v-if="mode != 'view'">
            <label for="">Multiple Image  </label>
            <br />

            <el-upload
              class="upload-demo"
              drag
              action="#"
              multiple
              :limit="10"
              :auto-upload="false"
              :on-change="onFileChangeMultiple"
              :before-upload="beforeAvatarUpload"
              :disabled="multpleTempImg.length == 3 || mode == 'view'"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                <p v-if="mode != 'view'"> Drop image here or <em>click to upload</em></p>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 2MB
                  

                  <p v-if="ruleForm.logoBase64 && ruleForm.logoBase64.length == 3" style="color: #fc6767; font-size: 12px; font-weight: light" > You have already reached max image upload limit </p>

                </div>
              </template>
            </el-upload>
          </VCol>
        </VRow>
       
        <VRow class="px-4">
          <VCol
            class="btn-section text-center mt-2 d-flex flex-column justify-center align-center "
            cols="12"
            md="2"
            v-for="(item, index) in ruleForm.logoBase64"
            :key="index"
          >
          
            <img
              :src="item"
              alt=""
              height="100"
              width="100"
              class="border m-1"
            />
            <button v-if="mode != 'view'" class="dlt-btn" @click.prevent="showAlert(index)">
              <VIcon icon="tabler-trash" size="20" class="text-danger" />
            </button>
          </VCol>        
        </VRow>
      </ElCard>
      <div class="py-4" v-if="mode != 'view'">
        <!-- <el-tooltip
          class="item"
          effect="dark"
          content="Back"
          placement="top-start"
        >
          <ElButton @click="emit('stepDecrement')" type="info"> Back</ElButton>
        </el-tooltip> -->
        <el-tooltip
          class="item"
          effect="dark"
          content="Reset"
          placement="top-start"
        >
          <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)"
            >Reset</ElButton
          >
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
        <el-tooltip
          class="item"
          effect="dark"
          content="Back"
          placement="top-start"
        >
          <ElButton @click="emit('stepIncrement',2)" type="info"> Next</ElButton>
        </el-tooltip>
      </div>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import type { FormInstance, UploadProps } from "element-plus";
import { defineEmits, defineProps, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
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
const emit = defineEmits(["stepIncrement", "stepDecrement", "submitForm"]);
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
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.ruleForm.images = multpleTempImg.value ? multpleTempImg.value : "";

    if (valid) {
      loading.value = true;

      try {
        // localStorage.setItem("caurosel", JSON.stringify(props.ruleForm));
        emit("submitForm");
        // console.log(JSON.parse(localStorage.getItem("header")));  // for testing
        loading.value = false;
        emit("stepIncrement", 2);
      } catch (error) {
        loading.value = false;
        // notify("Error", "Something went wrong", "error", "top-right");
        console.log("invalid");
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};




const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// image functionality
const typeList = ref([]);
const imgUploadValidation = ref(false);
const previewImage = ref(null);
const tempImg = ref("");
const onFileChange = (file) => {
  tempImg.value = file.raw;

  const reader = new FileReader();

  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewImage.value = reader.result;
    // props.ruleForm.logoBase64 = previewImage.value;
  };
};

/*  multiple image upload section   */
const multpleTempImg = ref([]);
const previewMultipleImage = ref([]);
const onFileChangeMultiple = (file) => {
  
  multpleTempImg.value.push(file.raw);
  const reader = new FileReader();
  reader.readAsDataURL(file.raw);
  let tempBase64 = []
  reader.onload = () => {
    previewMultipleImage.value.push(reader.result);
    props.ruleForm.logoBase64 = [...props.ruleForm.logoBase64, previewMultipleImage.value];
    previewMultipleImage.value = []
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
          ? (previewMultipleImage.value.splice(index, 1),
            multpleTempImg.value.splice(index, 1))
          : "";
      },
    }
  );
};
const imgViewModal = ref(false);
const modalImg = ref(null);
const showAlert = (item) => {
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

        action == "confirm" ? removeImage(item) : "";
      },
    }
  );
};

const removeImage = async (index) => {
  
  
  // props.ruleForm.imageBase64 = previewMultipleImage.value;

  try {
    ( props.ruleForm.logoBase64.splice(index, 1));
   
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

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}
</style>
