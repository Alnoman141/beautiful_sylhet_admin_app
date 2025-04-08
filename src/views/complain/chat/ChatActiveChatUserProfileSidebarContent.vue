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
    <div class=" px-6">
      <div class="text-center">
        <VAvatar
          size="40"
        
          class="cursor-pointer"
        >
          <VImg
            v-if="store.userInfo?.user?.avatar"
            :src="store.userInfo?.user?.avatar"
            :alt="
              store.userInfo?.user?.name
            "
          />
          <span v-else>{{
            avatarText(
              store.userInfo?.user?.name
            )
          }}</span>
        </VAvatar>
      </div>
      <h5 class="text-h5">
        Name: {{ store.userInfo?.user?.name }} 
      </h5>
      <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b>Phone-No: {{ store.userInfo?.user.phone }} </b> 
      </p>
      <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b>Email: {{ store.userInfo?.user.email }} </b> 
      </p>
      <hr>
      <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b>Complain-Category:</b> {{ store.userInfo.category.name }}
      </p>
      <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b>Complain-No:</b> {{ store.userInfo.serial }}
      </p>
      
      
      <small
        
        disabled
        size="small"
      >
        <b> Complain-Status:</b> <b
          :class="
            store.userInfo.status.status == 0
              ? 'text-info'
              : store.userInfo.status.status == 1
                ? ''
                : store.userInfo.status.status == 2
                  ? 'text-success'
                  : store.userInfo.status.status == 3
                    ? 'text-danger'
                    : 'text-warning'
          "
        > {{
          store.userInfo.status.status == 0
            ? "Submitted"
            : store.userInfo.status.status == 1
              ? "In-Progress"
              : store.userInfo.status.status == 2
                ? "Resolved"
                : store.userInfo.status.status == 3
                  ? "Rejected"
                  : "In-Review"
        }} </b>
      </small> 
     
      <p class="text-medium-emphasis mx-0 my-0 px-0 py-0">
        <b> Complain-Detail:</b> {{ store.userInfo.description }}
      </p>
    </div>
  </template>
</template>
