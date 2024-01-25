<template>
  <div class="bg-gradient-to-r from-teal-400 to-blue-500 text-white p-4 w-fit mx-4 my-2 rounded-md ml-auto">
    <h1 class="text-3xl font-bold ml-auto"> {{ chatName }}</h1>
  </div>
  <div class="chat-wrapper h-full flex flex-col bg-white mx-4 my-4 p-4 rounded-md">
    <div ref="chatscroll" class="flex-1 p-4 overflow-y-auto scroll-smooth">
      <div v-for="(message, index) in messages" :key="index" class="mb-2 w-fit bg-blue-300 rounded-md
         px-3 py-1 mr-2 text-black" :class="{ 'ml-auto bg-green-300': message.userId == user._id }">
        <div v-if="message.event === 'message'" class="">
          <div class="text-amber-800" :class="{ 'text-right ': message.userId == user._id }">
            {{ message.userId == user._id ? 'You' : userName(message.userId) }}
          </div>
          <div>
            {{ message.message }}
          </div>
          <div class="ml-auto text-end text-xs text-gray-500">
            {{ formattedDate(message.date) }}
          </div>
        </div>
        <span v-else class="bg-green-300 rounded-md px-3 py-1 mr-2 text-black">{{ message.message }}</span>

      </div>
    </div>
    <div class="flex relative h-12">

      <input v-model="model.message" @keydown.enter="sendMessage" type="text"
        class="p-3 rounded-md border border-gray-300 focus:outline-none w-full text-black"
        placeholder="Type a message...">
      <button @click="sendMessage"
        class="px-4 py-2 bg-blue-500 text-white rounded-md absolute top-1 right-4">Send</button>
    </div>
  </div>
</template>


<script>
import UserCard from '../components/UserCard.vue'
import { mapActions, mapState } from 'pinia'
import { userLogin } from '@/stores/userLogin'
import { usersCache } from '@/stores/usersCache'
import { socketStore } from '@/stores/socketStore'
import { modalState } from '@/stores/modalState'
import api from '../api/index'
import io from 'socket.io-client';
import moment from 'moment';

export default {
  components: {

  },
  props: {
    id: String
  },
  data() {
    return {
      // socket: null,
      model: {
        message: "",
        username: ""
      },
      chatName: "",
      messages: [],
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    id() {
      this.init()
    }
  },
  computed: {
    ...mapState(userLogin, ['user']),
    ...mapState(usersCache, ['cacheUsers']),
    ...mapState(socketStore, ['socket']),

  },

  methods: {
    ...mapActions(usersCache, ['fetchUsers']),
    formattedDate(date) {
      return moment(date).format('hh:mm');
    },
    init() {
      api.chatService.getChatById(this.id).then((data) => {
        this.chatName = data?.data?.title || ""
      })

      api.chatService.getMessagesByRoom(this.id).then((data) => {
        this.messages = data?.data || []
        this.fetchUsers(data?.data.map(x => x.userId))
        this.lastMessageScroll()
      })

      this.connect()
    },
    userName(id) {

      return (this.cacheUsers.find(x => x._id == id) || {})?.username || "Удаленный пользователь" 
    },
    connect() {

      this.socket.emit('joinRoom', { room: this.id, user: this.user.username });
      this.socket.on('message', (event) => {
        const message = JSON.parse(event)
        
        if (message.event == 'message') {

          this.fetchUsers([message.userId]).then(() => {
            this.messages.push(message)
          })
          this.lastMessageScroll()
        }
      })
    },
    sendMessage() {
      if (this.model.message) {
        const message = {
          event: 'message',
          date: new Date(),
          userId: this.user._id,
          roomId: this.id,
          message: this.model.message
        }
        this.socket.emit('chatMessage', { room: this.id, message: JSON.stringify(message) });
        this.model.message = ""
      }
    },
    lastMessageScroll() {
      const e = this.$refs.chatscroll
      if (e) {
        
        setTimeout(() => {
          e.scrollTop = e.scrollHeight;
        },100);
      }
    }
  }
}
</script>

<style scoped>
.chat-wrapper {
  max-height: calc(100% - 90px);
}
</style>

