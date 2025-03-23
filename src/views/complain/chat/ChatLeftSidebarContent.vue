<script setup>
import { useComplainStore } from "@/stores/tourism/complainStore"
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import ChatContact from './ChatContact.vue'
import { useChat } from './useChat'
import { useChatStore } from './useChatStore'



const props = defineProps({
  search: {
    type: String,
    required: true,
  },
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'openChatOfContact',
  'showUserProfile',
  'close',
  'update:search',
])

const complainList = ref([])

const getspotList = async () => {
  // size.value = pageSize
  // loading.value = true

  let parameter = {
    page: 1,
    per_page: 100000,
  }
  try {
    const { data } = await complainStore.getComplainList(parameter)

    
    complainList.value = data.data.data

  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getspotList(10, 1)
})

const complainStore = useComplainStore()
const { resolveAvatarBadgeVariant } = useChat()
const search = useVModel(props, 'search', emit)
const store = useChatStore()
</script>

<template>
  <!-- 👉 Chat list header -->
  
 

  <PerfectScrollbar
    tag="ul"
    class="d-flex flex-column gap-y-1 chat-contacts-list px-3 py-2 list-none"
    :options="{ wheelPropagation: true }"
  >
    <li class="list-none">
      <h5 class="chat-contact-header text-primary text-h5">
        Chats
      </h5>
    </li>
    
    <ChatContact
      v-for="contact in complainList"
      :key="`chat-${contact.id}`"
      :user="contact"
      is-chat-contact
      :complain-list="complainList"
      @click="$emit('openChatOfContact', contact.id,contact)"
    />

    <span
      v-show="!complainList.length"
      class="no-chat-items-text text-disabled"
    >No chats found</span>
  </PerfectScrollbar>
</template>

<style lang="scss">
.chat-contacts-list {
  --chat-content-spacing-x: 16px;

  padding-block-end: 0.75rem;

  .chat-contact-header {
    margin-block: 0.5rem 0.25rem;
  }

  .chat-contact-header,
  .no-chat-items-text {
    margin-inline: var(--chat-content-spacing-x);
  }
}

.chat-list-search {
  .v-field--focused {
    box-shadow: none !important;
  }
}
</style>
