<script setup>
import { useChatStore } from './useChatStore'

const store = useChatStore()



const contact = computed(() => ({
 
  id: store.activeChat?.user_id,
  avatar: store.activeChat?.replies[1]?.user.avatar,
}))

const resolveFeedbackIcon = feedback => {
  if (feedback.isSeen)
    return {
      icon: 'tabler-checks',
      color: 'success',
    }
  else if (feedback.isDelivered)
    return {
      icon: 'tabler-checks',
      color: undefined,
    }
  else
    return {
      icon: 'tabler-check',
      color: undefined,
    }
}

const msgGroups = computed(() => {
  
  let messages = []
  const _msgGroups = []
  if (store.activeChat.replies) {
    messages = store.activeChat.replies

    let msgSenderId = messages[0]?.user_id
    let msgGroup = {
      senderId: msgSenderId,
      messages: [],
    }
    messages.forEach((msg, index) => {
      
      if (msgSenderId === msg.senderId) {
        msgGroup.messages.push({
          message: msg.description,
          image: msg.image,
          time: msg.updated_at,
          feedback: 'seen',
        })
      } else {
        
        msgSenderId = msg.user_id
        _msgGroups.push(msgGroup)
        msgGroup = {
          senderId: msg.user_id,
          messages: [{
            message: msg.description,
            image: msg.image,
            time: msg.time,
            feedback: 'seen',
          }],
        }
      }
      if (index === messages.length - 1)
        _msgGroups.push(msgGroup)
    })
  }
  
  return _msgGroups
})
</script>

<template>
  <div class="chat-log pa-6">
    <div
      v-for="(msgGrp, index) in msgGroups"
      :key="msgGrp.senderId + String(index)"
      class="chat-group d-flex align-start"
      :class="[{
        'flex-row-reverse': msgGrp.senderId !== contact.id,
        'mb-6': msgGroups.length - 1 !== index,
      }]"
    >
      <div
        class="chat-avatar"
        :class="msgGrp.senderId !== contact.id ? 'ms-4' : 'me-4'"
      >
        <VAvatar size="32">
          <VImg :src="msgGrp.senderId === contact.id ? contact.avatar : store.activeChat.replies[0].user.avatar" />
        </VAvatar>
      </div>
      <div
        class="chat-body d-inline-flex flex-column"
        :class="msgGrp.senderId !== contact.id ? 'align-end' : 'align-start'"
      >
        <div
          v-for="(msgData, msgIndex) in msgGrp.messages"
          :key="msgData.time"
          class="chat-content py-2 px-4 elevation-2"
          style="background-color: rgb(var(--v-theme-surface));"
          :class="[
            msgGrp.senderId === contact.id ? 'chat-left' : 'bg-primary text-white chat-right',
            msgGrp.messages.length - 1 !== msgIndex ? 'mb-2' : 'mb-1',
          ]"
        >
          <p class="mb-0 text-base">
            {{ msgData.message }}
          </p>
         
          <VImg
            v-if="msgData.image"
            :src="msgData.image"
            class="mt-2"
            width="400"
            height="400"
          />
        </div>
        <!--
          <div :class="{ 'text-right': msgGrp.senderId !== contact.id }">
          <VIcon
          v-if="msgGrp.senderId !== contact.id"
          size="16"
          :color="resolveFeedbackIcon(msgGrp.messages[msgGrp.messages.length - 1].feedback).color"
          >
          {{ resolveFeedbackIcon(msgGrp.messages[msgGrp.messages.length - 1].feedback).icon }}
          </VIcon>
          <span class="text-sm ms-2 text-disabled">{{ formatDate(msgGrp.messages[msgGrp.messages.length - 1].time, { hour: 'numeric', minute: 'numeric' }) }}</span>
          </div> 
        -->
      </div>
    </div>
  </div>
</template>

<style lang=scss>
.chat-log {
  .chat-body {
    max-inline-size: calc(100% - 6.75rem);

    .chat-content {
      border-end-end-radius: 6px;
      border-end-start-radius: 6px;

      p {
        overflow-wrap: anywhere;
      }

      &.chat-left {
        border-start-end-radius: 6px;
      }

      &.chat-right {
        border-start-start-radius: 6px;
      }
    }
  }
}
</style>
