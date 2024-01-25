

<template>
  <div class="flex main-wrapper h-full">
    <div class="w-1/4 bg-gray-200 p-4 max-h-full">
      <div class="flex items-center min-h-10">
        <button @click="addChat(null)" v-if="isAdmin"
          class="flex bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            class="mr-2 hover:bg-blue-500" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          Add chat
        </button>
        <div class="flex items-center ml-auto">
          <p class="mr-2 text-gray-600">Online: {{ usersCount }}</p>
          <div class="h-3 w-3 bg-green-500 rounded-full animate-ping"></div>
        </div>
      </div>

      <div class="chatl-list-wrapper overflow-y-auto ">
        <div v-for="chat in chatsList" :key="chat._id" @click="enterRoom(chat._id)"
          :class="{ 'bg-[#DCFCE7] hover:bg-green-200': chat._id == currentChat }"
          class="cursor-pointer rounded-lg shadow-lg p-2 bg-white bg-green-100 hover:bg-gray-100 mb-2 mr-2 relative group"
          >
          <div class="m-1">
            <div>
              <h3 class="text-lg font-bold mb-2 text-black">{{ chat.title }}</h3>
              <p class="text-sm text-gray-600 mb-1 flex items-center">

              <div class="text-l">
                By
              </div>

              <span class="text-l font-bold text-black ml-2 mr-2"> {{ chat.author?.username || "Удалён" }}</span>
              <img v-if="chat.author?.avatar" :src="avatarSRC(chat.author?.avatar)"
                class="w-6 h-6 rounded-full object-cover" alt="User Photo" />
              <img v-else src="@/assets/avatar.png" class="w-6 h-6 rounded-full object-cover" alt="User Photo" />
              </p>
            </div>
          </div>
          <div v-if="chat.author?._id == user._id" class="absolute hidden items-center right-2 top-2 group-hover:flex">
            <button v-if="true" @click.stop="addChat(chat)"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full h-6 w-6 p-1 ml-auto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.728 9.68601L14.314 8.27201L5 17.586V19H6.414L15.728 9.68601ZM17.142 8.27201L18.556 6.85801L17.142 5.44401L15.728 6.85801L17.142 8.27201ZM7.242 21H3V16.757L16.435 3.32201C16.6225 3.13454 16.8768 3.02922 17.142 3.02922C17.4072 3.02922 17.6615 3.13454 17.849 3.32201L20.678 6.15101C20.8655 6.33853 20.9708 6.59284 20.9708 6.85801C20.9708 7.12317 20.8655 7.37748 20.678 7.56501L7.243 21H7.242Z"
                  fill="currentColor" />
              </svg>

            </button>
            <button v-if="!isMaster" @click.stop="deleteChat(chat)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full h-6 w-6 ml-2">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-3/4 bg-white p-4 max-h-full bg-gradient-to-b from-gray-100 to-gray-300">
      <RouterView :key="$route.fullPath"/>


          <h1  v-if="!currentChat" class="text-4xl font-bold text-center text-gray-300 mt-32">Выберите комнату</h1>

    </div>
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue'
import { mapActions, mapState } from 'pinia'
import { userLogin } from '@/stores/userLogin'
import { modalState } from '@/stores/modalState'
import { socketStore } from '@/stores/socketStore'
import api from '../api/index'
export default {
  components: {
    UserCard
  },
  data() {
    return {
      chatsList: [],
      currentChat: null,
      usersCount: null
    }
  },
  mounted() {
    this.fetchChats()
    this.connection()
    this.socket.on('online', (event) => {
      this.usersCount = JSON.parse(event)?.count
    })
  },
  beforeDestroy() {
    this.socket.disconnect();
  },
  beforeRouteLeave() {
    this.socket.disconnect();
  },
  computed: {
    ...mapState(userLogin, ['user']),
    ...mapState(socketStore, ['socket']),
    isAdmin() {
      return this.user?.roles?.includes('ADMIN')
    },
  },
  inject: ['host'],
  methods: {
    ...mapActions(modalState, ['openModal']),
    ...mapActions(socketStore, ['connection']),
    avatarSRC(id) {
      return this.host + id;
    },
    addChat(chat = null) {
      this.openModal(
        'EditChatModal',
        {
          title: chat ? `Edit chat` : 'Create chat',
          chat: chat
        },
        (dto) => {
          if (!!chat) {
            return api.chatService.edit(dto).then(() => {
              this.fetchChats()
            })

          } else {
            return api.chatService.create(dto).then(() => {
              this.fetchChats()
            })
          }
        })
    },
    deleteChat(chat) {
      this.openModal(
        'ConfirmModal',
        {
          title: `Chat delete`,
          text: `You want to delete a chat ${chat.title}?`
        },
        () => {
          return api.chatService.deleteChat(chat._id).then(() => {
            if (this.currentChat == chat._id) {
              this.currentChat = null
              this.$router.push(`/chats`);
            }
            this.fetchChats()

          })
        })

    },
    fetchChats() {
      return api.chatService.getChats()
        .then((data) => {
          if (data && data.data) {
            this.chatsList = data.data
          }
        })
    },
    enterRoom(id) {
      this.currentChat = id
      // this.$router.push({ name: 'room', params: { id }})
      this.$router.push(`/chats/${id}`, { params: { id: id } });
    }
  }
}
</script>
<style scoped>
.main-wrapper {
  max-height: calc(100vh - 80px);
}

.chatl-list-wrapper {
  max-height: calc(100% - 60px);
}
</style>
