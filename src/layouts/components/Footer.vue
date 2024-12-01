<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      All Rights Reserved
      By <a
        href="https://inflack.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Inflack Limited</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-flex align-center">
      Made With
      <VIcon
        icon="tabler-heart"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      By <a
        href="https://inflack.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Inflack Limited</a>
    </span>
  </div>
</template>
