<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Restaurant {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'restaurantList' }"
            class="create-btn"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="Restaurant List"
              placement="top-start"
            >
              Restaurant List
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
          v-for="(item, index) in ruleForm && ruleForm.restaurants
            ? ruleForm.restaurants
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
                  label="Restaurant Name"
                  :prop="
                    ruleForm.restaurants
                      ? 'restaurants.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: 'Restaurant name is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Restaurant Name" v-model="item.name" />
                </ElFormItem>
              </VCol>

              <!-- phone -->
              <VCol cols="12">
                <ElFormItem
                  label="Phone"
                  :prop="
                    ruleForm.restaurants
                      ? 'restaurants.' + index + '.phone'
                      : 'data.' + index + '.phone'
                  "
                >
                  <ElInput placeholder="Phone" v-model="item.phone" />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  label="Address"
                  :prop="
                    ruleForm.restaurants
                      ? 'restaurants.' + index + '.address'
                      : 'data.' + index + '.address'
                  "
                >
                  <ElInput placeholder="Address" v-model="item.address" />
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem label="Open Time" :prop="'open_time'">
                  <el-time-picker
                    style="inline-size: 100%"
                    v-model="item.open_time"
                    
                    placeholder="Pick a time"
                    format="hh:mm:ss a"
                    value-format="HH:mm:ss a"
                  />
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem label="Close Time" :prop="'close_time'">
                  <el-time-picker
                    style="inline-size: 100%"
                    v-model="item.close_time"
                    type="time"
                    placeholder="Pick a time"
                    format="hh:mm:ss a"
                    value-format="HH:mm:ss a"
                  />
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Description"
                  :prop="
                    ruleForm.restaurants
                      ? 'restaurants.' + index + '.description'
                      : 'data.' + index + '.description'
                  "
                  :rules="{
                    required: true,
                    message: 'description is required',
                    trigger: 'blur',
                  }"
                >
                  <div>
                    <QuillEditor
                      v-model:content="item.description"
                      ref="descriptionEditorRef"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      :text-change="checkData()"
                      placeholder="Description"
                    />
                  </div>
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  label="Facilities"
                  :prop="
                    ruleForm.restaurants
                      ? 'restaurants.' + index + '.facilities'
                      : 'data.' + index + '.facilities'
                  "
                >
                  <div>
                    <QuillEditor
                      v-model:content="item.facilities"
                      ref="facilitiesEditorRef"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      :text-change="checkData()"
                      placeholder="Facilities"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <VCol cols="12">
                <ElFormItem
                  label="Menu"
                  :prop="
                    ruleForm.restaurants
                      ? 'restaurants.' + index + '.menu'
                      : 'data.' + index + '.menu'
                  "
                >
                  <div>
                    <QuillEditor
                      v-model:content="item.menu"
                      ref="menuEditorRef"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      :text-change="checkData()"
                      placeholder="menu"
                    />
                  </div>
                </ElFormItem>
              </VCol>

              <!-- open_time -->
            </VRow>
          </ElCard>
        </VCol>
      </VRow>

      <ElCard class="my-4">
        <VRow>
          
          <VCol cols="12" md="6">
            <ElFormItem
              label="Tourist Spot"
              prop="spot_parent_id"
              :rules="{
                required: true,
                message: 'Please select Tourist Spot',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="ruleForm.spot_parent_id"
                placeholder="Select Tourist Spot"
                prop="spot_parent_id"
                :rules="{
                  required: true,
                  message: 'Please select Tourist Spot',
                  trigger: 'change',
                }"
              >
                <el-option
                  v-for="(item, index) in spotDropdown"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem label="Map Link" prop="map_link">
              <ElInput
                type="url"
                placeholder="Map Link"
                v-model="ruleForm.map_link"
              />
            </ElFormItem>
          </VCol>
          <!-- website_link -->
          <VCol cols="12" md="6">
            <ElFormItem label="Website Link" prop="website_link">
              <ElInput
                type="url"
                placeholder="Website Link"
                v-model="ruleForm.website_link"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6" class="my-2">
            <!-- <ElFormItem label="Image" prop="image"> -->
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
import { useRestaurantStore } from "@/stores/tourism/restaurantStore";
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
const restaurantStore = useRestaurantStore();
const emit = defineEmits(["tableDataEmit"]);
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
const formattedOpenTime = ref("");
const formattedCloseTime = ref("");
const submitForm = async (formEl: FormInstance | undefined) => {

  props.ruleForm.data = props.ruleForm.restaurants ? props.ruleForm.restaurants : props.ruleForm.data
  props.ruleForm.data.map((e) => {
    
    // open time
    const [timePart, period] = e.open_time ? e.open_time.split(" ") : "";
    let [hours, minutes, seconds] = timePart ? timePart.split(":") : "";

    if (e.open_time && period === "pm" && hours !== "12") {
      hours = String(Number(hours) + 12);
    } else if (e.open_time && period === "am" && hours === "12") {
      hours = "00";
    }
    hours != undefined && minutes != undefined && seconds != undefined
      ? (formattedOpenTime.value = `${hours}:${minutes}:${seconds}`)
      : (formattedOpenTime.value = null);

    e.open_time = formattedOpenTime.value;
    // close time 
    const [timePartClose, periodClose] = e.close_time
      ? e.close_time.split(" ")
      : "";
    let [hoursClose, minutesClose, secondsClose] = timePartClose
      ? timePartClose.split(":")
      : "";

    if (e.close_time && periodClose === "pm" && hoursClose !== "12") {
      hoursClose = String(Number(hoursClose) + 12);
    } else if (e.close_time && periodClose === "am" && hoursClose === "12") {
      hoursClose = "00";
    }
    hoursClose != undefined && minutesClose != undefined && secondsClose != undefined
      ? (formattedCloseTime.value = `${hoursClose}:${minutesClose}:${secondsClose}`)
      : (formattedCloseTime.value = null);

    e.close_time = formattedCloseTime.value;
    
  });

  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.mode == "create" && !tempImg.value
      ? (imgUploadValidation.value = true)
      : (imgUploadValidation.value = false);

    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    let form = {
      id: props.ruleForm.id,
      image: tempImg.value ? tempImg.value : null,
      spot_parent_id: props.ruleForm.spot_parent_id,
      map_link: props.ruleForm.map_link,
      website_link: props.ruleForm.website_link,
      data: props.ruleForm.data,
    };
    if (valid && !imgUploadValidation.value) {
      loading.value = true;

      try {
        const { data } = props.ruleForm.id
          ? await restaurantStore.updateRestaurant(form)
          : await restaurantStore.createRestaurant(props.ruleForm);
        data.status_code == 200
          ? (notify("Congratulations!", data.message, "success", "top-right"),
            emit("tableDataEmit"),
            (loading.value = false))
          : "";
        data.status_code == 200 ? router.push({ name: "restaurantList" }) : "";
      } catch (error) {
        console.log("error", error);
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

const bankDropdown = ref([]);
const getBankDropdown = async () => {
  const { data } = await bankStore.getBankDropdown();
  bankDropdown.value = data.data;
};

// image functionality
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
  descriptionEditorRef.value?.map((item) => {
    item.setHTML("");
  });
  facilitiesEditorRef.value?.setHTML("");
  facilitiesEditorRef.value?.map((item) => {
    item.setHTML("");
  });
};
const checkData = () => {
  // descriptionEditorRef.value?.getHTML() == "<p><br></p>"
  //   ? descriptionEditorRef.value?.setHTML("")
  //   : "";

  descriptionEditorRef.value?.map((item) => {
    // item.setHTML("");
    item?.getHTML() == "<p><br></p>" ? item?.setHTML("") : "";
  });
  // facilitiesEditorRef.value?.getHTML() == "<p><br></p>"
  //   ? facilitiesEditorRef.value?.setHTML("")
  //   : "";
  // props.ruleForm.restaurants
  //   ? props.ruleForm.restaurants?.map((e) => {
  //       e.instruction == "<p><br></p>" ? (e.instruction = "") : "";
  //     })
  //   : "";
  // props.ruleForm.data?.map((e) => {
  //   e.instruction == "<p><br></p>" ? (e.instruction = "") : "";
  // });

  // props.ruleForm.restaurants
  //   ? props.ruleForm.restaurants?.map((e) => {
  //       e.instruction == "<p><br></p>" ? (e.instruction = "") : "";
  //     })
  //   : "";
  // props.ruleForm.data?.map((e) => {
  //   e.instruction == "<p><br></p>" ? (e.instruction = "") : "";
  // });
  // menuEditorRef.value?.getHTML() == "<p><br></p>"
  //   ? menuEditorRef.value?.setHTML("")
  //   : "";
  // menuEditorRef.value?.map((item) => {
  //   item.getHTML() == "<p><br></p>" ? item.setHTML("") : "";
  // });
};
const imgViewModal = ref(false);
const modalImg = ref(null);
const viewImage = (item) => {
  imgViewModal.value = true;
  modalImg.value = item;
};
// quill editor validation
const descriptionEditorRef = ref(null);
const facilitiesEditorRef = ref(null);
const menuEditorRef = ref(null);
onMounted(() => {
  getSpotDropdown();

  // descriptionEditorRef.value ? descriptionEditorRef.value.setHTML("") : "";
  // descriptionEditorRef.value
  //   ? descriptionEditorRef.value?.map((item) => {
  //       item.setHTML("");
  //     })
  //   : "";
  // facilitiesEditorRef.value ? facilitiesEditorRef.value.setHTML("") : "";
  // facilitiesEditorRef.value
  //   ? facilitiesEditorRef.value?.map((item) => {
  //       item.setHTML("");
  //     })
  //   : "";
  // menuEditorRef.value ? menuEditorRef.value.setHTML("") : "";
  // menuEditorRef.value
  //   ? menuEditorRef.value?.map((item) => {
  //       item.setHTML("");
  //     })
  //   : "";
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
