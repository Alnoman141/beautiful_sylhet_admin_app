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
      <VBadge
        location="bottom right"
        offset-x="7"
        offset-y="4"
        bordered
        color="success"
        class="chat-user-profile-badge mb-5"
      >
        <VAvatar
          size="80"
          :variant="!store.userInfo?.user?.avatar ? 'tonal' : undefined"
          :color="!store.userInfo?.user?.avatar ? resolveAvatarBadgeVariant(store.activeChat.contact.status) : undefined"
        >
          <VImg
            v-if="store.userInfo?.user?.avatar"
            :src="store.userInfo?.user?.avatar"
          />
          <span
            v-else
            class="text-3xl"
          >{{ avatarText(store.activeChat.contact.fullName) }}</span>
        </VAvatar>
      </VBadge>
      <h5 class="text-h5 text-center">
        {{ store.userInfo?.user?.name }} 
      </h5>
      <!--
        <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b>Phone-No: {{ store.userInfo?.user.phone }} </b> 
        </p>
        <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b>Email: {{ store.userInfo?.user }} </b> 
        </p>
        <hr>
        <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b>Complain-Category:</b> {{ store.userInfo.category.name }}
        </p>
        <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b>Complain-No:</b> {{ store.userInfo.serial }}
        </p> 
      -->
      
      
      <small
        
        disabled
        size="small"
      >
        <b> Complain-Status:</b> <b
          :class="
            store.userInfo.status == 0
              ? 'text-info'
              : store.userInfo.status == 1
                ? ''
                : store.userInfo.status == 2
                  ? 'text-success'
                  : store.userInfo.status == 3
                    ? 'text-danger'
                    : 'text-warning'
          "
        > {{
          store.userInfo.status == 0
            ? "Submitted"
            : store.userInfo.status == 1
              ? "In-Progress"
              : store.userInfo.status == 2
                ? "Resolved"
                : store.userInfo.status == 3
                  ? "Rejected"
                  : "In-Review"
        }} </b>
      </small>      
    </div>
    <!-- User Data -->
    <PerfectScrollbar
      class="ps-chat-user-profile-sidebar-content text-medium-emphasis pb-5 px-5"
      :options="{ wheelPropagation: false }"
    >
      <!-- About -->
      <div class="my-8">
        <span class="text-sm text-disabled">Complain Detail</span>
        
        <p class="mt-2">
          {{ store.userInfo.description }}
        </p>
      </div>

      <!-- Personal Information -->
      <div class="mb-8">
        <span class="d-block text-sm text-disabled mb-3">PERSONAL INFORMATION</span>
        <div class="d-flex align-center">
          <VIcon
            class="me-2"
            icon="tabler-mail"
            size="24"
          />
          <span>{{ store.userInfo?.user?.email }}</span>
        </div>
        <div class="d-flex align-center my-3">
          <VIcon
            class="me-2"
            icon="tabler-phone-call"
            size="24"
          />
          <span>{{ store.userInfo?.user?.phone }}</span>
        </div>
        <div class="d-flex align-center">
          <VIcon
            class="me-2"
            icon="tabler-clock"
            size="24"
          />
          <span>{{ store.userInfo.date }}</span>
        </div>
      </div>
    </PerfectScrollbar>
  </template>
</template>
