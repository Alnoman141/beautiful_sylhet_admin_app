<template>
  <div class="my-4">
 
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
            <b> Landing Page Testimonials  </b>
            <hr>
          </VCol>
          <VCol v-for="(item, index) in ruleForm" :key="index" cols="12" md="6">
            <div class="border rounded px-4 py-4">
              <ElFormItem
                label="Name"
                :prop="index + '.name'"
                :rules="{
                  required: true,
                  message: 'Name  is required',
                  trigger: 'blur',
                }"
              >
                <ElInput :disabled="mode == 'view'" v-model="item.name" placeholder="Name" />
              </ElFormItem>

              <ElFormItem
                label="Rating"
                :prop="index + '.rating'"
                :rules="{
                  required: true,
                  message: 'Rating  is required',
                  trigger: 'blur',
                }"
              >
                <ElInput :disabled="mode == 'view'" v-model="item.rating" placeholder="Rating" />
              </ElFormItem>

              <ElFormItem
                label="Feedback "
                :prop="index + '.description'"
                :rules="{
                  required: true,
                  message: 'Feedback   is required',
                  trigger: 'blur',
                }"
              >
                <ElInput
                  type="textarea"
                  :rows="5"
                  v-model="item.description"
                  placeholder="Feedback "
                  :disabled="mode == 'view'"
                />
              </ElFormItem>
              <div class="">
                <label for="">Photo</label>
              <el-upload
                class="upload-section"
                drag
                :on-change="(file) => onFileChange(file, index)"
                :auto-upload="false"
                :disabled="mode == 'view'"
              >
                <div class="el-upload__text">
                  <el-icon
                    v-if="!item.image && !previewImage[index] && !item.imageBase64"
                    class="el-icon--upload"
                    ><upload-filled
                  /></el-icon>

                  <img
                    v-if="item.imageBase64 || previewImage[index]"
                    :src="
                      previewImage[index] ? previewImage[index] : item.imageBase64
                    "
                    alt=""
                    height="60"
                    width="60"
                    class="border mt-2"
                  />
                  
                  <br />
                  <p v-if="mode != 'view'"> Drop image here or <em>click to upload</em></p>
                </div>
                <template #tip>
                  <div class="el-upload__tip" v-if="mode != 'view'">
                    jpg/png files with a size less than 2MB <br />

                    <span
                      v-if="imgUploadValidation[index] && imgUploadValidation[index].validation == true"
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
            Next
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
const emit = defineEmits(["stepIncrement", "stepDecrement"]);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  let isValid = true;

  props.ruleForm.forEach((_, index) => {
    if (!tempImg.value[index] && !props.ruleForm[index].image && !props.ruleForm[index].imageBase64) {
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
    if (valid) {
      console.log("props.ruleForm", props.ruleForm);
      loading.value = true;
      try {
        localStorage.setItem("testimonial", JSON.stringify(props.ruleForm));
        loading.value = false;
        emit("stepIncrement", 10) 
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

const imgUploadValidation = ref(
  props.ruleForm.map(() => ({ validation: false }))
);

const previewImage = ref([]);
const tempImg = ref([]);

const onFileChange = (file, index) => {
  tempImg.value[index] = file.raw; // Store in an array using index
  props.ruleForm[index].image = file.raw;

  const reader = new FileReader();

  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewImage.value[index] = reader.result; // Store preview in an array using index
    props.ruleForm[index].imageBase64 = previewImage.value[index];
    imgUploadValidation.value[index].validation = false; // Reset validation on successful upload
  };
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
