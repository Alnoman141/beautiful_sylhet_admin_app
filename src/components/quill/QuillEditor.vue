<script setup>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

/* Import Quill styles */
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String, // For v-model binding
  customClass: { type: String, default: 'quill-editor' }, // Custom classes for the editor
  Placeholder: {
    type: String,
    default: 'Type here...',
  },
  previewMode: { type: Boolean, default: false }, // New prop for preview mode
})

const emit = defineEmits(['update:modelValue'])



const editorContainer = ref(null)
let quillInstance = null

onMounted(() => {
  quillInstance = new Quill(editorContainer.value, {
    theme: 'snow',
    placeholder: props.Placeholder,

    modules: {
      toolbar: [
        [ { 'size': [] }], // Font & Size
        ['bold', 'italic', 'underline', 'strike'], // Text styles
        [{ 'color': [] }, { 'background': [] }], // Text color & Background
        [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/Superscript
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Headers
        [{ 'align': [] }], // Alignment
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], // Lists & Indent
        // ['blockquote', 'code-block'], // Block types
        ['link', 'image', 'video'], // Media
        ['clean'], // Clear formatting
      ],
    },


  })

  // Set initial content
  quillInstance.root.innerHTML = props.modelValue || ''

  // Listen for changes and emit updates
  quillInstance.on('text-change', () => {
    emit('update:modelValue', quillInstance.root.innerHTML)
  })
})

// Watch for external changes
watch(() => props.modelValue, newValue => {
  if (quillInstance && quillInstance.root.innerHTML !== newValue) {
    quillInstance.root.innerHTML = newValue
  }
})
</script>

<template>
  <div :class="{ 'preview-mode': previewMode }">
    <div
      ref="editorContainer"
      :class="previewMode == false ? customClass :''"
    />
  </div>
</template>

<style scoped>
/* Hide the toolbar when previewMode is active */



.customClass{
  block-size: 300px;

  /* inline-size: 90vw; */
}

.customClassInfo{
  block-size: 100dvh !important;

  /* inline-size: 90vw; */
}

/* media query for 320px */
@media (min-width: 320px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 70vw;
  }
}

/* media query for 375px */
@media (min-width: 375px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 75vw;
  }
}

/* media query for 425px */
@media (min-width: 425px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 80vw;
  }
}





/* media query for min width 430 px to max widh 768 */
@media (min-width: 430px) and (max-width: 500px) {
  .quill-editor {
    block-size: 300px;

    /* inline-size: 90vw; */
    inline-size: 82vw;
  }
}

@media (min-width: 510px) and (max-width: 600px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 85vw;
  }
}

@media (min-width: 610px) and (max-width: 768px) {
  .quill-editor {
    block-size: 300px;

    /* inline-size: 90vw; */
    inline-size: 88vw;
  }
}

@media (min-width: 780px) and (max-width: 1022px) {
  .quill-editor {
    block-size: 300px;

    /* inline-size: 90vw; */
    inline-size: 90vw;
  }
}


/* media query for 1024px */

@media (min-width: 1024px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 34.1vw;
  }
}

/* media query for 1920px */
@media (min-width: 1920px) {
  .quill-editor {
    block-size: 300px;
    inline-size: 39vw;
  }
}
</style>
