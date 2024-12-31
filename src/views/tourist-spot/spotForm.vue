<template>
  <div id="spot">
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Tourist Spot {{ mode == "update" ? "Edit" : "Create" }}</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'touristSpot' }"
            class="create-btn"
          >
          <el-tooltip class="box-item" effect="dark" content="Tourist Spot List" placement="top-start">
            Tourist Spot List
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
          v-for="(item, index) in ruleForm && ruleForm.spot
            ? ruleForm.spot
            : ruleForm.data"
          :key="index"
        >
          <el-card class="rounded py-2 px-2">
            <b> {{ index == 0 ? "Bangla" : "English" }} </b>
            <hr class="my-2" />
            <VRow>
              <VCol cols="12" md="6">
                <ElFormItem
                  label="Tourist Spot Name"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: 'Tourist spot name is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Name" v-model="item.name" />
                </ElFormItem>
              </VCol>
              <VCol cols="12" md="6">
                <ElFormItem
                  label="Tagline"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.tag_line'
                      : 'data.' + index + '.tag_line'
                  "
                  :rules="{
                    required: true,
                    message: 'Tagline is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Tagline" v-model="item.tag_line" />
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Short Description"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.description'
                      : 'data.' + index + '.description'
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
                <ElFormItem
                  label="Distance"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.distance'
                      : 'data.' + index + '.distance'
                  "
                  :rules="{
                    required: true,
                    message: 'Distance is required',
                    trigger: 'blur',
                  }"
                >
                  <div>
                    <QuillEditor
                      ref="distanceEditorRef"
                      v-model:content="item.distance"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type distance here"
                    />
                  </div>
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  label="Travel Info"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.travel_info'
                      : 'data.' + index + '.travel_info'
                  "
                  :rules="{
                    required: true,
                    message: 'Travel info is required',
                    trigger: 'blur',
                  }"
                >
                  <div>
                    <QuillEditor
                      ref="travelInfoEditorRef"
                      v-model:content="item.travel_info"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type travel info here"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Visiting Time"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.visiting_time'
                      : 'data.' + index + '.visiting_time'
                  "
                  :rules="{
                    required: true,
                    message: 'Visiting time is required',
                    trigger: 'blur',
                  }"
                >
                  <div>
                    <QuillEditor
                      ref="visitingTimeEditorRef"
                      v-model:content="item.visiting_time"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type visiting time here"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Foods"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.foods'
                      : 'data.' + index + '.foods'
                  "
                >
                  <!-- <ElInput v-model="item.foods" /> -->
                  <div>
                    <QuillEditor
                      ref="foodsEditorRef"
                      v-model:content="item.foods"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type foods here"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Rides"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.rides'
                      : 'data.' + index + '.rides'
                  "
                >
                  <div>
                    <QuillEditor
                      ref="ridesEditorRef"
                      v-model:content="item.rides"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type rides here"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Tourist Places"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.tourist_places'
                      : 'data.' + index + '.tourist_places'
                  "
                >
                  <!-- <ElInput v-model="item.tourist_places" /> -->
                  <div>
                    <QuillEditor
                      ref="touristPlacesEditorRef"
                      v-model:content="item.tourist_places"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type tourist places here"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Hazard Info"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.hazard_info'
                      : 'data.' + index + '.hazard_info'
                  "
                >
                  <!-- <ElInput v-model="item.hazard_info" /> -->
                  <div>
                    <QuillEditor
                      ref="hazardInfoEditorRef"
                      v-model:content="item.hazard_info"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type hazard info here"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Advice"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.advice'
                      : 'data.' + index + '.advice'
                  "
                >
                  <!-- <ElInput v-model="item.advice" /> -->
                  <div>
                    <QuillEditor
                      ref="adviceEditorRef"
                      v-model:content="item.advice"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type advice here"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Others Info"
                  :prop="
                    ruleForm.spot
                      ? 'spot.' + index + '.others_info'
                      : 'data.' + index + '.others_info'
                  "
                >
                  <!-- <ElInput v-model="item.others_info" /> -->
                  <div>
                    <QuillEditor
                      ref="otherInfoEditorRef"
                      v-model:content="item.others_info"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      placeholder="Type others info here"
                    />
                  </div>
                </ElFormItem>
              </VCol>
            </VRow>
          </el-card>
        </VCol>
      </VRow>
      <el-card class="my-4">
        <VRow>
          <VCol cols="12" md="6" class="my-2">
            <label for=""
              ><span style="color: #fc6767">*</span> Single Image</label
            >
            <br />
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

          <VCol cols="12" md="6" class="my-2">
            <ElFormItem label="Map Link" prop="map_link">
              <ElInput
                type="url"
                placeholder="https://www.xyz.com"
                v-model="ruleForm.map_link"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6" class="my-2">
            <label for="">Multiple Image </label> <br />

            <el-upload
              class="upload-demo"
              drag
              action="#"
              multiple
              :limit="10"
              :auto-upload="false"
              :on-change="onFileChangeMultiple"
              :before-upload="beforeAvatarUpload"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 2MB
                </div>
              </template>
            </el-upload>
            <!-- </ElFormItem> -->
          </VCol>
          <VCol cols="12" md="6">
            <div v-for="(item, index) in ruleForm.link" :key="index">
              <ElFormItem
                :label="'Video Link ' + (index > 0 ? index + 1 : '')"
                :prop="'link.' + index + '.link'"
              >
                <VRow>
                  <VCol cols="10">
                    <ElInput
                      v-model="item.link"
                      placeholder="https://www.xyz.com"
                    />
                  </VCol>
                  <VCol>
                    <el-tooltip effect="dark" content="Add More" placement="top">
                    <ElButton
                      v-if="
                        (index == 0 && ruleForm.link.length == 1) ||
                        (index == ruleForm.link.length - 1 && index != 0)
                      "
                      size="small"
                      type="success"
                      @click="addLink"
                    >
                      <VIcon icon="tabler-plus" size="20" />
                    </ElButton>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="Remove" placement="top">
                    <ElButton
                      v-if="ruleForm.link.length > 1"
                      size="small"
                      type="danger"
                      @click="removeLink(index)"
                    >
                      <VIcon icon="tabler-minus" size="20" />
                    </ElButton>
                    </el-tooltip>
                  </VCol>
                </VRow>
              </ElFormItem>
            </div>
          </VCol>
        </VRow>

        <VRow class="px-4">
          <VCol
            class="btn-section text-center mt-2 d-flex flex-column justify-center align-center"
            cols="12"
            md="1"
            v-for="(item, index) in ruleForm.images"
            :key="index"
          >
            <img
              @click="viewImage(ruleForm.images[index].name)"
              :src="item.name"
              alt=""
              height="100"
              width="100"
              class="border m-1"
            />
            <button class="dlt-btn" @click.prevent="showAlert(item)">
              <!-- <el-icon><Delete /></el-icon> -->
              <VIcon icon="tabler-trash" size="20" class="text-danger" />
            </button>
          </VCol>
          <VCol
            class="btn-section text-center mt-2 d-flex flex-column justify-center align-center"
            cols="12"
            md="1"
            v-for="(item, index) in previewMultipleImage"
            :key="index"
          >
            <img height="100" width="100" :src="item" alt="" />
            <el-tooltip class="box-item" effect="dark" content="Delete" placement="top-start">
            <button class="dlt-btn" @click.prevent="remoeUploadedImage(index)">
              <VIcon icon="tabler-trash" size="20" class="text-danger" />
            </button>
            </el-tooltip>
          </VCol>
        </VRow>

        <div class="py-4 text-start">
          <el-tooltip class="box-item" effect="dark" content="Submit" placement="top-start">
          <ElButton
            class="submit-btn"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
          
            {{ mode }}
           
          </ElButton>

          <el-tooltip class="box-item" effect="dark" content="Reset" placement="top-start"></el-tooltip>
          <ElButton
            v-if="mode == 'create'"
            class="submit-btn"
            @click="resetForm(ruleFormRef)"
          >
          
            Reset
           
          </ElButton> </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="Back" placement="top-start">
          <ElButton @click="router.go(-1)" type="info" >  Back </ElButton></el-tooltip>
        </div>
      </el-card>
    </ElForm>

    <el-dialog v-model="imgViewModal" title="Tips" width="500">
      <div class="text-center px-2 py-2">
        <img :src="modalImg" alt="" height="400" width="400" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from "@/utils/notification";
