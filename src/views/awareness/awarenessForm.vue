<template>
  <div>
    <ElCard class="my-4 ">
      <VRow>
        <VCol>
          <b> Awareness Edit </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'awareness'}"
            
            class="create-btn "
          >
            Awareness List
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
          v-for="(item, index) in ruleForm.data"
          :key="index"
          class="mb-5"
        >
          <ElCard>
            <ElFormItem :label="index == 0 ? 'Bangla':'English'" :prop="
                   'data.' + index + '.name'
                    " 
              :rules="{
                required: true,
                message: 'Awareness is required',
                trigger: 'blur',
              }" >

              
              <div>
                <QuillEditor
                  v-model:content="item.name"
                  :text-change="checkData()"
                  content-type="html"
                  theme="snow"          
                  toolbar="full"
                  style="min-block-size: 200px;"
                />
              </div>
            </ElFormItem>
          </ElCard>
        </VCol>
      </VRow>
      
      <ElCard class=" mt-4">
        <ElButton
          type="primary"
          @click="updateAwarenessData(ruleFormRef)"
        >
          Submit
        </ElButton>
      </ElCard>
    </ElForm>
  </div>
</template>


<script setup lang="ts">
import { useAwarenessStore } from "@/stores/tourism/awarenessStore";
import { notify } from '@/utils/notification';
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const quillEditor = ref(null) // Ref to the Quill editor instance

const editorOptions = {
  placeholder: 'Type here...',
  theme: 'snow', // Change to 'bubble' or other supported themes if needed
}

const editorDialog = ref(false)

const editData = ref({
  id: null,
  name: null,
})

const awarenessStore = useAwarenessStore()

const ruleForm = ref({})
const ruleFormRef = ref<FormInstance>();
const htmlContent = ref('')



const getAwareness = async () => {
  try {
    
    let parameter = {
      id: route.params.id,
    }

    const { data } = await awarenessStore.editAwareness()

    editData.value = data
    setTimeout(() => {
      quillEditor.value ? quillEditor.value.setHTML(data.data.name)   :''  
    }, 1000)

    ruleForm.value.data = data.data
    
  }catch(error) {
    console.log("error", error)
  }
}



const updateAwarenessData = async (formEl: FormInstance | undefined) => { 
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {

    if (valid) {
      try {
        const { data } = await awarenessStore.updateAwareness(ruleForm.value)

        

        data.status_code == 200 ? notify('Congratulations!', data.message, 'success', 'top-right') : ''
        data.status_code == 200 ? router.push({ name: 'awareness' }) : ''

      } catch (error) {

        notify("error", error?.response?.data?.message)

        // payload send na krle o success dey
      }
    }
  });
}

const awarenessEditorRef = ref(null)

const checkData = () => {
  awarenessEditorRef.value?.map(e => {
    e.getHTML() == "<p><br></p>" ? e.setHTML("") : ""
  })

  ruleForm.value.data.map(e => {
    e.name == "<p><br></p>" ? (e.name = "") : ""
  })
}

onMounted(() => {

  getAwareness()
  
})
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
