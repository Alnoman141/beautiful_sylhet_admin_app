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
        
        <VRow>
          <VCol cols="12">
            <b > Landing Page About Contents </b>
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
                placeholder="About Title"
                :disabled="mode == 'view'"
              />
            </ElFormItem>
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
                v-model="ruleForm.description"
                placeholder="About Description"
                :disabled="mode == 'view'"
                :rows="10"
              />
            </ElFormItem>
          </VCol>
          <VCol  class="my-2">
            <label for="">About Image</label>
            <el-upload
              class="upload-section"
              drag
              :on-change="onFileChange"
              :auto-upload="false"
              :disabled="mode == 'view'"
            >
              <div class="el-upload__text">
                <el-icon
                  v-if="!ruleForm.image && !previewImage && !ruleForm.imageBase64"
                  class="el-icon--upload"
                  ><upload-filled
                /></el-icon>

                <img
                  v-if="ruleForm.imageBase64 || previewImage"
                  :src="previewImage ? previewImage : ruleForm.imageBase64"
                  alt=""
                  height="60"
                  width="60"
                  class="border mt-2"
                />
                
                <p v-if="mode != 'view'"> Drop image here or <em>click to upload</em></p>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 2MB  <br />
                  <span
                    v-if="imgUploadValidation == true"
                    style="color: #fc6767; font-size: 12px; font-weight: light"
                  >
                    Image is required and must be valid format
                  </span>
                </div>
              </template>
            </el-upload>
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
          <ElButton @click="emit('stepIncrement',4)" type="info"> Next</ElButton>
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
const emit = defineEmits(["stepIncrement", "stepDecrement","submitForm"]);
const submitForm = async (formEl: FormInstance | undefined) => {
  props.mode == "create" && !tempImg.value && props.ruleForm.imageBase64.length == 0
    ? (imgUploadValidation.value = true)
    : (imgUploadValidation.value = false);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.ruleForm.image = tempImg.value ? tempImg.value : "";

    if (valid && !imgUploadValidation.value) {
      loading.value = true;

      try {
        // localStorage.setItem("about", JSON.stringify(props.ruleForm));
          emit("submitForm");
        // console.log(JSON.parse(localStorage.getItem("header")));  // for testing
        loading.value = false;
         emit("stepIncrement", 4) 
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
    props.ruleForm.imageBase64 = previewImage.value;
  };
};

const imgViewModal = ref(false);
const modalImg = ref(null);
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
</style>
