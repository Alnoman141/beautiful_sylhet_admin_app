<template>
  <div>
    <ElCard class="my-4 ">
      <VRow>
        <VCol>
          <b> Guideline Edit </b>
        </VCol>
        <VCol class="text-right">
          <RouterLink
            type="primary"
            :underline="false"          
          
            :to="{ name: 'guide-line'}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            class="create-btn "
          >
            Guideline List
          </RouterLink>
        </VCol>
      </VRow>
    </ElCard>
    <ElForm
      label-width="auto"          
      label-position="top"
      class="py-4"
    >
      <VRow>
        <VCol
          v-for="(item, index) in guidelineData"
          :key="index"
          md="6"
        >
          <ElCard>
            <ElFormItem :label="index == 0 ? 'Bangla':'English'">
              <div>
                <QuillEditor
                  v-model:content="item.name"
                  content-type="html"
                  theme="snow"          
                  toolbar="full"
                />
              </div>
            </ElFormItem>
          </ElCard>
        </VCol>
      </VRow>
      <div class="text-end py-4 ">
        <ElButton
          type="primary"
          @click="updateAwarenessData"
        >
          Submit
        </ElButton>
      </div>
    </ElForm>
  </div>
</template>


<script setup lang="ts">
import { useGuidelineStore } from "@/stores/tourism/guidelineStore"
import { notify } from '@/utils/notification'
import { onMounted, ref } from "vue"
import { useRoute } from 'vue-router'

const route = useRoute()

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

const guidelineStore = useGuidelineStore()

const guidelineData = ref({})
const htmlContent = ref('')



const getGuideline = async () => {
  try {
    
    let parameter = {
      id: route.params.id,
    }

    const { data } = await guidelineStore.editGuideline()

    editData.value = data
    setTimeout(() => {
      quillEditor.value ? quillEditor.value.setHTML(data.data.name)   :''  
    }, 1000)

    guidelineData.value = data.data
    
  }catch(error) {
    console.log("error", error)
  }
}

const validationLock = ref(false)

const updateAwarenessData = async () => {  
  // extract inner text from quill editor  
  guidelineData.value[0].name.length <= 11 || guidelineData.value[1].name.length <= 11 ? validationLock.value = true : validationLock.value = false

  
  if (validationLock.value) {
    notify('Error!', 'Please fill all fields', 'error', 'top-right')
    
    return
  }
  try {
   
    const { data } = await guidelineStore.updateGuideline({ data: guidelineData.value })

    data.status_code == 200 ? (notify('Congratulations!', data.message, 'success', 'top-right'), getGuideline()) : ''

   
  }catch (error) {
    
    notify("error", error?.response?.data?.message)

    // payload send na krle o success dey
  }
}

onMounted(() => {
  getGuideline()
  
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
