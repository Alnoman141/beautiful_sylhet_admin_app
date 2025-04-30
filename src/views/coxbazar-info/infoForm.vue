<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b>About Cox's Bazar Edit</b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'info' }"
            
            class="create-btn"
          >
          <el-tooltip class="item" effect="dark" content="Cox's Bazar Info" placement="top-start">
           About Cox's Bazar 
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
        
        <VCol v-for="(item, index) in ruleForm" :key="index" cols="12" md="6">
          <el-card>
            <p>{{ index == 0 ? "বাংলা" : "English" }}</p>
            <hr class="my-2" />
            <ElFormItem
              :label="index == 0 ?  'কক্সবাজার সম্পর্কিত তথ্য' : 'Cox Bazar Info'"
              :prop=" index + '.description'"
              :rules="{
                required: true,
                message: index == 0 ? 'কক্সবাজার সম্পর্কিত তথ্য আবশ্যক' : 'Cox bazar info is required',
                trigger: 'blur',
              }"
            >
            <div>
              <QuillEditor
                ref="coxbazarInfoEditorRef"
                v-model="item.description"
                content-type="html"
                theme="snow"
                toolbar="full"
                :text-change="checkData()"                 
                :customClass="'customClassInfo'"
                :Placeholder="index == 0 ? 'কক্সবাজার সম্পর্কিত তথ্য' : 'Type Coxs Bazar Info here'"
              />
            </div> 
            </ElFormItem>
          </el-card>
        </VCol>
      </VRow>

      <ElCard class="my-4 ">
        <el-tooltip class="item" effect="dark" content="Update" placement="top-start">
        <ElButton type="primary" @click="submitForm(ruleFormRef)">
          Update
        </ElButton>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Back" placement="top-start">
        <ElButton @click="router.go(-1)" type="info" >Back</ElButton>
        </el-tooltip>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import QuillEditor from "@/components/quill/QuillEditor.vue";
import { useInfoStore } from "@/stores/tourism/infoStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
import { notify } from "@/utils/notification";
import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const spotStore = useSpotStore();

const infoStore = useInfoStore();
const emit = defineEmits(["tableDataEmit"]);
const route = useRoute();
const router = useRouter();

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const locationOptions = ["Home", "Company", "School"];
const rules = reactive<FormRules<RuleForm>>({
  
});

const validationLock = ref(false);
const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true
      try{
      const { data } = await infoStore.createInfo({ data: ruleForm.value });
      data.status_code == 200
        ? (notify("Congratulations!", data.message, "success", "top-right"),
          getInfo(), loading.value = false)
        : "";
        data.status_code == 200 ? router.push({ name: "info" }) : "";
      } catch (error) {
        loading.value = false
          notify(error?.response?.data?.message,  error?.response?.data?.errors ? error?.response?.data?.errors : error?.response?.data?.error ?error?.response?.data?.error : "Something went wrong", 'error', 'top-right')
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
const ruleForm = ref([]);
const getInfo = async () => {
  loading.value = true
  try {
    const { data } = await infoStore.editInfo();

    ruleForm.value = data.data;
    loading.value = false
  } catch (error) {
    console.log(error);
  }
};
const coxbazarInfoEditorRef = ref(null);
const checkData = () => {
  // coxbazarInfoEditorRef.value?.map((e) => {
  //   e.getHTML() == "<p><br></p>" || e.getHTML().length <= 13 ? e.setHTML("") : "";
  // });
  // ruleForm.value?.map((e) => {

  //   e.description == "<p><br></p>" || e.description.lenght <= 13 ? (e.description = "") : "";
  // });
   ruleForm.value.map((e) => {
    e.description == "<p><br></p>" ||
    e.description == "<h2><br></h2>" ||
    e.description == "<h3><br></h3>" ||
    e.description == "<h4><br></h4>" ||
    e.description == "<h5><br></h5>" ||
    e.description == "<h6><br></h6>" ||
    e.description == "<h1><br></h1>" ||
    e.description == "<b><br></b>" ||
    e.description == "<i><br></i>" ||
    e.description == "<u><br></u>" ||
    e.description == "<span><br></span>" ||
    e.description == "<div><br></div>" ||
    e.description == "<s><br></s>"
      ? (e.description = "")
      : "";
  });
};
onMounted(() => {
  coxbazarInfoEditorRef.value?.map((e) => e.setHTML(""));
  getInfo();
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
