import { useComplainStore } from "@/stores/tourism/complainStore"

const complainStore = useComplainStore()
export const useChatStore = defineStore("chat", {
  // ℹ️ arrow function recommended for full type inference
  state: () => ({
    contacts: [],
    chatsContacts: [],
    profileUser: undefined,
    activeChat: null,
    userInfo: null,
  }),
  actions: {
    async fetchChatsAndContacts(q) {
      const { data, error } = await useApi(
        createUrl("/apps/chat/chats-and-contacts", {
          query: {
            q,
          },
        }),
      )

      if (error.value) {
        console.log(error.value)
      } else {
        const { chatsContacts, contacts, profileUser } = data.value

        this.chatsContacts = chatsContacts
        this.contacts = contacts
        this.profileUser = profileUser
      }
    },
    async getChat(userId) {
      const { data } = await complainStore.editComplain({ id: userId })

      this.activeChat = data.data
    },

    async sendMsg(message) {
      const senderId = this.profileUser?.id

      const { data, error } = await useApi(
        createUrl(`/apps/chat/chats/${this.activeChat?.contact.id}`),
        {
          method: "POST",
          body: JSON.stringify({ message, senderId }),
          headers: { "Content-Type": "application/json" },
        },
      )

      if (error.value) {
        console.log(error.value)
      } else {
        const { msg, chat } = data.value

        if (chat !== undefined) {
          this.chatsContacts.push({
            ...this.activeChat.contact,
            chat: {
              id: chat.id,
              lastMessage: [],
              unseenMsgs: 0,
              messages: [msg],
            },
          })
          if (this.activeChat) {
            this.activeChat.chat = {
              id: chat.id,
              messages: [msg],
              unseenMsgs: 0,
              userId: this.activeChat.contact.id,
            }
          }
        } else {
          this.activeChat?.chat?.messages.push(msg)
        }

        const contact = this.chatsContacts.find(
          c => c.id === this.activeChat?.contact.id,
        )

        if (contact) {
          contact.chat.lastMessage = msg
        }
      }
    },

  },
})
