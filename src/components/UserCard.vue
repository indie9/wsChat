<template>
  <div class="bg-white rounded-lg shadow-lg p-4 w-96 flex flex-row">
    <div class="flex flex-row items-center ">
      <img v-if="user.avatar" :src="avatarSRC" class="w-16 h-16 rounded-full object-cover" alt="User Photo" />
      <img v-else src="@/assets/avatar.png" class="w-16 h-16 rounded-full object-cover" alt="User Photo" />
      <div class="ml-4">
        <h2 class="text-xl font-bold text-gray-500"> {{ user.username }}</h2>
        <p class="text-gray-500"> {{ user.email }} </p>
        <p v-if="isAdmin" class="text-red-500"> Administrator </p>
      </div>
    </div>
    <button v-if="!isMaster" @click="editUser"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full h-8 w-8 p-1 ml-auto">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M15.728 9.68601L14.314 8.27201L5 17.586V19H6.414L15.728 9.68601ZM17.142 8.27201L18.556 6.85801L17.142 5.44401L15.728 6.85801L17.142 8.27201ZM7.242 21H3V16.757L16.435 3.32201C16.6225 3.13454 16.8768 3.02922 17.142 3.02922C17.4072 3.02922 17.6615 3.13454 17.849 3.32201L20.678 6.15101C20.8655 6.33853 20.9708 6.59284 20.9708 6.85801C20.9708 7.12317 20.8655 7.37748 20.678 7.56501L7.243 21H7.242Z"
          fill="currentColor" />
      </svg>

    </button>
    <button v-if="!isMaster" @click="deleteUser"
      class="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full h-8 w-8 ml-2">
      X
    </button>
  </div>
</template>
<script>

export default {
  props: {
    user: Object
  },
  inject: ['host'],
  computed: {
    avatarSRC() {
      return this.host + '/' + this.user.avatar;
    },
    isAdmin() {
      return this.user.roles.includes('ADMIN')
    },
    isMaster() {
      return this.user.roles.includes('MASTER')
    }
  },
  methods: {
    deleteUser() {
      this.$emit('deleteUser')
    },
    editUser() {
      this.$emit('editUser')
    }
  }
}
</script>