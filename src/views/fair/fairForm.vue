<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Fare {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            v-if="$can('edit', 'fare')"
            type="primary"
            :underline="false"
            :to="{ name: 'fairList' }"
            class="create-btn"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="Fare List"
              placement="top-start"
            >
              Fare List
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
          v-for="(item, index) in ruleForm && ruleForm.fair_boards
            ? ruleForm.fair_boards
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
                  :label="index == 0 ? 'ভাড়া' : 'Fare'"
                  :prop="
                    ruleForm.fair_boards
                      ? 'fair_boards.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: index == 0 ? 'ভাড়া আবশ্যক' : 'Fare is required',
                    trigger: 'blur',
                  }"
                >
                  <!-- <ElInput
                    :placeholder="index == 0 ? 'ভাড়া' : 'Fare'"
                    v-model="item.name"
                  /> -->
                  <div>
                    <QuillEditor
                      v-model="item.name"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      :customClass="'customClass'"
                      :text-change="checkData()"
                      :Placeholder="index == 0 ? 'ভাড়া' : 'Fare'"
                    />
                  </div>
                </ElFormItem>
              </VCol>
            </VRow>
          </ElCard>
        </VCol>
      </VRow>

      <ElCard class="my-4">
        

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
import QuillEditor from "@/components/quill/QuillEditorTable.vue";
import { useBankStore } from "@/stores/tourism/bankStore";
import { useFairStore } from "@/stores/tourism/fairStore";
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
const bankStore = useBankStore();
const fairStore = useFairStore();
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
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    let form = {
      id: props.ruleForm.id,
      image: tempImg.value ? tempImg.value : null,
      spot_parent_id: props.ruleForm.spot_parent_id,
      data: props.ruleForm.fair_boards,
    };

    if (valid) {
      loading.value = true;

      try {
        const { data } = props.ruleForm.id
          ? await fairStore.updateFair(form)
          : await fairStore.createFair(props.ruleForm);
        data.status_code == 200
          ? (notify("Congratulations!", data.message, "success", "top-right"),
            emit("tableDataEmit"),
            (loading.value = false))
          : "";
        data.status_code == 200 ? router.push({ name: "fairList" }) : "";
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
  // descriptionEditorRef.value?.setHTML("");
  // instructionEditorRef.value?.map((item) => {
  //   item.setHTML("");
  // });
};
const checkData = () => {
  // descriptionEditorRef.value?.getHTML() == "<p><br></p>"
  //   ? descriptionEditorRef.value?.setHTML("")
  //   : "";

  // instructionEditorRef.value?.map((item) => {
  //   // item.setHTML("");
  //   item?.getHTML() == "<p><br></p>" ? item?.setHTML("") : "";
  // });
  props.ruleForm.fair_boards
    ? props.ruleForm.fair_boards?.map((e) => {
        e.name == "<p><br></p>" ||
        e.name == "<h1><br></h1>" ||
        e.name == "<h2><br></h2>" ||
        e.name == "<h3><br></h3>" ||
        e.name == "<h4><br></h4>" ||
        e.name == "<h5><br></h5>" ||
        e.name == "<h6><br></h6>" ||
        e.name == "<b><br></b>" ||
        e.name == "<i><br></i>" ||
        e.name == "<u><br></u>" ||
        e.name == "<span><br></span>" ||
        e.name == "<div><br></div>" ||
        e.name == "<s><br></s>"
          ? (e.name = "")
          : "";
      })
    : "";
  props.ruleForm.data?.map((e) => {
    e.name == "<p><br></p>" ||
    e.name == "<h1><br></h1>" ||
    e.name == "<h2><br></h2>" ||
    e.name == "<h3><br></h3>" ||
    e.name == "<h4><br></h4>" ||
    e.name == "<h5><br></h5>" ||
    e.name == "<h6><br></h6>" ||
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
const imgViewModal = ref(false);
const modalImg = ref(null);
const viewImage = (item) => {
  imgViewModal.value = true;
  modalImg.value = item;
};

// quill editor validation
// const descriptionEditorRef = ref(null);
// const instructionEditorRef = ref(null);
onMounted(() => {
  getSpotDropdown();
  getBankDropdown();
  // descriptionEditorRef.value.setHTML("");
  // instructionEditorRef.value?.map((item) => {
  //   item.setHTML("");
  // });
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
