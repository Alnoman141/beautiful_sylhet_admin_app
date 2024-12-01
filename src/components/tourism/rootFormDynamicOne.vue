<template>
  <div>
    <!-- Loop through all rows in the form -->
    <div
      v-for="(row, rowIndex) in formProperty"
      :key="rowIndex"
      class="form-row"
    >
      <!-- Render each field dynamically -->
      <div class="form-item" v-for="(value, key) in row" :key="key">
        <label :for="key">{{ capitalize(key) }}</label>
        <component
          :is="getComponentType(key)"
          v-model="row[key]"
          :placeholder="getPlaceholder(key)"
          :options="key === 'country' ? options : undefined"
          :size="'large'"
          :style="{ width: key === 'country' ? '240px' : '' }"
        >
          <!-- Handle ElSelect options -->
          <template v-if="key === 'country'" #default>
            <ElOption
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </template>
        </component>
      </div>
    </div>

    <!-- Button to duplicate fields -->
    <button @click="duplicateFields">Duplicate Fields</button>
  </div>
</template>

<script setup lang="ts">
import {
  ElInput,
  ElOption,
  ElSelect,
} from "element-plus";
import { ref } from "vue";

// Initial form structure
const formProperty = ref([
  { name: '', email: '', phone: '', country: '' },
]);

// Options for dropdowns
const options = [
  { value: 'usa', label: 'USA' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'UK' },
];

// Capitalize labels dynamically
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Determine placeholder dynamically
const getPlaceholder = (key: string) => {
  switch (key) {
    case 'name':
      return 'Enter your name';
    case 'email':
      return 'Enter your email';
    case 'phone':
      return 'Enter your phone number';
    case 'country':
      return 'Select your country';
    default:
      return '';
  }
};

// Dynamically determine which component to render
const getComponentType = (key: string) => {
  switch (key) {
    case 'name':
    case 'email':
    case 'phone':
      return ElInput;
    case 'country':
      return ElSelect;
    default:
      return ElInput;
  }
};

// Duplicate existing fields
const duplicateFields = () => {
  formProperty.value.push({ name: '', email: '', phone: '', country: '' });
};
</script>

<style scoped>
.form-row {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-block-end: 16px;
}

.form-item {
  margin-block-end: 16px;
}
</style>
