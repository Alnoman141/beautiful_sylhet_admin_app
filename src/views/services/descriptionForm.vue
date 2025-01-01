<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Description Edit </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            @click="router.go(-1)"
            to="#"
            class="create-btn"
          >
          <el-tooltip class="item" effect="dark" content="Back" placement="top-start">
             {{
              route.params.type == 1
                ? "Tourism Corporation"
                : route.params.type == 2
                ? "DC Activities"
                : route.params.type == 3
                ? "Tourist Bus Service"
                : "Kitkat Chair"
            }} List 
          </el-tooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>

    <ElForm
    v-loading="loading"
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
          cols="12"
          md="6"
          v-for="(item, index) in ruleForm.descriptions"
          :key="index"
        >
          <ElCard class="rounded py-2 px-2">
            <b> {{ index == 0 ? "Bangla" : "English" }} </b>
            <hr class="my-2" />

            <VRow>
              <VCol cols="12">
                <ElFormItem
                  label="Description"
                  :prop="
                    ruleForm.descriptions
                      ? 'descriptions.' + index + '.name'
                      : 'descriptions.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: 'Description is required',
                    trigger: 'blur',
                  }"
                >
                  <div>
                    <QuillEditor
                      ref="descriptionEditorRef"
                      v-model:content="item.name"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      style="min-block-size: 200"
                      placeholder="Type description here"
                    />
                  </div>
                </ElFormItem>
              </VCol>
              <VCol
                cols="12"
                v-if="route.params.type !== '1' && route.params.type !== '2'"
              >
                <ElFormItem
                  label="Fare"
                  :prop="
                    ruleForm.descriptions
                      ? 'descriptions.' + index + '.fare'
                      : 'descriptions.' + index + '.fare'
                  "
                >
                  <ElInput placeholder="Fare" v-model="item.fare" />
                </ElFormItem>
              </VCol>
            </VRow>
          </ElCard>
        </VCol>
      </VRow>
      <ElCard class="my-4">
        <VRow >
          <VCol cols="12" md="6" v-if="route.params.type == '1' || route.params.type == '2'">
            <ElFormItem label="Website Link" prop="link">
              <ElInput placeholder="Website Link" v-model="ruleForm.link" />
            </ElFormItem>
          </VCol>
           <VCol cols="12" md="6" class="my-2" v-if="route.params.type == '3' ">
           
            <label for=""> <span style="color: #f89797">*</span> Image </label>
            <el-upload
              class="upload-section"
              drag
              :on-change="onFileChange"
              :before-upload="beforeAvatarUpload"
              auto-upload="false"
            >
              <div class="el-upload__text">
                <el-icon
                  v-if="!ruleForm.image && !previewImage"
                  class="el-icon--upload"
                  ><upload-filled
                /></el-icon>
                <img
                  :src="previewImage ? previewImage : ruleForm.image"
                  alt=""
                  height="60"
                  width="60"
                  class="border mt-2"
                  v-if="ruleForm.image || previewImage"
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
          <el-tooltip class="item" effect="dark" content="Back" placement="top-start">
          <ElButton
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="submit"
          >
            Update
          </ElButton>
</el-tooltip>
<el-tooltip class="item" effect="dark" content="Back" placement="top-start">
          <ElButton @click="router.go(-1)" type="info">Back</ElButton>
          </el-tooltip>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useServiceStore } from "@/stores/tourism/serviceStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { UploadFilled } from "@element-plus/icons-vue";

import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const emit = defineEmits(["getEmit"]);
const route = useRoute();
const router = useRouter();
const ruleForm = ref({
  type: route.params.type,
  link: "",
  image:'',
  descriptions: [
    { name: "", language_id: 1, fare: null },
    { name: "", language_id: 2, fare: null },
  ],
});
const serviceStore = useServiceStore();
const spotStore = useSpotStore();
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const locationOptions = ["Home", "Company", "School"];
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
const getDescriptonData = async () => {
  loading.value = true
  try {
    const { data } = await serviceStore.getDescription({
      type: route.params.type,
    });
    ruleForm.value = data.data;
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error);
  }
};

const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      ruleForm.value.image = tempImg.value ? tempImg.value :''
      try {
        const { data } = await serviceStore.updateDescription(ruleForm.value);
        data.status_code == 200
          ? (notify(
              "Congratulations!",
              data.message,
              "success",
              "top-right",
              emit("getEmit")
            ),
            loading.value = false)
          : "";

        route.params.type == 1
          ? router.push({ name: "tourismHelpline" })
          : route.params.type == 2
          ? router.push({ name: "dcHelpline" })
          : route.params.type == 3
          ? router.push({ name: "busService" })
          : router.push({ name: "kitkatChair" });
      } catch (error) {
        notify(
          error?.response?.data?.message,
          error?.response?.data?.errors
            ? error?.response?.data?.errors
            : error?.response?.data?.error
            ? error?.response?.data?.error
            : "Something went wrong",
          "error",
          "top-right"
        );
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const typeList = ref([]);

const descriptionEditorRef = ref();
onMounted(() => {
  getSpotDropdownList();
  getDescriptonData();
});

// add supervisor number

const checkData = () => {
  descriptionEditorRef.value?.map((e) => {
    console.log("e", e.getHTML());

    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
    console.log("e", e.getHTML());
  });
  ruleForm.value.descriptions
    ? ruleForm.value.descriptions?.map((e) =>
        e.name == "<p><br></p>" ? (e.name = "") : ""
      )
    : ruleForm.value.descriptions?.map((e) =>
        e.name == "<p><br></p>" ? (e.name = "") : ""
      );
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
  checkData();
};

// image functionality


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
