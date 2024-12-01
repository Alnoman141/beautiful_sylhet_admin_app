<script setup>
const shortcuts = [
  {
    icon: 'tabler-user',
    title: 'Users',
    subtitle: 'Manage Users',
    to: { name: 'apps-user-list' },
  },
  
]
</script>

<template>
  <Shortcuts :shortcuts="shortcuts" />
</template>
