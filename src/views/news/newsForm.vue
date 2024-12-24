<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Tourist Spot {{ mode == "update" ? "Edit" : "Create" }}</b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'newsList' }"
            
            class="create-btn"
          >
            News List
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
        <VCol
          v-for="(item, index) in ruleForm && ruleForm.news
            ? ruleForm.news
            : ruleForm.data"
          :key="index"
          cols="12"
          md="6"
        >
          <!-- <fieldset class="rounded py-2 px-2"> -->
          <ElCard class="my-4">
            <b> {{ index == 0 ? "Bangla" : "English" }} </b>
            <hr class="my-2" />
            <VRow>
              <VCol cols="12">
                <ElFormItem
                  label="News Title"
                  :prop="
                    ruleForm.news
                      ? 'news.' + index + '.name'
                      : 'data.' + index + '.name'
                  "
                  :rules="{
                    required: true,
                    message: 'News title is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="News Title " v-model="item.name" />
                </ElFormItem>
              </VCol>
            </VRow>
          </ElCard>
          <!-- </fieldset> -->
        </VCol>
      </VRow>

      <ElCard>
         <VRow>
          <VCol cols="12" md="6">
            <ElFormItem label="News Type" prop="news_type_id"  :rules="{
                      required: true,
                      message: 'News type is required',
                      trigger: 'blur',
                    }">
              <el-select
                v-model="ruleForm.news_type_id"
                placeholder="Select News Type" 
                size="large"
              >
                <el-option
                  v-for="(type, index) in typeList"
                  :key="index"
                  :label="type.name"
                  :value="type.id"
                />
              </el-select>
            </ElFormItem>
          </VCol>
        </VRow>
        <ElButton
          class="submit"
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          {{ mode }}
        </ElButton>
        <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)"
          >Reset</ElButton
        >
        <ElButton @click="router.go(-1)" type="info">Back</ElButton>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from "@/stores/tourism/newsStore";
import { notify } from "@/utils/notification";
import {
  type ComponentSize,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
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
const newsStore = useNewsStore();

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const locationOptions = ["Home", "Company", "School"];
const rules = reactive<FormRules<RuleForm>>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    let data = [];
    props.mode == "update" ? (data = props.ruleForm.news) : "";
    let form = {
      id: props.ruleForm.id,
      news_type_id: props.ruleForm.news_type_id,
      data: props.ruleForm.news,
    };
    if (valid) {
      try{
      const { data } = props.ruleForm.id
        ? await newsStore.updateNews(form)
        : await newsStore.createNews(props.ruleForm);
      data.status_code == 200
        ? notify(
            "Congratulations!",
            data.message,
            "success",
            "top-right",
            emit("getEmit")
          )
        : "";
        router.push({ name: "newsList" });
      } catch (error) {
          notify(error?.response?.data?.message,  error?.response?.data?.errors ? error?.response?.data?.errors : error?.response?.data?.error ?error?.response?.data?.error : "Something went wrong", 'error', 'top-right')
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
const newsType = async () => {
  const { data } = await newsStore.getNewsType();

  typeList.value = data.data;
};

onMounted(() => {
  newsType();
});
</script>

<style scoped>
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

.submit {
  text-transform: capitalize;
}
</style>