import { UploadFilled } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import {
  ElMessage,
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";

import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const loading = ref(false);
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
const spotStore = useSpotStore();
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  props.ruleForm.image = URL.createObjectURL(uploadFile.raw!);
};
const previewImage = ref(null);
const tempImg = ref("");
const onFileChange = (file) => {
  tempImg.value = file.raw;

  const reader = new FileReader();

  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewImage.value = reader.result;
  };

  // file.raw.name
  //   ? (imgUploadValidation.value = false)
  //   : (imgUploadValidation.value = true);
};
const multpleTempImg = ref([]);
const previewMultipleImage = ref([]);
const onFileChangeMultiple = (file) => {
  multpleTempImg.value.push(file.raw);
  const reader = new FileReader();
  reader.readAsDataURL(file.raw);
  reader.onload = () => {
    previewMultipleImage.value.push(reader.result);
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

const remoeUploadedImage = (index) => {
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
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.mode == "create" && !tempImg.value
      ? (imgUploadValidation.value = true)
      : (imgUploadValidation.value = false);
    tempImg.value ? (props.ruleForm.image = tempImg.value) : "";
    const updatedData =
      props.mode == "update"
        ? props.ruleForm.spot.map(({ created_at, updated_at, ...rest }) => rest)
        : "";

    if (valid && !imgUploadValidation.value) {
  loading.value = true;

      let form = {
        id: props.ruleForm.id,
        image: tempImg.value ? tempImg.value : "",
        link: props.ruleForm.link,
        map_link: props.ruleForm.map_link,
        images: multpleTempImg.value,
        data: updatedData,
      };
      try{
      const { data } = props.ruleForm.id
        ? await spotStore.updateSpot(form)
        : await spotStore.createSpot(props.ruleForm);
      data.status_code == 200
        ? (notify(
            "Congratulations!",
            data.message,
            "success",
            "top-right",
            emit("getEmit")
          ),loading.value = false)
        : '';
        router.push({ name: "touristSpot" });
      }
      catch (error) {
        console.log(error);
        // notify("Warning!", 'Something went wrong', "warning", "top-right");
         notify(error?.response?.data?.message,  error?.response?.data?.errors ? error?.response?.data?.errors : error?.response?.data?.error ?error?.response?.data?.error : "Something went wrong", 'error', 'top-right')
      }
    } else {
      console.log("error submit!", fields);
    }
  });
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

const removeImage = async (item) => {
  let arr = [];
  arr.push(item.id);
  try {
    const { data } = await spotStore.deleteImage({ ids: arr });

    data.status_code == 200
      ? notify(
          "Warning!",
          data.message,
          "warning",
          "top-right",
          // getSpotlist()
          emit("getEmit")
        )
      : "";
  } catch (error) {
    console.log("error", error);
  }
};

const viewImage = (item) => {
  imgViewModal.value = true;
  modalImg.value = item;
};

const addLink = () => {
  props.ruleForm.link.push({
    link: "",
  });
};

const removeLink = (index) => {
  // props.ruleForm.link.pop();
  props.ruleForm.link.splice(index, 1);
};
// Function to reset fields

const descriptionEditorRef = ref(null);
const riskFactorEditorRef = ref(null);
const otherInfoEditorRef = ref(null);
const adviceEditorRef = ref(null);
const hazardInfoEditorRef = ref(null);
const touristPlacesEditorRef = ref(null);
const safetyGuidelineEditorRef = ref(null);
const detailsEditorRef = ref(null);
const ridesEditorRef = ref(null);
const visitingTimeEditorRef = ref(null);
const foodsEditorRef = ref(null);
const fairEditorRef = ref(null);
const travelInfoEditorRef = ref(null);
const distanceEditorRef = ref(null);
const resetForm = (formEl: FormInstance | undefined) => {
  // descriptionEditorRef.value.getHTML()
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
  riskFactorEditorRef.value?.map((e) => e.setHTML(""));
  otherInfoEditorRef.value?.map((e) => e.setHTML(""));
  adviceEditorRef.value?.map((e) => e.setHTML(""));
  hazardInfoEditorRef.value?.map((e) => e.setHTML(""));
  touristPlacesEditorRef.value?.map((e) => e.setHTML(""));
  safetyGuidelineEditorRef.value?.map((e) => e.setHTML(""));
  detailsEditorRef.value?.map((e) => e.setHTML(""));
  ridesEditorRef.value?.map((e) => e.setHTML(""));
  visitingTimeEditorRef.value?.map((e) => e.setHTML(""));
  foodsEditorRef.value?.map((e) => e.setHTML(""));
  fairEditorRef.value?.map((e) => e.setHTML(""));
  travelInfoEditorRef.value?.map((e) => e.setHTML(""));
  distanceEditorRef.value?.map((e) => e.setHTML(""));

  if (!formEl) return;
  formEl.resetFields();
  props.ruleForm.data?.map((e) => {
    e.description = null;
    e.description = null;
    e.tag_line = null;
    e.distance = null;
    e.travel_info = null;
    e.foods = null;
    e.visiting_time = null;
    e.rides = null;
    e.fair = null;
    e.details = null;
    e.safety_guideline = null;
    e.tourist_places = null;
    e.hazard_info = null;
    e.advice = null;
    e.others_info = null;
    // e.risk_factor = null;
  });
};
const checkData = () => {
  descriptionEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  riskFactorEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  otherInfoEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  adviceEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  hazardInfoEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  touristPlacesEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  safetyGuidelineEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  detailsEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  ridesEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  visitingTimeEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  foodsEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  fairEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  travelInfoEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  distanceEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  props.ruleForm.data?.map((e) => {
    e.description == "<p><br></p>" ? (e.description = "") : "";
    e.tag_line == "<p><br></p>" ? (e.tag_line = "") : "";
    e.distance == "<p><br></p>" ? (e.distance = "") : "";
    e.travel_info == "<p><br></p>" ? (e.travel_info = "") : "";
    e.foods == "<p><br></p>" ? (e.foods = "") : "";
    e.visiting_time == "<p><br></p>" ? (e.visiting_time = "") : "";
    e.rides == "<p><br></p>" ? (e.rides = "") : "";
    e.fair == "<p><br></p>" ? (e.fair = "") : "";
    e.details == "<p><br></p>" ? (e.details = "") : "";
    e.safety_guideline == "<p><br></p>" ? (e.safety_guideline = "") : "";
    e.tourist_places == "<p><br></p>" ? (e.tourist_places = "") : "";
    e.hazard_info == "<p><br></p>" ? (e.hazard_info = "") : "";
    e.advice == "<p><br></p>" ? (e.advice = "") : "";
    e.other_info == "<p><br></p>" ? (e.other_info = "") : "";
    // e.risk_factor == "<p><br></p>" ? (e.risk_factor = "") : "";
  });
};

onMounted(() => {
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
  riskFactorEditorRef.value?.map((e) => e.setHTML(""));
  otherInfoEditorRef.value?.map((e) => e.setHTML(""));
  adviceEditorRef.value?.map((e) => e.setHTML(""));
  hazardInfoEditorRef.value?.map((e) => e.setHTML(""));
  touristPlacesEditorRef.value?.map((e) => e.setHTML(""));
  safetyGuidelineEditorRef.value?.map((e) => e.setHTML(""));
  detailsEditorRef.value?.map((e) => e.setHTML(""));
  ridesEditorRef.value?.map((e) => e.setHTML(""));
  visitingTimeEditorRef.value?.map((e) => e.setHTML(""));
  foodsEditorRef.value?.map((e) => e.setHTML(""));
  fairEditorRef.value?.map((e) => e.setHTML(""));
  travelInfoEditorRef.value?.map((e) => e.setHTML(""));
  distanceEditorRef.value?.map((e) => e.setHTML(""));
});
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

.submit-btn {
  text-transform: capitalize;
}
</style>
