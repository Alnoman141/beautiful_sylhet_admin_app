<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b> Locker {{ mode == "update" ? "Edit" : "Create" }} </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            :to="{ name: 'lockerList' }"
           
            class="create-btn"
          >
            Locker List
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
          v-for="(item, index) in ruleForm && ruleForm.lockers
            ? ruleForm.lockers
            : ruleForm.data"
          :key="index"
        >
          <ElCard class="rounded py-2 px-2">
            <b> {{ index == 0 ? "Bangla" : "English" }} </b>
            <hr class="my-2" />

            <VRow>
              <VCol cols="12" md="6">
                <ElFormItem
                  label="Phone"
                  :prop="
                    ruleForm.lockers
                      ? 'lockers.' + index + '.phone'
                      : 'data.' + index + '.phone'
                  "
                  :rules="{
                    required: true,
                    message: 'Phone is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Phone Number" v-model="item.phone" />
                </ElFormItem>
              </VCol>
              <VCol cols="12" md="6">
                <ElFormItem
                  label="Address"
                  :prop="
                    ruleForm.lockers
                      ? 'lockers.' + index + '.address'
                      : 'data.' + index + '.address'
                  "
                  :rules="{
                    required: true,
                    message: 'Address is required',
                    trigger: 'blur',
                  }"
                >
                  <ElInput placeholder="Address" v-model="item.address" />
                </ElFormItem>
              </VCol>
              <VCol cols="12">
                <ElFormItem
                  label="Description"
                  :prop="
                    ruleForm.lockers
                      ? 'lockers.' + index + '.description'
                      : 'data.' + index + '.description'
                  "
                 
                >
                <!--  :rules="{
                    required: true,
                    message: 'Description is required',
                    trigger: 'blur',
                  }" -->
                  

                  <div>
                    <QuillEditor
                      ref="descriptionEditorRef"
                      v-model:content="item.description"
                      :blur="checkData()"
                      content-type="html"
                      theme="snow"
                      toolbar="full"
                      style="min-block-size: 200"
                      placeholder="Type description here"
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
            <!-- spotDropdownData -->
            <!-- <label for=""> Tourist Spot </label> -->
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
                searchable
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
          <VCol cols="12" md="6">
            <ElFormItem
              label="Locker Map Link"
              prop="link"
              :rules="[
                {
                  required: true,
                  message:
                    'Link can not be empty and should be like https://www.xyz.com',
                  trigger: 'blur',
                },
                {
                  type: 'url',
                  message:
                    'Link is required and should be like https://www.xyz.com',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <ElInput placeholder="Locker Map Link" v-model="ruleForm.link" />
            </ElFormItem>
          </VCol>
        </VRow>
        <div class="py-4">
          <ElButton
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="submit"
          >
            {{ mode }}
          </ElButton>
          <!-- reset button -->
          <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)"
            >Reset</ElButton
          >
          <ElButton @click="router.go(-1)" type="info">Back</ElButton>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { useLockerStore } from "@/stores/tourism/lockerStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
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
const lockerStore = useLockerStore();
const spotStore = useSpotStore();
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    let data = [];
    props.mode == "update" ? (data = props.ruleForm.news) : "";
    let form = {
      id: props.ruleForm.id,
      spot_parent_id: props.ruleForm.spot_parent_id,
      link: props.ruleForm.link,
      data: props.ruleForm.lockers,
    };
    props.ruleForm.parent_spot_id = props.ruleForm.spot_parent_id;
    if (valid) {
      try{
      const { data } = props.ruleForm.id
        ? await lockerStore.updateLocker(form)
        : await lockerStore.createLocker(props.ruleForm);
      data.status_code == 200
        ? notify(
            "Congratulations!",
            data.message,
            "success",
            "top-right",
            emit("getEmit")
          )
        : "";
        router.push({ name: "lockerList" });
      } catch (error) {
          notify(error?.response?.data?.message,  error?.response?.data?.errors ? error?.response?.data?.errors : error?.response?.data?.error ?error?.response?.data?.error : "Something went wrong", 'error', 'top-right')
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const typeList = ref([]);

const descriptionEditorRef = ref();
onMounted(() => {
  getSpotDropdownList();
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
});

const checkData = () => {
  descriptionEditorRef.value?.map((e) => {
    console.log("e", e.getHTML());

    e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
    console.log("e", e.getHTML());
  });
  props.ruleForm.lockers
    ? props.ruleForm.lockers?.map((e) =>
        e.description == "<p><br></p>" ? (e.description = "") : ""
      )
    : props.ruleForm.data?.map((e) =>
        e.description == "<p><br></p>" ? (e.description = "") : ""
      );
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
  checkData();
};
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
