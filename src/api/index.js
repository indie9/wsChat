// import store from '@/store'
import axios from 'axios'
// const baseUrl = "http://localhost:80"
const baseUrl = "https://wschat-nikolayg.amvera.io"
const api = {
	auth : {
		userCheck: (dto) => {
			return axios({
        method: 'POST',
        url: baseUrl + '/auth/check',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: dto
      })
		},
		login: (dto) => {
			return axios({
        method: 'POST',
        url: baseUrl + '/auth/login',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        data: dto
      })
		},
		registration: (dto) => {
			return axios({
        method: 'POST',
        url: baseUrl + '/auth/registration',
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
        data: dto
      })
		}
	},
  userService: {
    getUsers: () => {
      return axios({
        method: 'GET',
        url: baseUrl + '/users/all',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
    },
    findUsers: (dto) => {
      return axios({
        method: 'POST',
        url: baseUrl + '/users/find',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: dto
      })
    },
    deleteUser: (id) => {
      return axios({
        method: 'DELETE',
        url: baseUrl + '/users/' + id,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
    },
    editUser: (dto) => {
      return axios({
        method: 'PUT',
        url: baseUrl + '/users/edit',
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
        data: dto
      })
    },

  },
  chatService: {
    create: (dto) => {
			return axios({
        method: 'POST',
        url: baseUrl + '/rooms/create',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        data: dto
      })
		},
    edit: (dto) => {
			return axios({
        method: 'PUT',
        url: baseUrl + '/rooms/edit',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        data: dto
      })
		},
    deleteChat: (id) => {
			return axios({
        method: 'DELETE',
        url: baseUrl + `/rooms/${id}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
		},
    getChats: () => {
      return axios({
        method: 'GET',
        url: baseUrl + '/rooms/all',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
    },
    getChatById: (id) => {
      return axios({
        method: 'GET',
        url: baseUrl + `/rooms/${id}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
    },

    getMessagesByRoom: (id) => {
      return axios({
        method: 'GET',
        url: baseUrl + `/rooms/messages/${id}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
    },
  }
}

export default api
