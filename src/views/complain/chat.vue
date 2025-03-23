<script setup>
import { themes } from "@/plugins/vuetify/theme"
import { useComplainStore } from "@/stores/tourism/complainStore"
import { defineEmits, ref } from "vue"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import { useDisplay, useTheme } from "vuetify"
import ChatActiveChatUserProfileSidebarContent from "./chat/ChatActiveChatUserProfileSidebarContent.vue"
import ChatLeftSidebarContent from "./chat/ChatLeftSidebarContent.vue"
import ChatLog from "./chat/ChatLog.vue"
import { useChat } from "./chat/useChat"
import { useChatStore } from "./chat/useChatStore"

const emit = defineEmits(["getDetail"])
const complainStore = useComplainStore()

definePage({ meta: { layoutWrapperClasses: "layout-content-height-fixed" } })

// composables
const vuetifyDisplays = useDisplay()
const store = useChatStore()

const { isLeftSidebarOpen } = useResponsiveLeftSidebar(
  vuetifyDisplays.smAndDown,
)

const { resolveAvatarBadgeVariant } = useChat()

// Perfect scrollbar
const chatLogPS = ref()

const scrollToBottomInChatLog = () => {
  const scrollEl = chatLogPS.value.$el || chatLogPS.value

  scrollEl.scrollTop = scrollEl.scrollHeight
}

// Search query
const q = ref("")

watch(q, val => store.fetchChatsAndContacts(val), { immediate: true })

// Open Sidebar in smAndDown when "start conversation" is clicked
const startConversation = () => {
  if (vuetifyDisplays.mdAndUp.value) return
  isLeftSidebarOpen.value = true
}

// image functionality
const typeList = ref([])

const previewImage = ref(null)
const previewFile = ref(null)
const tempImg = ref("")
const tempFile = ref("")

const onFileChange = event => {
  const file = event.target.files[0] // Access file directly from input event

  if (!file) return // Ensure a file is selected

  tempImg.value = file // Store the file

  const reader = new FileReader()

  reader.readAsDataURL(file)
  reader.onload = () => {
    previewImage.value = reader.result // Set preview image
  }
}

// Chat message
const msg = ref("")
const loading = ref(false)

const sendMessage = async () => {
 
  if (!msg.value) return

  // store.activeChat.id
  let form = {
    complain_id: store.activeChat.id,
    image: tempImg.value ? tempImg.value : null,
    description: msg.value,
  }


  try {
    const { data } = await complainStore.replyComplain(form)

    data.status_code == 200
      ? (notify("Congratulations!", data.message, "success", "top-right"),
      openChatOfContact(complainId.value),
      (loading.value = false))
      : ""
    data.status_code == 200 ? ((msg.value = ""),
    (tempImg.value = ""),
    (previewImage.value = null) ): ""
  } catch (error) {
    loading.value = false
    console.log("error", error)
    notify(
      error?.response?.data?.message,
      error?.response?.data?.errors
        ? error?.response?.data?.errors
        : error?.response?.data?.error
          ? error?.response?.data?.error
          : "Something went wrong",
      "error",
      "top-right",
    )
  }

  

  // Reset message input

  // Scroll to bottom
  nextTick(() => {
    scrollToBottomInChatLog()
  })
}

const complainId = ref(null)
const complainUserInfo = ref({})

const openChatOfContact = async (userId, userInfo) => {
  complainUserInfo.value = userInfo
  store.userInfo = complainUserInfo.value
  complainId.value = userId
  await store.getChat(userId)

  // Reset message input
  msg.value = ""

  // Set unseenMsgs to 0
  const contact = store.chatsContacts.find(c => c.id === userId)
  if (contact) contact.chat.unseenMsgs = 0

  // if smAndDown =>  Close Chat & Contacts left sidebar
  if (vuetifyDisplays.smAndDown.value) isLeftSidebarOpen.value = false

  // Scroll to bottom
  nextTick(() => {
    scrollToBottomInChatLog()
  })
}

// User profile sidebar
const isUserProfileSidebarOpen = ref(false)

// Active chat user profile sidebar
const isActiveChatUserProfileSidebarOpen = ref(false)

// file input
const refInputEl = ref()
const { name } = useTheme()

const chatContentContainerBg = computed(() => {
  let color = "transparent"
  if (themes) color = themes?.[name.value].colors?.background

  return color
})
</script>

