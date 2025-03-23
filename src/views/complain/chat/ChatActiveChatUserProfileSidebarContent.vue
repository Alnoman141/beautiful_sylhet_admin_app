<script setup>
import { useChat } from './useChat'
import { useChatStore } from './useChatStore'

const emit = defineEmits(['close'])

const store = useChatStore()
const { resolveAvatarBadgeVariant } = useChat()
</script>

<template>
  <template v-if="store.activeChat">
    <!-- Close Button -->
    <div
      class="pt-6 px-6"
      :class="$vuetify.locale.isRtl ? 'text-left' : 'text-right'"
    >
      <IconBtn @click="$emit('close')">
        <VIcon
          icon="tabler-x"
          class="text-medium-emphasis"
        />
      </IconBtn>
    </div>

    <!-- User Avatar + Name + Role -->
    <div class="text-center px-6">
      <VAvatar
        size="40"
        :variant="
          !store.activeChat.replies[1]?.user?.avatar
            ? 'tonal'
            : undefined
        "
        class="cursor-pointer"
      >
        <VImg
          v-if="store.activeChat.replies[1]?.user?.avatar"
          :src="store.activeChat.replies[1]?.user?.avatar"
          :alt="
            store.activeChat.replies[1]?.user.first_name +
              ' ' +
              store.activeChat.replies[1]?.user.last_name
          "
        />
        <span v-else>{{
          avatarText(
            store.activeChat.replies[1]?.user.first_name +
              " " +
              store.activeChat.replies[1]?.user.last_name
          )
        }}</span>
      </VAvatar>
      <h5 class="text-h5">
        {{ store.activeChat.replies[1]?.user.first_name }} {{
          store.activeChat.replies[1]?.user.last_name
        }}
      </h5>
    </div>

    <!-- User Data -->
    <!--
      <PerfectScrollbar
      class="ps-chat-user-profile-sidebar-content text-medium-emphasis pb-6 px-6"
      :options="{ wheelPropagation: false }"
      >
      
      <div class="my-6">
      <div class="text-sm text-disabled">
      ABOUT
      </div>
      <p class="mt-1 mb-6">
      {{ store.activeChat }}
      </p>
      </div>

      
      <div class="mb-6">
      <div class="text-sm text-disabled mb-1">
      PERSONAL INFORMATION
      </div>
      <div class="d-flex align-center text-high-emphasis pa-2">
      <VIcon
      class="me-2"
      icon="tabler-mail"
      size="22"
      />
      <div class="text-base">
      lucifer@email.com
      </div>
      </div>
      <div class="d-flex align-center text-high-emphasis pa-2">
      <VIcon
      class="me-2"
      icon="tabler-phone"
      size="22"
      />
      <div class="text-base">
      +1(123) 456 - 7890
      </div>
      </div>
      <div class="d-flex align-center text-high-emphasis pa-2">
      <VIcon
      class="me-2"
      icon="tabler-clock"
      size="22"
      />
      <div class="text-base">
      Mon - Fri 10AM - 8PM
      </div>
      </div>
      </div>

      
      <div>
      <div class="text-sm text-disabled mb-1">
      OPTIONS
      </div>
      <div class="d-flex align-center text-high-emphasis pa-2">
      <VIcon
      class="me-2"
      icon="tabler-badge"
      size="22"
      />
      <div class="text-base">
      Add Tag
      </div>
      </div>
      <div class="d-flex align-center text-high-emphasis pa-2">
      <VIcon
      class="me-2"
      icon="tabler-star"
      size="22"
      />
      <div class="text-base">
      Important Contact
      </div>
      </div>
      <div class="d-flex align-center text-high-emphasis pa-2">
      <VIcon
      class="me-2"
      icon="tabler-photo"
      size="22"
      />
      <div class="text-base">
      Shared Media
      </div>
      </div>
      <div class="d-flex align-center text-high-emphasis pa-2">
      <VIcon
      class="me-2"
      icon="tabler-trash"
      size="22"
      />
      <div class="text-base">
      Delete Contact
      </div>
      </div>
      <div class="d-flex align-center text-high-emphasis pa-2">
      <VIcon
      icon="tabler-ban"
      class="me-2"
      size="22"
      />
      <div class="text-base">
      Block Contact
      </div>
      </div>

      <VBtn
      block
      color="error"
      append-icon="tabler-trash"
      class="mt-6"
      >
      Delete Contact
      </VBtn>
      </div>
      </PerfectScrollbar> 
    -->
  </template>
</template>
