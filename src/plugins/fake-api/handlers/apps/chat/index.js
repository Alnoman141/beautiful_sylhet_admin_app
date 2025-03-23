import { db } from '@db/apps/chat/db'
import { rest } from 'msw'

export const handlerAppsChat = [
  // 🔹 GET Chat Contacts & Profile Data
  rest.get('/api/apps/chat/chats-and-contacts', (req, res, ctx) => {
    const q = req.url.searchParams.get('q')?.toLowerCase() || ''

    // Create list of chat contacts
    const chatsContacts = db.chats
      .map(chat => {
        const contact = JSON.parse(JSON.stringify(db.contacts.find(c => c.id === chat.userId)))

        if (contact) {
          contact.chat = {
            id: chat.id,
            unseenMsgs: chat.unseenMsgs,
            lastMessage: chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null,
          }
        }

        return contact
      })
      .filter(c => c && c.fullName.toLowerCase().includes(q))
      .reverse()

    // Response data
    const response = {
      chatsContacts,
      contacts: db.contacts.filter(c => c.fullName.toLowerCase().includes(q)),
      profileUser: db.profileUser,
    }

    return res(ctx.status(200), ctx.json(response))
  }),

  // 🔹 GET Specific Chat by User ID
  rest.get('/api/apps/chat/chats/:userId', (req, res, ctx) => {
    const userId = Number(req.params.userId)
    const chat = db.chats.find(e => e.userId === userId)

    if (chat) {
      chat.unseenMsgs = 0
    }

    return res(ctx.status(200), ctx.json({
      chat,
      contact: db.contacts.find(c => c.id === userId),
    }))
  }),

  // 🔹 POST New Message to Chat
  rest.post('/api/apps/chat/chats/:userId', async (req, res, ctx) => {
    const chatId = Number(req.params.userId)

    // Get message from request body
    const { message, senderId } = await req.json()

    const newMessageData = {
      message,
      time: new Date().toISOString(),
      senderId,
      feedback: {
        isSent: true,
        isDelivered: false,
        isSeen: false,
      },
    }

    // Check if chat exists
    let activeChat = db.chats.find(chat => chat.userId === chatId)
    let isNewChat = false

    if (!activeChat) {
      isNewChat = true
      activeChat = {
        id: db.chats.length + 1,
        userId: chatId,
        unseenMsgs: 0,
        messages: [newMessageData],
      }
      db.chats.push(activeChat)
    } else {
      activeChat.messages.push(newMessageData)
    }

    // Construct response
    const response = { msg: newMessageData }
    if (isNewChat) {
      response.chat = activeChat
    }

    return res(ctx.status(201), ctx.json(response))
  }),
]
