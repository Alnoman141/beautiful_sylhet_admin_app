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
        <b> Landing Page Video Information Preview </b>
        <VRow>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Video Url"
              :prop="'videoUrl'"
              :rules="{
                required: true,
                message: 'Video Url  is required',
                trigger: 'blur',
              }"
            >
              <ElInput
                :disabled="mode == 'view'"
                v-model="ruleForm.videoUrl"
                placeholder="Video Url"
              />
              <!-- <iframe class="my-2" height="300" width="100%" :src="ruleForm.videoUrl" allowfullscreen></iframe> -->
            </ElFormItem>
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
  // props.mode == "create" && !tempImg.value
  //   ? (imgUploadValidation.value = true)
  //   : (imgUploadValidation.value = false);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    // props.ruleForm.image = tempImg.value ? tempImg.value : "";
    //  && !imgUploadValidation.value
    if (valid) {
      loading.value = true;

      try {
        // localStorage.setItem("videoInformation", JSON.stringify(props.ruleForm));
        emit("submitForm");
        // console.log(JSON.parse(localStorage.getItem("header")));  // for testing
        loading.value = false;
        emit("stepIncrement", 9);
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
