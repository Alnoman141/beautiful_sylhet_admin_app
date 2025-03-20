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
            <b> Landing Page Header  </b>
            <hr />
          </VCol>
          <!-- <VCol
            v-for="(item, index) in ruleForm.navLinks"
            :key="index"
            cols="12"
            md="3"
          >
            <div class="border rounded px-4 py-4">
              <ElFormItem
                label="Nav Link Name"
                :prop="'navLinks.' + index + '.name'"
                :rules="{
                  required: true,
                  message: 'Nav Link name  is required',
                  trigger: 'blur',
                }"
              >
                <ElInput :disabled="mode == 'view'" v-model="item.name" placeholder="Nav Link Name" />
              </ElFormItem>
              <ElFormItem
                label="Nav Link URL"
                :prop="'navLinks.' + index + '.url'"
                :rules="{
                  required: true,
                  message: 'Nav Link url  is required',
                  trigger: 'blur',
                }"
              >
                <ElInput :disabled="mode == 'view'" v-model="item.url" placeholder="Nav Link Url" />
              </ElFormItem>
              
            </div>
          </VCol> -->
          <VCol class="my-2">
            <label for="">Logo </label>
            <el-upload
              class="upload-section"
              drag
              :on-change="onFileChange"
              :auto-upload="false"
              :disabled="mode == 'view'"
            >
              <div class="el-upload__text">
                <el-icon
                  v-if="!ruleForm.logo && !previewImage && !ruleForm.logoBase64"
                  class="el-icon--upload"
                  ><upload-filled
                /></el-icon>

                <img
                  v-if="previewImage || ruleForm.logoBase64"
                  :src="previewImage ? previewImage : ruleForm.logoBase64"
                  alt=""
                  height="60"
                  width="60"
                  class="border mt-2"
                />
                <!-- ruleForm.logoBase64 -->
                
                <p v-if="mode != 'view'">
                  Drop image here or <em>click to upload</em>
                </p>
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
          </VCol>
        </VRow>
        <!-- add more button -->
        <!-- <div v-if="ruleForm.navLinks.length != 5" class="text-end mt-2">
          <ElButton
            type="primary"
            @click="
              ruleForm.navLinks.length < 5
                ? ruleForm.navLinks.push({ name: '', url: '' })
                : ''
            "
          >
            +
          </ElButton>
        </div> -->
      </ElCard>
      <div class="py-4" v-if="mode != 'view'">
        

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
            
           Save & Next
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
const emit = defineEmits(["stepIncrement", "stepDecrement","submitForm"]);
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
  !tempImg.value &&
  props.ruleForm.logoBase64.length == 0
    ? (imgUploadValidation.value = true)
    : (imgUploadValidation.value = false);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.ruleForm.logo = tempImg.value ? tempImg.value : "";

    if (valid && !imgUploadValidation.value) {
      loading.value = true;

      try {
        // localStorage.setItem("header", JSON.stringify(props.ruleForm));
        emit("submitForm");
        // console.log(JSON.parse(localStorage.getItem("header")));  // for testing
        loading.value = false;
        // props.step = 2;
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
    props.ruleForm.logoBase64 = previewImage.value;
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
