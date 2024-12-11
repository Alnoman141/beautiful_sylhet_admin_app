<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Campaign {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'campaignList' }"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn"
          >
            Campaign List
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
          v-for="(item, index) in ruleForm && ruleForm.campaigns
            ? ruleForm.campaigns
            : ruleForm.data"
          :key="index"
          cols="12"
          md="6"
        >
          <ElCard class="py-2 px-2">
            <b> {{ index == 0 ? "Bangla" : "English" }} </b>

            <VRow>
              <VCol cols="12">
                <ElFormItem label="Campaign Name"  :prop="
                    ruleForm.campaigns
                      ? 'campaigns.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: 'Campaign name is required',
                    trigger: 'blur',
                  }">
                  <ElInput placeholder="Enter campaign name" v-model="item.name" />
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem label="Description"  :prop="
                    ruleForm.campaigns
                      ? 'campaigns.' + index + '.description'
                      : 'data.' + index + '.description'
                  "
                  :rules="{
                    required: true,
                    message: 'Description  is required',
                    trigger: 'blur',
                  }">
                  <!-- <ElInput type="textarea" v-model="item.description" /> -->
                  <div>
                  <QuillEditor
                      ref="descriptionEditorRef"
                      v-model:content="item.description"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type description here"
                    />
                    </div>

                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem label="Date"  :prop="
                    ruleForm.campaigns
                      ? 'campaigns.' + index + '.date'
                      : 'data.' + index + '.date'
                  "
                  :rules="{
                    required: true,
                    message: 'Date  is required',
                    trigger: 'blur',
                  }">
                  <!-- <ElInput type="textarea" v-model="item.description" /> -->
                  <div>
                  <QuillEditor
                      ref="dateEditorRef"
                      v-model:content="item.date"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type Date here"
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
          <VCol cols="12" md="6" class="my-2">
            <el-upload
              class="upload-section"
              drag
              :on-change="onFileChange"
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
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon> <br />
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
          <ElButton type="primary" @click="submitForm(ruleFormRef)">
            {{ mode }}
          </ElButton>
          <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)">Reset</ElButton>
          <ElButton @click="router.go(-1)" type="info" >Back</ElButton>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useCampaignStore } from "@/stores/tourism/campaignStore";
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
const campaignStore = useCampaignStore();
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

      data: props.ruleForm.campaigns,
    };
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    props.ruleForm.spot_parent_id = props.ruleForm.spot_parent_id;
    if (valid && !imgUploadValidation.value) {
      const { data } = props.ruleForm.id
        ? await campaignStore.updateCampaign(form)
        : await campaignStore.createCampaign(props.ruleForm);
      data.status_code == 200
        ? notify(
            "Congratulations!",
            data.message,
            "success",
            "top-right",
            emit("getEmit")
          )
        : "";
      data.status_code == 200 ? router.push({ name: "campaignList" }) : "";
    } else {
      console.log("error submit!", fields);
    }
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
const descriptionEditorRef = ref(null);
const dateEditorRef = ref(null)
const checkData = () => {
  descriptionEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
    
  })
  dateEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  })
  props.ruleForm.data?.map((e) => {
    e.description == "<p><br></p>" ? (e.description = "") : "";
    e.date == "<p><br></p>" ? (e.date = "") : "";
  })
  props.ruleForm.campaigns?.map((e) => {
    e.description == "<p><br></p>" ? (e.description = "") : "";
    e.date == "<p><br></p>" ? (e.date = "") : "";
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
  dateEditorRef.value?.map((e) => e.setHTML(""));
  props.ruleForm.map((e) => {
    e.description = ""
   e.date=""
  })
}
onMounted(() => {
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
  dateEditorRef.value?.map((e) => e.setHTML(""));
})
</script>

<style scoped>
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
