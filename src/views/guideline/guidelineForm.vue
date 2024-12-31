<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Instructions Edit </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'guide-line' }"
            class="create-btn"
          >
          <el-tooltip class="box-item" effect="dark" content="Guideline List" placement="top-start">
             Instructions List
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
        <VCol v-for="(item, index) in ruleForm.data" :key="index" md="6">
          <!-- :prop="'data.' + index + '.name'" -->
          <ElCard>
            <ElFormItem
              :label="index == 0 ? 'Bangla' : 'English'"
              :prop="'data.' + index + '.name'"
              :rules="{
                required: true,
                message: 'Guideline is required',
                trigger: 'blur',
              }"
            >
              <div>
                <QuillEditor
                  ref="guidelineEditorRef"
                  v-model:content="item.name"
                  :text-change="checkData()"
                  content-type="html"
                  theme="snow"
                  toolbar="full"
                  style="min-block-size: 200px"
                  placeholder="Type Guideline here"
                />
              </div>
            </ElFormItem>
          </ElCard>
        </VCol>
      </VRow>
      <ElCard class="mt-4">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Update Instructions"
          placement="top-start"
        >
          <ElButton type="primary" @click="submitForm(ruleFormRef)">
            Submit
          </ElButton>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="Back" placement="top-start">
        <ElButton @click="router.go(-1)" type="info">Back</ElButton>
        </el-tooltip>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useGuidelineStore } from "@/stores/tourism/guidelineStore";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const loading = ref(false)
const route = useRoute();
const router = useRouter();
const quillEditor = ref(null); // Ref to the Quill editor instance

const editorOptions = {
  placeholder: "Type here...",
  theme: "snow", // Change to 'bubble' or other supported themes if needed
};

const editorDialog = ref(false);

const editData = ref({
  id: null,
  name: null,
});

const guidelineStore = useGuidelineStore();
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
  data: [
    {
      name: "",
      language_id: 1,
    },
    {
      name: "",
      language_id: 2,
    },
  ],
});

const htmlContent = ref("");

const getGuideline = async () => {
  loading.value = true
  try {
    let parameter = {
      id: route.params.id,
    };

    const { data } = await guidelineStore.editGuideline();

    editData.value = data;
    setTimeout(() => {
      quillEditor.value ? quillEditor.value.setHTML(data.data.name) : "";
    }, 1000);

    ruleForm.value.data = data.data;
    loading.value = false
  } catch (error) {
    console.log("error", error);
  }
};

const validationLock = ref(false);



const submitForm = async (formEl: FormInstance | undefined) => {
  
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    let updateMode = false;
    ruleForm.value.data.map((e) => {
      e.id ? (updateMode = true) : "";
    });
    if (valid) {
  loading.value = true;

      try {
        const { data } = updateMode
          ? await guidelineStore.updateGuideline(ruleForm.value)
          : await guidelineStore.createGuideline(ruleForm.value);
        data.status_code == 200
          ? (notify("Congratulations!", data.message, "success", "top-right"), loading.value = false)
          : "";
        router.push({ name: "guide-line" });
      } catch (error) {
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

const checkData = () => {
  guidelineEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });

  ruleForm.value.data.map((e) => {
    e.name == "<p><br></p>" ? (e.name = "") : "";
  });
};
const guidelineEditorRef = ref(null);

onMounted(() => {
  // router.value.name == "edit-guideline" ? guidelineEditorRef.value?.map((e) => e.setHTML("")) :'';
  route.name == "edit-guideline" ? getGuideline() : "";
});
</script>

<style scoped>
.create-btn {
  border-radius: 5px;
  background-color: rgb(var(--v-theme-primary));
  color: #fff;
  padding-block: 6px;
  padding-inline: 10px;
}
</style>
