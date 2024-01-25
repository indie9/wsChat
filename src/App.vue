<template>
	<header v-if="user">
		<Navigation @exit="exit" />
	</header>
	<ConnectionManager />
	<RouterView />
	<ModalService v-if="isOpenModal" :dataModal="dataModal" :componentModal="componentModal" @close="closeModalAction" />
</template>




<script >
import Navigation from '@/components/Navigation.vue'
import ModalService from '@/components/ModalService.vue'
import { RouterLink, RouterView } from 'vue-router'
import { userLogin } from '@/stores/userLogin'
import { modalState } from '@/stores/modalState'
import { mapActions, mapState } from 'pinia'

import api from './api/index'
export default {
	components: {
		Navigation,
		ModalService
	},
	data() {
		return {
			isMobileMenuOpen: false,

		}
	},

	computed: {
		...mapState(userLogin, ['token', 'user', 'isAdmin']),
		...mapState(modalState, ['isOpenModal', 'dataModal', 'componentModal']),

	},
	provide: {
    host: 'https://wschat-nikolayg.amvera.io'
  },
	mounted() {



		const localtoken = localStorage.getItem('token')

		if (localtoken) {
			this.userCheck(localtoken)
		} else {
			this.$router.push('/auth/login')
		}


	},
	methods: {
		...mapActions(userLogin, ['tokenSet', 'userSet']),
		...mapActions(modalState, ['openModal', 'closeModal']),
		userCheck(token) {
			return api.auth.userCheck({ token })
				.then((response) => {
					if (response && response.data) {
						this.userSet(response.data)
						this.$router.push('/')
					} else {
						this.$router.push('/auth/login')
					}
				})
				.catch((error) => {
					this.$router.push('/auth/login')
				});
		},
		exit() {
			this.tokenSet(null)
			this.userSet(null)
			localStorage.setItem('token', "")
			this.$router.push('/auth/login')
		},
		toggleMobileMenu() {
			this.isMobileMenuOpen = !this.isMobileMenuOpen;
		},
		closeModalAction() {
			this.closeModal()
		}
	}
}
</script>


<style scoped></style>
