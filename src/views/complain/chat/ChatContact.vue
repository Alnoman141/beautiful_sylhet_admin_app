<script setup>
import { useChat } from "./useChat"
import { useChatStore } from "./useChatStore"

const props = defineProps({
  isChatContact: {
    type: Boolean,
    required: false,
    default: false,
  },
  user: {
    type: null,
    required: true,
  },
  complainList: {
    type: Array,
    default: () => [],
  },
})

const store = useChatStore()
const { resolveAvatarBadgeVariant } = useChat()

const isChatContactActive = computed(() => {
  const isActive = store.activeChat?.id === props.user.id
  if (!props.isChatContact) return !store.activeChat?.replies && isActive

  return isActive
})
</script>

<template>
  <li
    :key="complainList.length"
    class="chat-contact cursor-pointer d-flex align-center"
    :class="{ 'chat-contact-active': isChatContactActive }"
  >
    <VAvatar
      size="50"
      :variant="!props.user.user.avatar ? 'tonal' : undefined"
      :color="
        !props.user.user.avatar
          ? resolveAvatarBadgeVariant(props.user.user.status)
          : undefined
      "
    >
      <VImg
        v-if="props.user.user.avatar"
        :src="props.user.user.avatar"
        alt="John Doe"
      />
      <span v-else>{{ avatarText(user.user.name) }}</span>
    </VAvatar>
    
    <div class="d-flex align-start  flex-column mx-2 py-1">
      <b class="text-base text-high-emphasis mb-0">
        {{ props.user.user.name }} </b>
      <small>No: {{ props.user.serial }}</small>
      <small>Category: {{ props.user.category.name }}</small>
    </div>
  </li>
</template>

<style lang="scss">
//@use "@core/scss/template/mixins" as templateMixins;
@use "@styles/variables/vuetify.scss";
@use "@core/scss/base/mixins";
@use "vuetify/lib/styles/tools/states" as vuetifyStates;

.chat-contact {
  border-radius: vuetify.$border-radius-root;
  padding-block: 8px;
  padding-inline: 12px;

  @include mixins.before-pseudo;
  @include vuetifyStates.states($active: false);

  &.chat-contact-active {
    // @include templateMixins.custom-elevation(var(--v-theme-primary), "sm");

    background: rgb(var(--v-theme-primary));
    color: #fff;

    --v-theme-on-background: #fff;
  }

  .v-badge--bordered .v-badge__badge::after {
    color: #fff;
  }
}
</style>
