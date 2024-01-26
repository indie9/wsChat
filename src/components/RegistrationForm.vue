<template>
	<div class="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-md">
			<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 ml-5">
				Создать аккаунт
			</h2>
		</div>

		<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
				<form class="space-y-6" @submit.prevent="submitForm">
					<div class="text-sm ">
						<RouterLink class="font-medium text-indigo-600 hover:text-indigo-500" to="login">
							Назад
						</RouterLink>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">
							Email адрес
						</label>
						<div class="mt-1">
							<input id="email" name="email" type="email" v-model="model.email" required placeholder="Ваш email или логин"
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
						</div>
					</div>

					<div>
						<label for="username" class="block text-sm font-medium text-gray-700">
							Ваше имя или псевдоним
						</label>
						<div class="mt-1">
							<input id="username" name="username" type="text" v-model="model.username" required placeholder="Никнейм"
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

					<div>
						<label for="passwordRepeat" class="block text-sm font-medium text-gray-700">
							Повторите пароль
						</label>
						<div class="mt-1">
							<input id="passwordRepeat" name="passwordRepeat" type="password" v-model="passwordRepeat" required
								placeholder="Ваш пароль еще раз"
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
						</div>
					</div>
					<div>
						<label for="passwordRepeat" class="block text-sm font-medium text-gray-700">
							Аватар пользователя
						</label>

						<div ref="imgContainer" ></div>
						<img v-if="!uploadPhoto" src="@/assets/avatar.png" class="w-16 h-16 rounded-full object-cover"
							alt="User Photo" />

						<div class="mt-4">

								<label for="photo" class="cursor-pointer px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600  hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out">
									{{ !uploadPhoto ? 'Загрузить' : 'Заменить' }}
								</label>

							<button type="button" @click="clearImg" v-if="uploadPhoto"
								class="ml-5 py-2 px-4 border border-transparent border-indigo-500 text-sm leading-5 font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100  focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-800 transition duration-150 ease-in-out">
								Очистить
							</button>
							<input id="photo" type="file" ref="imgInput" @change="uploadImg" class="sr-only" />
						</div>
					</div>


					<div>
						<button type="submit"
							class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Зарегистрироваться
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../api/index'
import { modalState } from '@/stores/modalState'
import { mapActions, mapState } from 'pinia'
export default {
	data() {
		return {
			model: {
				email: '',
				password: '',
				username: ''
			},
			passwordRepeat: '',
			uploadPhoto: false,
		};
	},
	methods: {
		...mapActions(modalState, ['openModal']),
		submitForm() {
			let dataRequest = new FormData();

			dataRequest.append('email', this.model.email)
			dataRequest.append('password', this.model.password)
			dataRequest.append('username', this.model.username)
			if (this.$refs.imgInput.files && this.$refs.imgInput.files.length) {
				dataRequest.append('avatar', this.$refs.imgInput.files[0])
			}
			return api.auth.registration(dataRequest)
				.then((response) => {
					console.log(response)
					this.openModal(
						'ConfirmModal',
						{
							title: `Registration success`,
							text: `User ${response.data.username} has been created!`,
							disabledCancel: true
						},
						() => {
							this.$router.push("login")
						})

				})
				.catch((error) => {
					this.openModal(
						'ConfirmModal',
						{
							title: `Have some trouble`,
							text: error && error.response && error.response.data && error.response.data.message || "Registration error",
							disabledCancel: true
						},
						() => { })
				});
		},
		uploadImg(event) {
			const imgContainer = this.$refs['imgContainer'];
			const fileReader = new FileReader();
			const [imageFile] = event.target.files;
			fileReader.onload = () => {
				const srcData = fileReader.result;
				const img = new Image();
				img.src = srcData;
				imgContainer.innerHTML = ''
				imgContainer.append(img);
			}
			fileReader.readAsDataURL(imageFile);
			this.uploadPhoto = true
		},
		clearImg() {
			const imgInput = this.$refs['imgInput'];
			const imgContainer = this.$refs['imgContainer'];
			imgContainer.innerHTML = ''
			imgInput.value = ''
			this.uploadPhoto = false
		}
	},
};
</script>                                                                        