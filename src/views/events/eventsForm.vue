<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Event {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>

        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'eventsList' }"
            class="create-btn"
          >
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Event List"
              placement="top-start"
            >
              Event List
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
          v-for="(item, index) in ruleForm && ruleForm.events
            ? ruleForm.events
            : ruleForm.data"
          :key="index"
          cols="12"
          md="6"
        >
          <ElCard class="rounded py-2 px-2">
            <b> {{ index == 0 ? "বাংলা" : "English" }} </b>
            <hr class="my-2" />
            <VRow>
              <VCol cols="12" md="6">
                <ElFormItem
                  :label="index == 0 ? 'ইভেন্টের নাম  ' : 'Event Name'"
                  :prop="
                    ruleForm.events
                      ? 'events.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message:
                      index == 0
                        ? 'ইভেন্টের নাম   আবশ্যক'
                        : 'Event name is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput
                    :placeholder="index == 0 ? 'ইভেন্টের নাম  ' : 'Event Name'"
                    v-model="item.name"
                  />
                </ElFormItem>
              </VCol>
              <VCol cols="12" md="6">
                <ElFormItem
                  :label="index == 0 ? 'ফোন নাম্বার' : 'Phone Number'"
                  :prop="
                    ruleForm.events
                      ? 'events.' + index + '.phone'
                      : 'data.' + index + '.phone'
                  "
                  :rules="{
                    required: true,
                    message:
                      index == 0
                        ? 'ফোন নাম্বার আবশ্যক'
                        : 'Phone number is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput
                    :placeholder="index == 0 ? 'ফোন নাম্বার' : 'Phone Number'"
                    v-model="item.phone"
                  />
                </ElFormItem>
              </VCol>
              <VCol cols="12" md="6">
                <ElFormItem
                  :label="index == 0 ? ' অবস্থান' : 'Location'"
                  :prop="
                    ruleForm.events
                      ? 'events.' + index + '.location'
                      : 'data.' + index + '.location'
                  "
                  :rules="{
                    required: true,
                    message:
                      index == 0 ? 'অবস্থান আবশ্যক' : 'Location is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput
                    :placeholder="index == 0 ? ' অবস্থান' : 'Location'"
                    v-model="item.location"
                  />
                </ElFormItem>
              </VCol>
              <VCol cols="12" md="6">
                <ElFormItem
                  :label="index == 0 ? 'সময়' : 'Time'"
                  :prop="
                    ruleForm.events
                      ? 'events.' + index + '.time'
                      : 'data.' + index + '.time'
                  "
                  :rules="{
                    required: true,
                    message: index == 0 ? 'সময় আবশ্যক' : 'Time is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput
                    :placeholder="index == 0 ? 'সময়' : 'Time'"
                    v-model="item.time"
                  />
                </ElFormItem>
              </VCol>
              <VCol cols="12" md="6">
                <ElFormItem
                  :label="index == 0 ? 'খরচ' : 'Fee'"
                  :prop="
                    ruleForm.events
                      ? 'events.' + index + '.fare'
                      : 'data.' + index + '.fare'
                  "
                >
                  <ElInput
                    :placeholder="index == 0 ? 'খরচ' : 'Fee'"
                    v-model="item.fare"
                  />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  :label="index == 0 ? 'শর্তাবলী' : 'Terms & Conditions'"
                  :prop="
                    ruleForm.events
                      ? 'events.' + index + '.terms'
                      : 'data.' + index + '.terms'
                  "
                >
                  <ElInput
                    :placeholder="
                      index == 0 ? 'শর্তাবলী' : 'Terms & Conditions'
                    "
                    type="textarea"
                    v-model="item.terms"
                  />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  :label="index == 0 ? 'বিস্তারিত' : 'Description'"
                  :prop="
                    ruleForm.events
                      ? 'events.' + index + '.description'
                      : 'data.' + index + '.description'
                  "
                >
                  <!-- <ElInput
                    placeholder="Description"
                    type="textarea"
                    v-model="item.description"
                  /> -->
                  <div>
                    <QuillEditor
                      ref="descriptionEditorRef"
                      v-model="item.description"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      :Placeholder="index == 0 ? 'বিস্তারিত' : 'Description'"
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
            <ElFormItem label="Event Expire at" :prop="'expiry'">
              <el-date-picker
                style="inline-size: 100%"
                v-model="ruleForm.expiry"
                type="datetime"
                placeholder="Pick a Date and Time"
                format="YYYY/MM/DD hh:mm:ss a"
                value-format="YYYY-MM-DD hh:mm:ss a"
                :disabled-date="disabledDate"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Event Spot"
              prop="spot_parent_id"
              :rules="[
                {
                  required: true,
                  message: 'Please select Spot',
                  trigger: 'change',
                },
              ]"
            >
              <el-select
                v-model="ruleForm.spot_parent_id"
                placeholder="Select Spot"
              >
                <el-option
                  v-for="(item, index) in spotDropdownData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6" class="my-2">
            <el-upload class="upload-section" drag :on-change="onFileChange">
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
        </VRow>
        <div class="py-4">
          <el-tooltip
            class="box-item"
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
            class="box-item"
            effect="dark"
            content="Reset"
            placement="top-start"
          >
            <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)"
              >Reset</ElButton
            >
          </el-tooltip>
          <el-tooltip
            class="box-item"
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
import QuillEditor from "@/components/quill/QuillEditor.vue";
import { useEventsStore } from "@/stores/tourism/eventsStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from "@/utils/notification";
import { UploadFilled } from "@element-plus/icons-vue";
import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { router, useRoute } from "vue-router";

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
const eventsStore = useEventsStore();
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
const formattedDate = ref("");

