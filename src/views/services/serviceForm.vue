<template>
  <div>
    <ElCard class="my-4">
      <VRow>
        <VCol>
          <b>
            {{
              ruleForm.type == 1
                ? "Tourism Corporation Helpline"
                : ruleForm.type == 2
                ? "Dc Activities"
                : ruleForm.type == 3
                ? "Tourist Bus"
                : "Kitkot Chair"
            }}
            {{ mode == "update" ? "Edit" : "Create" }}
          </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"
            @click="router.go(-1)"
            to="#"
            class="create-btn"
          > 
          <el-tooltip class="item" effect="dark" content="Back" placement="top-start">
            {{
              ruleForm.type == 1
                ? "Tourism Corporation Helpline"
                : ruleForm.type == 2
                ? "DC Activities"
                : ruleForm.type == 3
                ? "Tourist Bus"
                : "Kitkot Chair"
            }}
            List
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
          cols="12"
          v-for="(booking, index) in ruleForm.booking_numbers"
          :key="index"
        >
          <ElCard>
            <VRow>
              <VCol cols="12" md="6">
                <ElFormItem
                  :label="
                    ruleForm.type != 1 && ruleForm.type != 2
                      ? 'Booking Person Name'
                      : ' Officer Name'
                  "
                >
                  <ElInput
                    :placeholder="
                      ruleForm.type != 1 && ruleForm.type != 2
                        ? 'Booking Person Name'
                        : ' Officer Name'
                    "
                    v-model="booking.name"
                  />
                </ElFormItem>
              </VCol>

              <VCol cols="12" md="6">
                <div v-for="(num, index) in booking.numbers" :key="index">
                  <ElFormItem
                    :label="
                      ruleForm.type != 1 && ruleForm.type != 2
                        ? 'Booking Phone Numbers'
                        : ' Phone Numbers'
                    "
                  >
                    <VRow>
                      <VCol
                        cols="
                          12
                        "
                      >
                        <ElInput
                          placeholder="Booking Phone Numbers"
                          v-model="num.phone"
                        />
                      </VCol>
                      <VCol cols="2">
                        <ElButton
                          v-if="
                            (index == 0 &&
                              ruleForm.booking_numbers[0].numbers.length ==
                                1) ||
                            (index ==
                              ruleForm.booking_numbers[0].numbers.length - 1 &&
                              index != 0)
                          "
                          size="small"
                          type="success"
                          @click="addBookingNumber"
                        >
                          <VIcon icon="tabler-plus" size="15" />
                        </ElButton>
                        <ElButton
                          v-if="ruleForm.booking_numbers[0].numbers.length > 1"
                          size="small"
                          type="danger"
                          @click="removeBookingNumber(index)"
                        >
                          <VIcon icon="tabler-minus" size="15" />
                        </ElButton>
                      </VCol>
                    </VRow>
                  </ElFormItem>
                </div>
              </VCol>
            </VRow>
          </ElCard>
        </VCol>
        <template
          v-if="ruleForm.type != 1 && ruleForm.type != 2 && ruleForm.type != 4"
        >
          <VCol
            cols="12"
            v-for="(supervisor, index) in ruleForm.supervisor_numbers"
            :key="index"
          >
            <ElCard>
              <VRow>
                <VCol cols="12" md="6">
                  <ElFormItem label="Supervisor Name">
                    <ElInput
                      placeholder="Supervisor Name"
                      v-model="supervisor.name"
                    />
                  </ElFormItem>
                </VCol>

                <VCol cols="12" md="6">
                  <div v-for="(num, index) in supervisor.numbers" :key="index">
                    <ElFormItem label="Supervisor Phone Numbers">
                      <VRow>
                        <VCol cols="9">
                          <ElInput
                            placeholder="Supervisor Phone Numbers"
                            v-model="num.phone"
                          />
                        </VCol>
                        <VCol>
                          <ElButton
                            v-if="
                              (index == 0 &&
                                ruleForm.supervisor_numbers[0].numbers.length ==
                                  1) ||
                              (index ==
                                ruleForm.supervisor_numbers[0].numbers.length -
                                  1 &&
                                index != 0)
                            "
                            size="small"
                            type="success"
                            @click="addSupervisorNumber"
                          >
                            <VIcon icon="tabler-plus" size="15" />
                          </ElButton>
                          <ElButton
                            v-if="
                              ruleForm.supervisor_numbers[0].numbers.length > 1
                            "
                            size="small"
                            type="danger"
                            @click="removeSupervisorNumber(index)"
                          >
                            <VIcon icon="tabler-minus" size="15" />
                          </ElButton>
                        </VCol>
                      </VRow>
                    </ElFormItem>
                  </div>
                </VCol>
              </VRow>
            </ElCard>
          </VCol>
        </template>
      </VRow>
      <ElCard class="my-4">
        
        <VRow v-if="ruleForm.type != 1 && ruleForm.type != 2">
          <VCol cols="12" md="6" v-if="ruleForm.type == 4">
            <ElFormItem label="Owner Information" :prop="'owner_information'">
              <div>
                <QuillEditor
                  v-model="ruleForm.owner_information"
                  ref="ownerInformationEditorRef"
                  content-type="html"
                  theme="snow"
                  toolbar="full"
                  :text-change="checkData()"
                  :Placeholder="'Owner Information'"
                  :customClass = "'customClass'"

                />
              </div>
            </ElFormItem>
          </VCol>

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
        </VRow>
        <div class="py-4">
          <el-tooltip 
            class="box-item"
            effect="dark"
            content="Submit"
            >
          <ElButton
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="submit"
          >
            {{ mode }}
          </ElButton>
          </el-tooltip>
          <!-- reset button -->
          <el-tooltip 
            class="box-item"
            effect="dark"
            content="Reset">
          <ElButton v-if="mode !== 'update'" @click="resetForm(ruleFormRef)"
            >Reset</ElButton
          >
          </el-tooltip>
          <el-tooltip 
            class="box-item"
            effect="dark"
            content="Back">
          <ElButton @click="router.go(-1)" type="info">Back</ElButton>
          </el-tooltip>
        </div>
      </ElCard>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import QuillEditor from "@/components/quill/QuillEditor.vue";
