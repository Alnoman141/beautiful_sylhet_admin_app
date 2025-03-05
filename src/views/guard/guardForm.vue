<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Guard {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'guardList' }"
            class="create-btn"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="Guard List"
              placement="top-start"
            >
              Guard List
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
          v-for="(item, index) in ruleForm && ruleForm.guards
            ? ruleForm.guards
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
                  :label=" index == 0 ? 'নাম' : 'Name'"
                  :prop="
                    ruleForm.guards
                      ? 'guards.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: index == 0 ? 'বিচ গার্ডের নাম আবশ্যক' : 'Beach Guard name  is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Name" v-model="item.name" />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  :label=" index == 0 ? 'ফোন নাম্বার' : 'Phone Number'"
                  :prop="
                    ruleForm.guards
                      ? 'guards.' + index + '.phone'
                      : 'data.' + index + '.phone'
                  "
                  :rules="{
                    required: true,
                    message: index == 0 ? 'ফোন নাম্বার আবশ্যক' : '  phone number  is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput :placeholder=" index == 0 ? 'ফোন নাম্বার' : 'Phone Number'" v-model="item.phone" />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  :label=" index == 0 ? 'নির্দেশিকা' : 'Instruction'"
                  :prop="
                    ruleForm.guards
                      ? 'guards.' + index + '.instruction'
                      : 'data.' + index + '.instruction'
                  "
                >
                  <!-- <ElInput type="textarea" v-model="item.instruction" /> -->
                  <div>
                    <QuillEditor
                      ref="instructionEditorRef"
                      v-model="item.instruction"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      :Placeholder=" index == 0 ? 'নির্দেশিকা লিখুন' : 'Type instruction here'"
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
          <!-- reset button -->
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
import { useGuardStore } from "@/stores/tourism/guardStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from "@/utils/notification";
import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const spotStore = useSpotStore();

const guardStore = useGuardStore();
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


const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
 
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    props.ruleForm.image = tempImg.value ? tempImg.value : "";
    let form = {
      id: props.ruleForm.id,
      // image: tempImg.value ? tempImg.value : null,
      spot_parent_id: props.ruleForm.spot_parent_id,
      data: props.ruleForm.guards,
    };
    if (valid) {
       loading.value = true;
      try {
        const { data } = props.ruleForm.id
          ? await guardStore.updateGuard(form)
          : await guardStore.createGuard(props.ruleForm);
        data.status_code == 200
          ? (notify("Congratulations!", data.message, "success", "top-right"),
            emit("tableDataEmit"), loading.value = false)
          : "";
        data.status_code == 200 ? router.push({ name: "guardList" }) : "";
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
      loading.value = false;
      console.log("error submit!", fields);
    }
  });
};
const instructionEditorRef = ref(null);
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  instructionEditorRef.value?.map((e) => e.setHTML(""));
};

const spotDropdown = ref([]);
const getSpotDropdown = async () => {
  const { data } = await spotStore.getSpotDropdown();
  spotDropdown.value = data.data;
};

const bankDropdown = ref([]);

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
