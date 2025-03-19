<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Announcement {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'noticeList' }"
            class="create-btn"
          >
          <el-tooltip class="item" effect="dark" content="Notice List" placement="top-start">
            Announcement List
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
          v-for="(item, index) in ruleForm && ruleForm.notice
            ? ruleForm.notice
            : ruleForm.data"
          :key="index"
          cols="12"
          md="6"
        >
          <ElCard class="rounded py-2 px-2">
            <b> {{ index == 0 ? "বাংলা" : "English" }} </b>
            <hr class="my-2" />

            <VRow>
              <VCol cols="12">
                <ElFormItem
                  :label="index == 0 ? 'ঘোষনা' : 'Announcement'"
                  :prop="
                    ruleForm.notice
                      ? 'notice.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: index == 0 ? ' ঘোষনা আবশ্যক' : 'Notice is required',
                    trigger: 'blur',
                  }"
                >
                  <!-- <ElInput v-model="item.name"  /> -->
                
                  <div>
                    <QuillEditor
                      ref="noticeEditorRef"
                      v-model="item.name"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      :text-change="checkData()"
                      :Placeholder=" index == 0 ? 'ঘোষনা লিখুন' : 'Type Announcement here'"
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
          <VCol cols="12" md="6">
            <el-upload
              class="upload-section"
              drag
              :on-change="onFileChange"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false"
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
                <!--  -->
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
          </VCol>
          <!-- expires at expiry -->

          <VCol cols="12" md="6">
            
            <ElFormItem label="Expire at" :prop="'expiry'">              
              <el-date-picker
                style="inline-size: 100%"
                v-model="ruleForm.expiry"
                type="datetime"
                placeholder="Pick a Date"
                format="YYYY/MM/DD hh:mm:ss a"
                value-format="YYYY-MM-DD hh:mm:ss a"
                 :disabled-date="disabledDate"
                
              />
            </ElFormItem>
          </VCol>
        </VRow>
        <div class="py-4">
          <el-tooltip class="item" effect="dark" content="Submit" placement="top-start">
          <ElButton
            class="submit"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            {{ mode }}
          </ElButton>
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="Reset" placement="top-start">
          <ElButton
            v-if="mode == 'create'"
            class="submit-btn"
            type="secondary"
            @click="resetForm(ruleFormRef)"
          >
            Reset
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
import QuillEditor from "@/components/quill/QuillEditor.vue";
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

const formattedDate = ref("");
const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {

  // convert date to 24h format from am pm
  const [datePart, timePart, period] = props.ruleForm.expiry ? props.ruleForm.expiry.split(' ') :'';
  let [hours, minutes, seconds] = timePart ? timePart.split(':') : '';
 
  if (props.ruleForm.expiry && period === 'pm' && hours !== '12') {
    hours = String(Number(hours) + 12);
  } else if (props.ruleForm.expiry && period === 'am' && hours === '12') {
    hours = '00';
  }
  datePart != undefined && hours != undefined && minutes != undefined && seconds != undefined ? formattedDate.value = `${datePart} ${hours}:${minutes}:${seconds}` : formattedDate.value = null;

  props.ruleForm.expiry = formattedDate.value
  
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
      expiry: formattedDate.value,
      data: props.ruleForm.notice,
    };
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    props.ruleForm.spot_parent_id = props.ruleForm.spot_parent_id;
    if (valid) {
      loading.value = true;
      try {
        const { data } = props.ruleForm.id
          ? await noticeStore.updateNotice(form)
          : await noticeStore.createNotice(props.ruleForm);
        data.status_code == 200
          ? (notify(
              "Congratulations!",
              data.message,
              "success",
              "top-right",
              3000
            ), emit("getEmit"),
              loading.value = false)
          : "";
        data.status_code == 200 ? router.push({ name: "noticeList" }) : "";
      } catch (error) {
        loading.value = false
        // notify("Error", "Something went wrong", "error", "top-right");
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
    //e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  props.ruleForm?.data?.map((e) => {
    
    // e.name == "<p><br></p>" ? (e.name = "") : "";
     e.name == "<p><br></p>" ||
    e.description == "<h2><br></h2>" ||
    e.description == "<h3><br></h3>" ||
    e.description == "<h4><br></h4>" ||
    e.description == "<h5><br></h5>" ||
    e.description == "<h6><br></h6>" ||
    e.description == "<h1><br></h1>" ||
    e.description == "<b><br></b>" ||
    e.description == "<i><br></i>" ||
    e.description == "<u><br></u>" ||
    e.description == "<span><br></span>" ||
    e.description == "<div><br></div>" ||
    e.description == "<s><br></s>"
      ? (e.description = "")
      : "";
  });
  props.ruleForm?.notice?.map((e) => {
    // e.name == "<p><br></p>" ? (e.name = "") : "";
    e.name == "<p><br></p>" ||
    e.name == "<h2><br></h2>" ||
    e.name == "<h3><br></h3>" ||
    e.name == "<h4><br></h4>" ||
    e.name == "<h5><br></h5>" ||
    e.name == "<h6><br></h6>" ||
    e.name == "<h1><br></h1>" ||
    e.name == "<b><br></b>" ||
    e.name == "<i><br></i>" ||
    e.name == "<u><br></u>" ||
    e.name == "<span><br></span>" ||
    e.name == "<div><br></div>" ||
    e.name == "<s><br></s>"
      ? (e.name = "")
      : "";
  });
};

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

const formatExpiryDate = (date) => {
  console.log("data", date);
  // convert date to 24h format from am pm
  // const [datePart, timePart, period] = date.split(' ');
  // let [hours, minutes, seconds] = timePart.split(':');
  // if (period.toLowerCase() === 'pm' && hours !== '12') {
  //   hours = String(Number(hours) + 12);
  // } else if (period.toLowerCase() === 'am' && hours === '12') {
  //   hours = '00';
  // }
  // formattedDate.value = `${datePart} ${hours}:${minutes}:${seconds}`;
  console.log("formattedDate.value 24H",formattedDate.value)

  // Convert date back to am/pm format
  // const [datePart24, timePart24] = formattedDate.value.split(' ');
  // let [hours24, minutes24, seconds24] = timePart24.split(':');
  // const period24 = Number(hours24) >= 12 ? 'PM' : 'AM';
  // hours24 = Number(hours24) % 12 || 12;
  // formattedDate.value = `${datePart24} ${hours24}:${minutes24}:${seconds24} ${period24}`;
  // console.log("formattedDate.value AM/PM",formattedDate.value)
  

  
}
const disabledDate = (time) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of the day
  return time.getTime() < today.getTime(); // Disable dates before today
};

onMounted(() => {
  console.log("props.ruleForm",props.ruleForm)
  checkData();
});
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
