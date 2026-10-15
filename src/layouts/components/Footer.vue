<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      All Rights Reserved
      By <a
        href="https://www.sylhet.gov.bd/bn/site/officer_list/%E0%A6%AC%E0%A6%BF%E0%A6%AD%E0%A7%80%E0%A6%B7%E0%A6%A3-%E0%A6%95%E0%A6%BE%E0%A6%A8%E0%A7%8D%E0%A6%A4%E0%A6%BF-%E0%A6%A6%E0%A6%BE%E0%A6%B6/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >DC Office | Sylhet</a>
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
        href="https://thinkflowinnovation.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Thinkflow Innovation</a>
    </span>
  </div>
</template>
