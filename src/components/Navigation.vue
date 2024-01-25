<template>
	<nav class="bg-teal-500 mt-0 h-20 flex items-center">
		<div class="mx-auto px-4 w-full">
			<div class="flex justify-between ">
				<div class="flex items-center space-x-4  w-full">
					<!-- Logo -->
					<a href="#" class="text-white font-bold text-lg">Logo</a>

					<!-- Menu Items -->
					<div class="flex items-center w-full">
						<RouterLink to="/" class="text-white hover:text-teal-200">Home</RouterLink>
						<RouterLink  to="/chats" class="text-white hover:text-teal-200">Chat</RouterLink>
						<RouterLink v-if="isAdmin" to="/users" class="text-white hover:text-teal-200">Users</RouterLink>
						<div class="relative ml-auto">
							<div @click="toggleгUserBtn"
								class="p-1 rounded-lg border-double border-4 border-sky-500 flex items-center justify-between cursor-pointer">
								<h2 class="text-xl font-bold text-white mr-2"> {{ user.username }}</h2>
								<img v-if="user.avatar" :src="avatarSRC" class="w-12 h-12 rounded-full object-cover" alt="User Photo" />
								<img v-else src="@/assets/avatar.png" class="w-12 h-12 rounded-full object-cover" alt="User Photo" />
								<svg class="ml-2 w-5 h-5 transform transition-transform rotate-180" :class="{ 'rotate-0': isUserMenuOpen }"
									xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd"
										d="M10 16a1 1 0 0 1-1-1V5.47L4.72 9.69a1 1 0 1 1-1.44-1.38l6-7a1 1 0 0 1 1.44 0l6 7a1 1 0 0 1-1.44 1.38L11 5.47V15a1 1 0 0 1-1 1z"
										clip-rule="evenodd" />
								</svg>
							</div>
							<div v-show="isUserMenuOpen" class="absolute right-0 mt-2 py-2 bg-white rounded-md shadow-lg z-10 w-20">
								<ul>
									<li @click="exit" class="text-black text-left pl-2 w-full cursor-pointer"> Profile</li>
									<li @click="exit" class="text-red-500 text-left pl-2 cursor-pointer"> Exit</li>
								</ul>
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