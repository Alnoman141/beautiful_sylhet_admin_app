<template>
  <div class="px-4">
    <ElCard>
      <QuillEditor
        ref="quillEditor" 
        theme="snow"
        placeholder="Type here..."
      
        @text-change="onTextChange"
      />
    
      <div class="px-8 ">
        <h3>Editor Content:</h3>
        <pre v-html="editorContent" />
      </div>
    </ElCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const editorContent = ref('') // Reactive variable to store the editor content
const quillEditor = ref(null) // Ref to the Quill editor instance

const editorOptions = {
  placeholder: 'Type here...',
  theme: 'snow', // Change to 'bubble' or other supported themes if needed
}

const onTextChange = () => {
 
  const htmlContent = quillEditor.value.getHTML()

  console.log(htmlContent)
  editorContent.value = htmlContent
  

}

onMounted(async () => {
  // Simulate API call to fetch HTML content
  const apiHtmlResponse = `       
        </li></ol><h1>This is an H1 Title</h1>
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph.</p>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>        
      `


  if (quillEditor.value ) {
  //   // Set the editor's content as HTML
    //   quillEditor.value.quill.root.innerHTML = apiHtmlResponse
    quillEditor.value.setHTML(apiHtmlResponse)

    // assign the editor content to the reactive variable
    editorContent.value = apiHtmlResponse


  
  }
})
</script>

<style scoped>
.editor-content {
  padding: 10px;
  border: 1px solid #ccc;
  margin-block-start: 10px;
}

.editor-content > ul > li {
  margin: 2% !important;
}
</style>
