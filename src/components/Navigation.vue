<template>
	<nav class="bg-teal-500 mt-0 h-20 flex items-center">
		<div class="mx-auto px-4 w-full">
			<div class="flex justify-between ">
				<div class="flex items-center space-x-4  w-full">
					<!-- Logo -->
					<img src="@/assets/logo.png" class="w-40 h-20 object-cover" alt="User Photo" />
					<!-- Menu Items -->
					<div class="flex items-center w-full text-xl">
						<RouterLink to="/" class="text-white hover:text-teal-200" active-class="text-orange-200">Home</RouterLink>
						<RouterLink to="/chats" class="text-white hover:text-teal-200" active-class="text-orange-200">Chat</RouterLink>
						<RouterLink v-if="isAdmin" to="/users" class="text-white hover:text-teal-200" active-class="text-orange-200">Users</RouterLink>
						<div class="relative  ml-auto" @click="toggleгUserBtn">
							<button
								class="flex items-center space-x-2 rounded-md bg-gray-100 text-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-indigo-500">
								<img v-if="user.avatar" :src="avatarSRC" class="w-10 h-10 rounded-full object-cover" alt="User Photo" />
								<img v-else src="@/assets/avatar.png" class="w-10 h-10 rounded-full object-cover" alt="User Photo" />
								<span>{{ user.username }}</span>
								<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
									:class="{'rotate-0': isUserMenuOpen, 'rotate-180' : !isUserMenuOpen}"
									aria-hidden="true">
									<path fill-rule="evenodd"
										d="M9.293 4.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 6.414 4.707 11.707a1 1 0 01-1.414-1.414l6-6z"
										clip-rule="evenodd" />
								</svg>
							</button>

							<!-- <div v-if="isUserMenuOpen" @click="toggleгUserBtn" class="fixed inset-0 z-10"></div> -->

							<div v-if="isUserMenuOpen"
								class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
								<button @click="exit"
									class="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">Выход</button>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>
	</nav>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { userLogin } from '@/stores/userLogin'
import { modalState } from '@/stores/modalState'
export default {
	data() {
		return {
			isUserMenuOpen: false
		}
	},
	inject: ['host'],
	computed: {
		...mapState(userLogin, ['user', 'isAdmin']),
		avatarSRC() {
			return this.host + this.user.avatar;
		},
	},
	methods: {
		...mapActions(modalState, ['openModal', 'closeModal']),
		toggleгUserBtn() {
			this.isUserMenuOpen = !this.isUserMenuOpen;
		},
		exit() {
			this.$emit('exit')
		},
	}
}
</script>