import { useServiceStore } from "@/stores/tourism/serviceStore";
import { useSpotStore } from "@/stores/tourism/spotStore";
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
const serviceStore = useServiceStore();
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


const loading = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  props.ruleForm.type == 1 || props.ruleForm.type == 2
    ? (props.ruleForm.spot_parent_id = spotDropdownData.value[0].id)
    : "";
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    let bookingNumber = [];
    props.ruleForm.booking_numbers[0].numbers?.map((e) => {
      bookingNumber.push(e.phone);
    });
    let supervisorNumber = [];
    props.ruleForm.supervisor_numbers[0].numbers?.map((e) => {
      supervisorNumber.push(e.phone);
    });
    let form = {
      id: props.ruleForm.id,
      type: props.ruleForm.type,
      spot_parent_id: props.ruleForm.spot_parent_id,
      link: props.ruleForm.link,
      owner_information: props.ruleForm.owner_information,
      
      booking_numbers: [
        {
          name: props.ruleForm.booking_numbers[0].name,
          numbers: bookingNumber,
        },
      ],
      supervisor_numbers: [
        {
          name: props.ruleForm.supervisor_numbers[0].name,
          numbers: supervisorNumber,
        },
      ],
      descriptions: props.ruleForm.descriptions,
    };

    if (valid) {
      loading.value = true 
      try {
        const { data } = props.ruleForm.id
          ? await serviceStore.updateService(form)
          : await serviceStore.createService(form);
        data.status_code == 200
          ? (notify(
              "Congratulations!",
              data.message,
              "success",
              "top-right",
              emit("getEmit")
            ), loading.value = false)
          : "";

        props.ruleForm.type == "1"
          ? router.push({ name: "Tourism Corporation" })
          : props.ruleForm.type == "2"
          ? router.push({ name: "DC Activities" })
          : props.ruleForm.type == "3"
          ? router.push({ name: "Tourist Bus" })
          : router.push({ name: "Kitkot Chair" });
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

const typeList = ref([]);

const descriptionEditorRef = ref();
onMounted(() => {
  getSpotDropdownList();
  descriptionEditorRef.value?.map((e) => e.setHTML(""));
});

const addBookingNumber = () => {
  props.ruleForm.booking_numbers[0].numbers.push({
    phone: "",
  });
};

const removeBookingNumber = (index: number) => {
  props.ruleForm.booking_numbers[0].numbers.splice(index, 1);
};

// add supervisor number
const addSupervisorNumber = () => {
  props.ruleForm.supervisor_numbers[0].numbers.push({
    phone: "",
  });
};
// remove supervisor number
const removeSupervisorNumber = (index: number) => {
  props.ruleForm.supervisor_numbers[0].numbers.splice(index, 1);
};
const ownerInformationEditorRef = ref(null);
const checkData = () => {
  // descriptionEditorRef.value?.map((e) => {
  //   e.getHTML() == "<p><br></p>" ? e.setHTML("") : "";
  // });
  props.ruleForm.owner_information
    ? props.ruleForm.owner_information == "<p><br></p>"
      ? (props.ruleForm.owner_information = "")
      : ""
    : "";
  props.ruleForm.descriptions
    ? props.ruleForm.descriptions?.map((e) =>
        e.name == "<p><br></p>" ? (e.name = "") : ""
      )
    : props.ruleForm.descriptions?.map((e) =>
        e.name == "<p><br></p>" ? (e.name = "") : ""
      );
  // descriptionEditorRef.value?.getHTML() == "<p><br></p>"
  //   ? descriptionEditorRef.value?.setHTML("")
  //   : "";

  // ownerInformationEditorRef.value?.getHTML() == "<p><br></p>"
  //   ? ownerInformationEditorRef.value?.setHTML("")
  //   : "";
  // props.ruleForm.reds
  //   ? props.ruleForm.reds?.map((e) => {
  //       e.instruction == "<p><br></p>" ? (e.instruction = "") : "";
  //     })
  //   : "";
  // props.ruleForm.data?.map((e) => {
  //   e.instruction == "<p><br></p>" ? (e.instruction = "") : "";
  // });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  descriptionEditorRef.value?.map((e) => e.setHTML(""));

  ownerInformationEditorRef.value.setHTML("");
  props.ruleForm.booking_numbers[0].numbers = [{ phone: "" }];

  props.ruleForm.booking_numbers[0].name = "";
  props.ruleForm.supervisor_numbers[0].numbers = [{ phone: "" }];
  props.ruleForm.supervisor_numbers[0].name = "";
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
