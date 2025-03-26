<script setup>
import { useComplainCategoryStore } from "@/stores/tourism/complainCategoryStore"
import { useComplainStore } from "@/stores/tourism/complainStore"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import ChatContact from "./ChatContact.vue"
import { useChat } from "./useChat"
import { useChatStore } from "./useChatStore"

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
  "openChatOfContact",
  "showUserProfile",
  "close",
  "update:search",
])

const complainCategoryStore = useComplainCategoryStore()
const complainCategoryList = ref([])
const complainCategory = ref(null)

const getcomplainCategoryList = async () => {
  // loading.value = true

  try {
    const { data } = await complainCategoryStore.getComplainCategory()

    complainCategoryList.value = data.data

    // loading.value = false
  } catch (error) {
    console.log(error)
  }
}

const complainList = ref([])

const getspotList = async () => {
  // size.value = pageSize
  // loading.value = true

  let parameter = {
    page: 1,
    per_page: 100000,
    category_id: complainCategory.value,
    serial: search.value,
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
  getcomplainCategoryList()
})

const complainStore = useComplainStore()
const { resolveAvatarBadgeVariant } = useChat()
const search = ref("")
const store = useChatStore()
</script>

<template>
  <div style="position: fixed">
    <!-- 👉 Chat list header -->
    <div
      class="chat-list-header"
      style="position: sticky; inset-block-start: 0"
    >
      <VRow class="py-4">
        <VCol cols="12">
          <VTextField
            v-model="search"
            v-debounce:300="getspotList"
            placeholder="Search Complain-No"
            clearable
          >
            <template #prepend-inner>
              <VIcon
                size="22"
                icon="tabler-search"
              />
            </template>
          </VTextField>
        </VCol>
        <VCol cols="12">
          <label class="chat-contact-header text-primary text-h5">
            Complains Category
          </label>
          <ElSelect
            v-model="complainCategory"
            clearable
            placeholder="Select Complain Category"
            size="large"
            style="inline-size: 100%"
            class="px-2"
            @change="getspotList"
          >
            <ElOption
              v-for="item in complainCategoryList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </ElSelect>
        </VCol>
      </VRow>
    </div>
    <h5 class="px-2 chat-contact-header text-primary text-h6">
      Complains
    </h5>
    <hr>
    <PerfectScrollbar
      tag="ul"
      class="d-flex flex-column gap-y-1 chat-contacts-list px-3 py-2 list-none"
      :options="{ wheelPropagation: true }"
      style="position: relative; block-size: 100vh; overflow-y: scroll"
    >
      <ChatContact
        v-for="contact in complainList"
        :key="`chat-${contact.id}`"
        :user="contact"
        is-chat-contact
        :complain-list="complainList"
        @click="$emit('openChatOfContact', contact.id, contact)"
      />

      <span
        v-show="!complainList.length"
        class="no-chat-items-text text-disabled"
      >No chats found</span>
    </PerfectScrollbar>
  </div>
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
