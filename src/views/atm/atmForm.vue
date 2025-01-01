<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> ATM {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'bankList' }"
            class="create-btn"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="Bank List"
              placement="top-start"
            >
              Bank List
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
          v-for="(item, index) in ruleForm && ruleForm.atms
            ? ruleForm.atms
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
                  label="ATM Both Name"
                  :prop="
                    ruleForm.atms
                      ? 'atms.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: 'ATM both name  is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="ATM Both Name" v-model="item.name" />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  label="Address"
                  :prop="
                    ruleForm.atms
                      ? 'atms.' + index + '.address'
                      : 'data.' + index + '.address'
                  "
                  :rules="{
                    required: true,
                    message: 'ATM both Address  is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Address" v-model="item.address" />
                </ElFormItem>
              </VCol>
            </VRow>
          </ElCard>
        </VCol>
      </VRow>
      <ElCard class="my-2">
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

          <!-- bankDropdown -->
          <VCol cols="12" md="6">
            <ElFormItem
              label="Bank"
              prop="bank_parent_id"
              :rules="{
                required: true,
                message: 'Please select Tourist Spot',
                trigger: 'change',
              }"
            >
              <el-select
                v-model="ruleForm.bank_parent_id"
                placeholder="Select bank"
                prop="bank_parent_id"
                :rules="{
                  required: true,
                  message: 'Please select Bank',
                  trigger: 'change',
                }"
              >
                <el-option
                  v-for="(item, index) in bankDropdown"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6">
            <ElFormItem
              label="Map Link"
              prop="map_link"
              :rules="[
                {
                  required: true,
                  message: 'Please input Map Link',
                  trigger: 'blur',
                },
                {
                  type: 'url',
                  message: 'Please input correct URL',
                  trigger: 'blur',
                },
              ]"
            >
              <ElInput
                placeholder="Map Link"
                type="url"
                v-model="ruleForm.map_link"
              />
            </ElFormItem>
          </VCol>
          <VCol cols="12" md="6" class="my-2">
            <el-upload
              class="upload-section"
              drag
              :on-change="onFileChange"
              auto-upload="false"
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
                    Image is required and must be valid format
                  </span>
                </div>
              </template>
            </el-upload>
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
import { useAtmStore } from "@/stores/tourism/atmStore";
import { useBankStore } from "@/stores/tourism/bankStore";
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
const atmStore = useAtmStore();
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
const submitForm = async (formEl: FormInstance | undefined) => {
  props.mode == "create" && !tempImg.value
    ? (imgUploadValidation.value = true)
    : (imgUploadValidation.value = false);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    let form = {
      id: props.ruleForm.id,
      image: tempImg.value ? tempImg.value : null,
      spot_parent_id: props.ruleForm.spot_parent_id,
      bank_parent_id: props.ruleForm.bank_parent_id,
      map_link: props.ruleForm.map_link,
      data: props.ruleForm.atms,
    };
    if (valid && !imgUploadValidation.value) {
      loading.value = true;
      try {
        const { data } = props.ruleForm.id
          ? await atmStore.updateAtm(form)
          : await atmStore.createAtm(props.ruleForm);
        data.status_code == 200
          ? (notify("Congratulations!", data.message, "success", "top-right"),
            emit("tableDataEmit"),
            (loading.value = false))
          : "";
        data.status_code == 200 ? router.push({ name: "atmList" }) : "";
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
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
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

const imgViewModal = ref(false);
const modalImg = ref(null);
const viewImage = (item) => {
  imgViewModal.value = true;
  modalImg.value = item;
};

onMounted(() => {
  getSpotDropdown();
  getBankDropdown();
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
