<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Awareness Edit </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'awareness' }"
            class="create-btn"
          >
            <el-tooltip
              class="box-item"
              effect="dark"
              content="Awareness List"
              placement="top-start"
            >
              Awareness List
            </el-tooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <!--
      <ElForm
      label-width="auto"          
      label-position="top"
      class="py-4"
      > 
    -->
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
        <VCol v-for="(item, index) in ruleForm.data" :key="index" class="mb-5">
          <ElCard>
            <!-- <b> {{ index == 0 ? "Bangla" : "English" }} </b> -->
            <hr class="my-2" />
            <ElFormItem
              :label="index == 0 ? 'Bangla' : 'English'"
              :prop="'data.' + index + '.name'"
              :rules="{
                required: true,

                message:
                  index == 0
                    ? 'বাংলায় সতর্কতা আবশ্যক'
                    : 'Awareness in English is required',
                trigger: 'blur',
              }"
            >
              <div>
                <QuillEditor
                  v-model="item.name"
                  :text-change="checkData()"
                  content-type="html"
                  theme="snow"
                  toolbar="full"
                  style="min-block-size: 200px"
                  :Placeholder="
                    index == 0
                      ? 'বাংলায় সতর্কতা লিখুন'
                      : 'Type Awareness in English'
                  "
                  :customClass="'customClass'"
                />
              </div>
            </ElFormItem>
          </ElCard>
        </VCol>
      </VRow>

      <ElCard class="mt-4">
        <ElButton type="primary" @click="updateAwarenessData(ruleFormRef)">
          Submit
        </ElButton>
        <ElButton @click="router.go(-1)" type="info">Back</ElButton>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import QuillEditor from "@/components/quill/QuillEditor.vue";
import { useAwarenessStore } from "@/stores/tourism/awarenessStore";
import { notify } from "@/utils/notification";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const quillEditor = ref(null); // Ref to the Quill editor instance
const rules = reactive<FormRules<RuleForm>>({}); // Define rules for the form
const formSize = ref<ComponentSize>("default"); // Form size
const editorOptions = {
  placeholder: "Type here...",
  theme: "snow", // Change to 'bubble' or other supported themes if needed
};

const editorDialog = ref(false);

const editData = ref({
  id: null,
  name: null,
});

const awarenessStore = useAwarenessStore();

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
const ruleFormRef = ref<FormInstance>();
const htmlContent = ref("");

const getAwareness = async () => {
  loading.value = true;
  try {
    let parameter = {
      id: route.params.id,
    };

    const { data } = await awarenessStore.editAwareness();

    editData.value = data;
    setTimeout(() => {
      quillEditor.value ? quillEditor.value.setHTML(data.data.name) : "";
    }, 1000);

    ruleForm.value.data =
      data.data.length > 0 ? data.data : ruleForm.value.data;
    loading.value = false;
  } catch (error) {
    console.log("error", error);
  }
};

const updateAwarenessData = async (formEl: FormInstance | undefined) => {
  // updateAwareness updateAwareness
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;

      try {
        const { data } = await awarenessStore.updateAwareness(ruleForm.value);

        data.status_code == 200
          ? (notify("Congratulations!", data.message, "success", "top-right"),
            (loading.value = false))
          : "";
        data.status_code == 200 ? router.push({ name: "awareness" }) : "";
      } catch (error) {
        loading.value = false;
        // notify("error", error?.response?.data?.message)
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

        // payload send na krle o success dey
      }
    }
  });
};

const awarenessEditorRef = ref(null);

const checkData = () => {
  ruleForm.value.data.map((e) => {
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

onMounted(() => {
  getAwareness();
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
