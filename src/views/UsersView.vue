<template>
  <main>
    <UserCard v-for="useritem in userList" :user="useritem" :key="useritem._id" class="m-6" @deleteUser="deleteUser(useritem)" @editUser="editUser(useritem)"/>
  </main>
</template>


<script>
import UserCard from '../components/UserCard.vue'
import { mapActions, mapState } from 'pinia'
import { userLogin } from '@/stores/userLogin'
import { modalState } from '@/stores/modalState'
import api from '../api/index'
export default {
  components: {
    UserCard
  },
  data() {
    return {
      userList: []
    }
  },
  mounted() {
    this.fetchUsers()
  },
  computed: {
    ...mapState(userLogin, ['user']),

  },
  methods: {
    ...mapActions(modalState, ['openModal']),
    deleteUser(useritem) {
      this.openModal(
        'ConfirmModal',
        {
          title: `User delete`,
          text: `You want to delete a user ${useritem.username}?`
        },
        () => {
          return api.userService.deleteUser(useritem._id).then(() => {
            this.fetchUsers()
          })
        })
    },
    editUser(useritem) {
      this.openModal(
        'EditUserModal',
        {
          title: `Edit user`,
          user: useritem
        },
        (user) => {
          console.log(user)
          return api.userService.editUser(user).then(() => {
            this.fetchUsers()
          })
        })
    },
    fetchUsers() {
      return api.userService.getUsers()
        .then((data) => {
          if (data && data.data) {
            this.userList = data.data
          }
        })
    }
  }
}
</script>

