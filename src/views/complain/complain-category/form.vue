<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Complain Category {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'complainCategoryList' }"
            class="create-btn"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="Complain Category List"
              placement="top-start"
            >
              Complain Category List
            </el-tooltip>
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    
    <ElForm
      ref="ruleFormRef"
      v-loading="loading"
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
          v-for="(item, index) in ruleForm && ruleForm.categories
            ? ruleForm.categories
            : ruleForm.data"
          :key="index"
        >
          <ElCard class="rounded py-2 px-2">
            <b> {{ index == 0 ? "বাংলা" : "English" }} </b>
            <hr class="my-2" />
            <VRow>
              <VCol cols="12">
                <ElFormItem
                  :label=" index == 0 ? 'কমপ্লেইন ক্যাটেগরি ' : 'Complain Category Name'"
                  :prop="
                    ruleForm.categories
                      ? 'categories.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: index == 0 ? 'কমপ্লেইন ক্যাটেগরি  আবশ্যক' : 'Complain category is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput
                    v-model="item.name"
                    :placeholder=" index == 0 ? 'কমপ্লেইন ক্যাটেগরি ' : 'Complain Category name'"
                  />
                </ElFormItem>
              </VCol>
            </VRow>
          </ElCard>
        </VCol>
      </VRow>

      <ElCard class="my-4">
        <el-tooltip
          class="item"
          effect="dark"
          content="Complain Category List"
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
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useComplainCategoryStore } from "@/stores/tourism/complainCategoryStore";
import { notify } from "@/utils/notification";
import {
    type ComponentSize,
    type FormInstance,
    type FormRules,
} from "element-plus";
import { defineEmits, defineProps, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
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

const complainCategoryStore = useComplainCategoryStore();
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
    let form = {
      id: props.ruleForm.idcategory,
      data: props.ruleForm.categories,
    };
    if (valid) {
      loading.value = true;

      try {
        const { data } = props.ruleForm.id
          ? await complainCategoryStore.updateComplainCategory(form)
          : await complainCategoryStore.createComplainCategory(props.ruleForm);
        data.status_code == 200
          ? (notify(
              "Congratulations!",
              data.message,
              "success",
              "top-right",
              3000
            ),
            (loading.value = false))
          : "";
        router.push({ name: "complainCategoryList" });
      } catch (error) {
        loading.value = false
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
const typeList = ref([]);
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
