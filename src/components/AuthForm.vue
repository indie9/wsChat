<template>
	<div class="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
				Войти в аккаунт
			</h2>
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<form class="space-y-6" @submit.prevent="submitForm">
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">
							Email адрес
						</label>
						<div class="mt-1">
							<input id="email" name="text" type="email" v-model="model.email" required
								placeholder="Ваш email или логин"
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
						</div>
					</div>

					<div>
						<label for="password" class="block text-sm font-medium text-gray-700">
							Пароль
						</label>
						<div class="mt-1">
							<input id="password" name="password" type="password" v-model="model.password" required
								placeholder="Ваш пароль"
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
						</div>
					</div>

					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<input id="remember_me" name="remember_me" type="checkbox"
								class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
								v-model="remember" />
							<label for="remember_me" class="ml-2 block text-sm text-gray-900">
								Запомнить меня
							</label>
						</div>

						<div class="text-sm">
							<RouterLink class="font-medium text-indigo-600 hover:text-indigo-500" to="registration">
								Регистрация
							</RouterLink>
						</div>
					</div>

					<div>
						<button type="submit"
							class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Войти
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { userLogin } from '@/stores/userLogin'
import { modalState } from '@/stores/modalState'
import { mapActions } from 'pinia'
import api from '../api/index'
export default {
	data() {
		return {
			model: {
				email: '',
				password: ''
			},
			remember: false
		};
	},
	methods: {
		...mapActions(userLogin, ['tokenSet', 'userSet']),
		...mapActions(modalState, ['openModal']),
		submitForm() {
			return api.auth.login(this.model)
				.then((response) => {
					if (response && response.data && response.data.token) {
						this.tokenSet(response.data.token)
						this.userSet(response.data.user)
						if (this.remember) {
							localStorage.setItem('token', response.data.token)
						}
						this.$router.push('/')
					}
				})
				.catch((error) => {
					this.openModal(
						'ConfirmModal',
						{
							title: `Have some trouble`,
							text: error && error.response && error.response.data  && error.response.data.message || "Registration error",
							disabledCancel: true
						},
						() => {})
				});
		},
	},
};
</script>