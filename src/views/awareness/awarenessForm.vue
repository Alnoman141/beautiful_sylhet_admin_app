<template>
  <div>
    <ElCard>
      <div
        v-for="(item, index) in awarenessData"
        :key="index"
        class="mb-5"
      >
        <QuillEditor
          v-model:content="item.name"
          content-type="html"
          theme="snow"          
          toolbar="full"
        />
      
        <div class="text-end py-4">
          <ElButton
            type="primary"
            @click="updateAwarenessData"
          >
            Submit
          </ElButton>
        </div>
      </div>
    </ElCard> 
  </div>
</template>


<script setup lang="ts">
import { useAwarenessStore } from "@/stores/tourism/awarenessStore"
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

const awarenessStore = useAwarenessStore()

const awarenessData = ref({})
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

    awarenessData.value = data.data
    console.log("awareness data", awarenessData.value)
  }catch(error) {
    console.log("error", error)
  }
}


const updateAwarenessData = async () => {  
  
  try {
   

    const { data } = await awarenessStore.updateAwareness({ data: awarenessData.value })

    console.log("data", data)

    data.status_code == 200 ? notify('Congratulations!', data.message, 'success', 'top-right') : ''

   
  }catch (error) {
    
    notify("error", error?.response?.data?.message)

    // payload send na krle o success dey
  }
}

onMounted(() => {
  getAwareness()
  
})
</script>
