<template>
  <div>
    <div v-for="(row, rowIndex) in formProperty" :key="rowIndex" class="form-row">
      <div class="form-item" v-for="(field, key) in row" :key="key">
        <label :for="key">{{ field.label }}</label>
        <component
          :is="getComponentType(field.type)"
          v-model="field.value"
          :placeholder="field.placeholder"
        >
          <!-- Render options dynamically for select, radio, or checkbox -->
          <template v-if="field.type === 'select'">
            <ElOption
              v-for="option in field.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </template>
          <template v-if="field.type === 'radio'">
            <ElRadio
              v-for="option in field.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            >
              {{ option.label }}
            </ElRadio>
          </template>
          <template v-if="field.type === 'checkbox'">
            <ElCheckbox
              v-for="option in field.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            >
              {{ option.label }}
            </ElCheckbox>
          </template>
        </component>
      </div>
    </div>

    <button @click="duplicateFields">Duplicate Fields</button>
  </div>
</template>

<script setup lang="ts">
import {
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
} from "element-plus";
import { ref } from "vue";

// Initial form structure
const formProperty = ref([
  {
    name: { label: "Name", type: "text", value: "", placeholder: "Enter your name" },
    email: { label: "Email", type: "email", value: "", placeholder: "Enter your email" },
    phone: { label: "Phone", type: "text", value: "", placeholder: "Enter your phone number" },
    country: {
      label: "Country",
      type: "select",
      value: "",
      options: [
        { value: "usa", label: "USA" },
        { value: "canada", label: "Canada" },
        { value: "uk", label: "UK" },
      ],
      placeholder: "Select your country",
    },
    fruit: {
      label: "Favorite Fruit",
      type: "radio",
      value: "",
      options: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
      ],
    },
    terms: {
      label: "Agree to Terms",
      type: "checkbox",
      value: [],
      options: [{ value: "agree", label: "I agree" }],
    },
    birthDate: { label: "Birth Date", type: "date", value: "", placeholder: "Select your birth date" },
  },
]);

// Function to determine which component to render
const getComponentType = (type: string) => {
  switch (type) {
    case "text":
    case "email":
      return ElInput;
    case "select":
      return ElSelect;
    case "radio":
      return ElRadioGroup;
    case "checkbox":
      return ElCheckboxGroup;
    case "date":
      return ElDatePicker;
    default:
      return ElInput;
  }
};

// Duplicate form fields
const duplicateFields = () => {
  const newRow = {};
  for (const key in formProperty.value[0]) {
    const field = formProperty.value[0][key]; // Access the field object
    newRow[key] = {
      ...field, // Copy all properties
      value: field.type === "checkbox" ? [] : "", // Reset value
    };
  }
  formProperty.value.push(newRow); // Add new row to the formProperty
};
</script>

<style scoped>
.form-row {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-block-end: 16px;
}

.form-item {
  margin-block-end: 16px;
}
</style>