<template>
  <VLayout
    class="chat-app-layout"
    style="z-index: 0"
  >
    <!-- 👉 Active Chat sidebar chat user info tuhinjamal -->
    <VNavigationDrawer
      v-model="isActiveChatUserProfileSidebarOpen"
      width="374"
      absolute
      temporary
      location="end"
      touchless
      class="active-chat-user-profile-sidebar"
    >
      <ChatActiveChatUserProfileSidebarContent @close="isActiveChatUserProfileSidebarOpen = false" />
    </VNavigationDrawer>

    <!-- 👉 Left sidebar  chat user list tuhinjamal -->
    <VNavigationDrawer
      v-model="isLeftSidebarOpen"
      absolute
      touchless
      location="start"
      width="370"
      :temporary="$vuetify.display.smAndDown"
      class="chat-list-sidebar"
      :permanent="$vuetify.display.mdAndUp"
    >
      <ChatLeftSidebarContent
        v-model:isDrawerOpen="isLeftSidebarOpen"
        v-model:search="q"
        @open-chat-of-contact="openChatOfContact"
        @show-user-profile="isUserProfileSidebarOpen = true"
        @close="isLeftSidebarOpen = false"
      />
    </VNavigationDrawer>

    <!-- 👉 Chat content se -->
    <VMain class="chat-content-container">
      <!-- 👉 Right content: Active Chat -->
      <div
        v-if="store.activeChat"
        class="d-flex flex-column h-100"
      >
        <!-- 👉 Active chat header -->
        <div class="active-chat-header d-flex align-center text-medium-emphasis bg-surface">
          <!-- Sidebar toggler -->
          <IconBtn
            class="d-md-none me-3"
            @click="isLeftSidebarOpen = true"
          >
            <VIcon icon="tabler-menu-2" />
          </IconBtn>

          <!-- avatar -->

          <div
            class="d-flex align-center cursor-pointer"
            @click="isActiveChatUserProfileSidebarOpen = true"
          >
            <VAvatar
              size="40"
              :variant="
                !store.userInfo?.user?.avatar ? 'tonal' : undefined
              "
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

            <div class="flex-grow-1 ms-4 overflow-hidden">
              <div class="text-h6 mb-0 font-weight-regular">
                <p>
                  {{
                    store.userInfo?.user?.name 
                  }}
                </p>
              </div>
            </div>
          </div>
          <br>
         
          <VSpacer />
        </div>

        <VDivider />

        <!-- Chat log -->
        <PerfectScrollbar
          ref="chatLogPS"
          tag="ul"
          :options="{ wheelPropagation: true }"
          class="flex-grow-1"
        >
          <!-- chat reply by tuhinjamal -->
          <ChatLog />
        </PerfectScrollbar>

        <!-- Message form tuhinjamal -->
        <VForm class="chat-log-message-form mb-5 mx-5">
          <VTextField
            :key="store.activeChat.id"
            v-model="msg"
            variant="solo"
            density="default"
            class="chat-message-input"
            placeholder="Type your message..."
            autofocus
          >
            <template #append-inner>
              <img
                v-if="previewImage"
                :src="previewImage"
                alt=""
                height="60"
                width="60"
                class="border mx-2 my-2"
              >
              <div class="d-flex gap-1">
                <IconBtn @click="refInputEl?.click()">
                  <VIcon
                    icon="tabler-paperclip"
                    size="22"
                  />
                </IconBtn>
                <div class="d-none d-md-block">
                  <VBtn
                    append-icon="tabler-send"
                    @click="sendMessage"
                  >
                    Send
                  </VBtn>
                </div>
                <IconBtn
                  class="d-block d-md-none"
                  @click="sendMessage"
                >
                  <VIcon icon="tabler-send" />
                </IconBtn>
              </div>
            </template>
          </VTextField>

          <input
            ref="refInputEl"
            type="file"
            name="file"
            accept=".jpeg,.png,.jpg,GIF"
            hidden
            @change="onFileChange"
          >
        </VForm>
      </div>

      <!-- 👉 Start conversation -->
      <div
        v-else
        class="d-flex h-100 align-center justify-center flex-column"
      >
        <VAvatar
          size="98"
          variant="tonal"
          color="primary"
          class="mb-4"
        >
          <VIcon
            size="50"
            class="rounded-0"
            icon="tabler-message-2"
          />
        </VAvatar>
        <VBtn
          v-if="$vuetify.display.smAndDown"
          rounded="pill"
          @click="startConversation"
        >
          Start Conversation
        </VBtn>

        <p
          v-else
          style="max-inline-size: 40ch; text-wrap: balance"
          class="text-center text-disabled"
        >
          Start connecting with the people by selecting one of the contact on
          left
        </p>
      </div>
    </VMain>
  </VLayout>
</template>

<style lang="scss">
@use "@styles/variables/vuetify";
@use "@core/scss/base/mixins";
@use "@layouts/styles/mixins" as layoutsMixins;

// Variables
$chat-app-header-height: 76px;

// Placeholders
%chat-header {
  display: flex;
  align-items: center;
  min-block-size: $chat-app-header-height;
  padding-inline: 1.5rem;
}

.chat-start-conversation-btn {
  cursor: default;
}

.chat-app-layout {
  border-radius: vuetify.$card-border-radius;

  @include mixins.elevation(vuetify.$card-elevation);

  $sel-chat-app-layout: &;

  @at-root {
    .skin--bordered {
      @include mixins.bordered-skin($sel-chat-app-layout);
    }
  }

  .active-chat-user-profile-sidebar,
  .user-profile-sidebar {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }

  .chat-list-header,
  .active-chat-header {
    @extend %chat-header;
  }

  .chat-list-sidebar {
    .v-navigation-drawer__content {
      display: flex;
      flex-direction: column;
    }
  }
}

.chat-content-container {
  /* stylelint-disable-next-line value-keyword-case */
  background-color: v-bind(chatContentContainerBg);

  // Adjust the padding so text field height stays 48px
  .chat-message-input {
    .v-field__input {
      font-size: 0.9375rem !important;
      line-height: 1.375rem !important;
      padding-block: 0.6rem 0.5rem;
    }

    .v-field__append-inner {
      align-items: center;
      padding-block-start: 0;
    }

    .v-field--appended {
      padding-inline-end: 8px;
    }
  }
}

.chat-user-profile-badge {
  .v-badge__badge {
    /* stylelint-disable liberty/use-logical-spec */
    min-width: 12px !important;
    height: 0.75rem;
    /* stylelint-enable liberty/use-logical-spec */
  }
}
</style>