const imgUploadValidation = ref(false);

const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  // convert date to 24h format from am pm
  // const [datePart, timePart, period] = props.ruleForm.expiry ? props.ruleForm.expiry.split(' ') :' ';
  // let [hours, minutes, seconds] = timePart ? timePart.split(':') : '';
  // if (props.ruleForm.expiry && period.toLowerCase() === 'pm' && hours !== '12') {
  //   hours = String(Number(hours) + 12);
  // } else if (props.ruleForm.expiry && period.toLowerCase() === 'am' && hours === '12') {
  //   hours = '00';
  // }
  // formattedDate.value = `${datePart} ${hours}:${minutes}:${seconds}`;
  // convert date to 24h format from am pm
  const [datePart, timePart, period] = props.ruleForm.expiry
    ? props.ruleForm.expiry.split(" ")
    : "";
  let [hours, minutes, seconds] = timePart ? timePart.split(":") : "";

  if (props.ruleForm.expiry && period === "pm" && hours !== "12") {
    hours = String(Number(hours) + 12);
  } else if (props.ruleForm.expiry && period === "am" && hours === "12") {
    hours = "00";
  }
  datePart != undefined &&
  hours != undefined &&
  minutes != undefined &&
  seconds != undefined
    ? (formattedDate.value = `${datePart} ${hours}:${minutes}:${seconds}`)
    : (formattedDate.value = null);

  props.ruleForm.expiry = formattedDate.value;

  props.ruleForm.expiry = formattedDate.value;

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
      data: props.ruleForm.events,
    };
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    props.ruleForm.spot_parent_id = props.ruleForm.spot_parent_id;
    if (valid && !imgUploadValidation.value) {
      // const [datePart, timePart, period] = props.ruleForm.expiry
      //   ? props.ruleForm.expiry.split(" ")
      //   : "";
      // let [hours, minutes, seconds] = timePart ? timePart.split(":") : "";
      // if (props.ruleForm.expiry && period === "pm" && hours !== "12") {
      //   hours = String(Number(hours) + 12);
      // } else if (props.ruleForm.expiry && period === "am" && hours === "12") {
      //   hours = "00";
      // }
      // formattedDate.value = `${datePart} ${hours}:${minutes}:${seconds}`;
      loading.value = true;
      try {
        const { data } = props.ruleForm.id
          ? await eventsStore.updateEvents(form)
          : await eventsStore.createEvents(props.ruleForm);
        data.status_code == 200
          ? (notify("Congratulations!", data.message, "success", "top-right"),
            router.push({ name: "eventsList" }),
            (loading.value = false))
          : "";
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
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
};
const checkData = () => {
  descriptionEditorRef.value?.map((item) => {
    item.getHTML() == "<p><br></p>" ? item.setHTML("") : "";
  });
  props.ruleForm?.events?.map((e) => {
    e.description === "<p><br></p>" ? (e.description = "") : "";
  });
  props.ruleForm?.data?.map((e) => {
    e.description === "<p><br></p>" ? (e.description = "") : "";
  });
};

const disabledDate = (time) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of the day
  return time.getTime() < today.getTime(); // Disable dates before today
};

onMounted(() => {
  getSpotDropdownList();
});
</script>

<style scoped>
.submit {
  text-transform: capitalize;
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

.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}
</style>
