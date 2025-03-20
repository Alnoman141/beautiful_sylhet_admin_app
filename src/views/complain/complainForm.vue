<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Complain Reply </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'complainList' }"
            class="create-btn"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="Complain List"
              placement="top-start"
            >
              Complain List
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
      <ElCard class="my-4">
        <b> Complain Replies</b>
        
        <el-table border :data="ruleForm.replies" style="inline-size: 100%">
          <el-table-column prop="description" label="Description" >
            <template #default="scope">
              <div v-html="scope.row.description" />
            </template>
          </el-table-column>
          <el-table-column prop="image" label="Image" >
            <template #default="scope">
              <!-- {{ scope.row.image }} -->
              <!-- <img :src="scope.row.image" alt=""> -->
              <el-image
                style=" block-size: 100px;inline-size: 100px"
                :src="scope.row.image"
                fit="cover"
              ></el-image>
            </template>
            </el-table-column>
        </el-table>
      </ElCard>
      <ElCard class="my-4">
        <VRow>
          <VCol cols="12" class="my-2 text-end">
            <label for=""> Complain Status </label><br />
            <el-select
              v-model="ruleForm.status"
              clearable
              placeholder="Select"
              size="large"
              style="inline-size: 240px"
              @change="showAlert(ruleForm.status)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </VCol>
          <VCol cols="12" md="6" class="my-2">
            <label for=""> <span style="color: #f89797">*</span> Image </label>
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
                  :src="previewImage ? previewImage : ruleForm.image"
                  alt=""
                  height="60"
                  width="60"
                  class="border mt-2"
                  v-if="ruleForm.image || previewImage"
                />

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
          <VCol cols="12" md="6">
            <ElFormItem
              label="Description"
              prop="description"
              :rules="{
                required: true,
                message: 'Description is required',
                trigger: 'blur',
              }"
            >
              
              <el-input
                v-model="ruleForm.description"
                :rows="8"
                type="textarea"
                placeholder="Type Description Here"
              />
            </ElFormItem>
          </VCol>
        </VRow>

        <div class="py-4">
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
              {{ mode }}
            </ElButton>
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
            content="Back"
            placement="top-start"
          >
            <ElButton @click="router.go(-1)" type="info">Back</ElButton>
          </el-tooltip>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useBankStore } from "@/stores/tourism/bankStore";
import { useComplainCategoryStore } from "@/stores/tourism/complainCategoryStore";
import { useComplainStore } from "@/stores/tourism/complainStore";
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
const spotStore = useSpotStore();
const bankStore = useBankStore();
const complainStore = useComplainStore();
const emit = defineEmits(["getDetail"]);
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
const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.mode == "create" && !tempImg.value
      ? (imgUploadValidation.value = true)
      : (imgUploadValidation.value = false);

    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    props.ruleForm.file = tempFile.value ? tempFile.value : "";

    let form = {
      complain_id: props.ruleForm.id,
      image: tempImg.value ? tempImg.value : null,

      description: props.ruleForm.description,
    };
    if (valid && !imgUploadValidation.value) {
      loading.value = true;

      try {
        const { data } = await complainStore.replyComplain(form);

        data.status_code == 200
          ? (notify("Congratulations!", data.message, "success", "top-right"),
            emit("getDetail"),
            (loading.value = false))
          : "";
        data.status_code == 200 ? router.push({ name: "complainList" }) : "";
      } catch (error) {
        loading.value = false;
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

const spotDropdown = ref([]);
const getSpotDropdown = async () => {
  const { data } = await spotStore.getSpotDropdown();
  spotDropdown.value = data.data;
};

const complainCategoryStore = useComplainCategoryStore();
const redZoneCategoryDropdown = ref([]);
const getRedZoneCategoryDropdown = async () => {
  const { data } = await complainCategoryStore.getComplainCategory();
  redZoneCategoryDropdown.value = data.data;
};

const bankDropdown = ref([]);
const getBankDropdown = async () => {
  const { data } = await bankStore.getBankDropdown();
  bankDropdown.value = data.data;
};

// image functionality
const typeList = ref([]);

const previewImage = ref(null);
const previewFile = ref(null);
const tempImg = ref("");
const tempFile = ref("");
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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  descriptionEditorRef.value?.setHTML("");
  instructionEditorRef.value?.map((item) => {
    item.setHTML("");
  });
};
const checkData = () => {
  props.ruleForm.reds
    ? props.ruleForm.reds?.map((e) => {
        e.instruction == "<p><br></p>" ? (e.instruction = "") : "";
      })
    : "";
  props.ruleForm.data?.map((e) => {
    e.instruction == "<p><br></p>" ? (e.instruction = "") : "";
  });
  props.ruleForm.short_description == "<p><br></p>"
    ? (props.ruleForm.short_description = "")
    : "";
};
const imgViewModal = ref(false);
const modalImg = ref(null);
const viewImage = (item) => {
  imgViewModal.value = true;
  modalImg.value = item;
};

// quill editor validation
const descriptionEditorRef = ref(null);
const instructionEditorRef = ref(null);

onMounted(() => {
  // getSpotDropdown();
  // getBankDropdown();
  checkData();
  getRedZoneCategoryDropdown();
});

const options = [
  {
    value: 0,
    label: "Submitted",
  },
  {
    value: 1,
    label: "In-Progress",
  },
  {
    value: 2,
    label: "Resolved",
  },
  {
    value: 3,
    label: "Rejected",
  },
  {
    value: 4,
    label: "Review",
  },
];
const showAlert = (item) => {
  ElMessageBox.alert(
    "Are you sure that you want to change this complain status ?",
    "Confirm",
    {
      confirmButtonText: "Confirm",
      confirmButtonClass: "el-button--success",
      callback: (action) => {
        ElMessage({
          type: "info",
          message: `action: ${action}`,
        });

        action == "confirm" ? changeStatus(item) : "";
      },
    }
  );
};
const changeStatus = async (item) => {
  let form = {
    id: props.ruleForm.id,
    status: props.ruleForm.status,
  };

  // changeStatus
  try {
    const { data } = await complainStore.changeStatus(form);

    data.status_code == 200
      ? (notify("Congratulations!", data.message, "success", "top-right"),
        emit("getDetail"),
        (loading.value = false))
      : "";

    // data.status_code == 200 ? router.push({ name: "complainList" }) : "";
  } catch (error) {
    loading.value = false;
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
