<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Notice {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'noticeList' }"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn"
          >
            Notice List
          </RouterLink>
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
            v-for="(item, index) in ruleForm && ruleForm.notice
              ? ruleForm.notice
              : ruleForm.data"
            :key="index"
            cols="12"
            md="6"
          >
            <ElCard class="rounded py-2 px-2">
              
                <b> {{ index == 0 ? "Bangla" : "English" }} </b>
                <hr class="my-2" />
              
              <VRow>
                <VCol cols="12">
                  <ElFormItem
                    label="Notice"
                    :prop="
                      ruleForm.notice
                        ? 'notice.' + index + '.name'
                        : 'data.' + index + '.name'
                    "
                    :rules="{
                      required: true,
                      message: 'Notice is required',
                      trigger: 'blur',
                    }"
                  >
                    <!-- <ElInput v-model="item.name"  /> -->
                    <div>
                      <QuillEditor
                        ref="noticeEditorRef"
                        v-model:content="item.name"
                        content-type="html"
                        theme="snow"
                        toolbar="full"
                        :text-change="checkData()"
                        placeholder="Type notice here"
                      />
                    </div>
                  </ElFormItem>
                </VCol>
              </VRow>
            </ElCard>
          </VCol>
        </VRow>
        <ElCard class="my-4">
        <VRow>
          <VCol cols="12" >
            
              <el-upload
                class="upload-section"
                drag
                :on-change="onFileChange"
                :before-upload="beforeAvatarUpload"
                auto-upload="false"
              >
                <div class="el-upload__text">
                  <el-icon v-if="!ruleForm.image && !previewImage" class="el-icon--upload"
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
                    image is required and must be valid format
                  </span>
                </div>
              </template>
              </el-upload>
            
          </VCol>
        </VRow>
        <div class="py-4">
          <ElButton class="submit" type="primary" @click="submitForm(ruleFormRef)">
            {{ mode }}
          </ElButton>
          <ElButton
            v-if="mode == 'create'"
            class="submit-btn"
            type="secondary"
            @click="resetForm(ruleFormRef)"
          >
            Reset
          </ElButton>
          <ElButton @click="router.go(-1)" type="info">Back</ElButton>
        </div>
        </ElCard>
      </ElForm>
    
  </div>
</template>

<script setup lang="ts">
import { useNoticeStore } from "@/stores/tourism/noticeStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from "@/utils/notification";
import { UploadFilled } from "@element-plus/icons-vue";
import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, defineProps, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const spotStore = useSpotStore();
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
const noticeStore = useNoticeStore();
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const locationOptions = ["Home", "Company", "School"];
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
});
const imgUploadValidation = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  props.mode == "create" && !tempImg.value
    ? (imgUploadValidation.value = true)
    : (imgUploadValidation.value = false);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    let data = [];

    let form = {
      id: props.ruleForm.id,
      image: tempImg.value ? tempImg.value : null,
      spot_parent_id: props.ruleForm.spot_parent_id,

      data: props.ruleForm.notice,
    };
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    props.ruleForm.spot_parent_id = props.ruleForm.spot_parent_id;
    if (valid) {
      const { data } = props.ruleForm.id
        ? await noticeStore.updateNotice(form)
        : await noticeStore.createNotice(props.ruleForm);
      data.status_code == 200
        ? notify(
            "Congratulations!",
            data.message,
            "success",
            "top-right",
            emit("getEmit")
          )
        : "";
      data.status_code == 200 ? router.push({ name: "noticeList" }) : "";
    } else {
      console.log("error submit!", fields);
    }
  });
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


const checkData = () => {
   noticeEditorRef.value?.map((e) => {
      e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
    });
  props.ruleForm?.data?.map((e) => {
      console.log("clear",e)
      e.name == "<p><br></p>" ? (e.name = "") : "";
    });
    props.ruleForm?.notice?.map((e) => {
      e.name == "<p><br></p>" ? (e.name = "") : "";
    })
}

const typeList = ref([]);

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

const noticeEditorRef = ref(null);
const resetForm = (formEl: FormInstance | undefined) => {
  // descriptionEditorRef.value.getHTML()
  noticeEditorRef.value.map((e) => e.setHTML(""));

  if (!formEl) return;
  formEl.resetFields();
  props.ruleForm.data.map((e) => {
    e.name = null;
  });

  onMounted(() => {
    noticeEditorRef.value.map((e) => e.setHTML(""));
  });
};
</script>

<style scoped>
.submit{
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
