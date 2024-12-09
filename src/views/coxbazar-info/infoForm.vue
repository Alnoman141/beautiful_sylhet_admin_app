<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol cols="6">
          <b> Cox's Bazar Info </b>
        </VCol>
        <VCol cols="6" class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'info' }"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn"
          >
            Cox's Bazar Info
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
        <VCol v-for="(item, index) in ruleForm" :key="index" cols="12" md="6">
          <ElCard>
            <p>{{ index == 0 ? "Bangla" : "English" }}</p>

            <ElFormItem
              label="Cox Bazar Info"
              :prop="index + '.description'"
              :rules="{
                required: true,
                message: 'Cox bazar info is required',
                trigger: 'blur',
              }"
            >
            <div>
              <QuillEditor
                ref="coxbazarInfoEditorRef"
                v-model:content="item.description"
                content-type="html"
                theme="snow"
                toolbar="full"
                :text-change="checkData()"
              />
            </div>  
            </ElFormItem>
          </ElCard>
        </VCol>
      </VRow>

      <div class="py-4 text-center">
        <ElButton type="primary" @click="submitForm(ruleFormRef)">
          Update
        </ElButton>
      </div>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
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
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
});

const validationLock = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  //  ruleForm.value[0].description.length <= 11 || ruleForm.value[1].description.length <= 11 ? validationLock.value = true : validationLock.value = false

  // if (validationLock.value) {
  //   notify('Error!', 'Please fill all fields', 'error', 'top-right')

  //   return
  // }
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data } = await infoStore.createInfo({ data: ruleForm.value });
      data.status_code == 200
        ? (notify("Congratulations!", data.message, "success", "top-right"),
          getInfo())
        : "";
      data.status_code == 200 ? router.push({ name: "info" }) : "";
    } else {
      console.log("error submit!", fields);
    }
  });
};
const ruleForm = ref([]);
const getInfo = async () => {
  try {
    const { data } = await infoStore.editInfo();

    ruleForm.value = data.data;
  } catch (error) {
    console.log(error);
  }
};
const coxbazarInfoEditorRef = ref(null);
const checkData = () => {
  coxbazarInfoEditorRef.value?.map((e) => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  });
  ruleForm.value?.map((e) => {
    e.description == "<p><br></p>" ? (e.description = "") : "";
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
