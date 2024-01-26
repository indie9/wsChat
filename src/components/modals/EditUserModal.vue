<template>
  <div class="modal-body text-black mb-8 ">
    <form class="space-y-6" @submit.prevent="submitForm">
					<div>
						<label for="username" class="block text-sm font-medium text-gray-700">
							Ваше имя или псевдоним
						</label>
						<div class="mt-1">
							<input id="username" name="username" type="text" v-model="model.username" required placeholder="Никнейм"
								class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
						</div>
					</div>

          <div class="flex items-center">
            <input type="checkbox" ref="isAdmin" v-model="isAdmin" class="mr-2 h-4 w-4" />
						<label for="isAdmin" class="block text-sm font-medium text-gray-700">
							Назначить администратором
						</label>
					</div>

					<div>
						<label for="passwordRepeat" class="block text-sm font-medium text-gray-700">
							Аватар пользователя
						</label>
						<img v-if="uploadPhoto && !avatarEdited" :src="host + dataModal.user.avatar" class="max-h-96" alt="User Photo" />
						<div ref="imgContainer" class="max-h-96"></div>
						<img v-if="!uploadPhoto" src="@/assets/avatar.png" class="w-16 h-16 rounded-full object-cover max-h-96"
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

					
          
				</form>
  </div>
  <div class="modal-footer text-right text-black">
    <button @click="close" v-if="!dataModal.disabledCancel" class="modal-btn-cancel bg-gray-300 p-2 rounded-md mr-2">Отмена</button>
    <button @click="action" class="modal-btn-confirm bg-green-500 text-white p-2 rounded-md">Подтвердить</button>
  </div>
</template>

<script>
export default {
  props: {
    dataModal: Object
  },
	inject: ['host'],
  data() {
    return {
      model: {},
      isAdmin: false,
      avatarEdited: false,
			uploadPhoto: false,
    }
  },
  mounted() {
    this.model = {...this.dataModal.user}
		this.uploadPhoto = this.model.avatar
    this.isAdmin = this.dataModal.user.roles.includes("ADMIN")
  },
  methods: {
    action() {
      let dataRequest = new FormData();

			dataRequest.append('_id', this.model._id)
			dataRequest.append('username', this.model.username)
      if (this.isAdmin) {
        dataRequest.append('isadmin',true)
      } 
			if (this.$refs.imgInput.files && this.$refs.imgInput.files.length) {
				dataRequest.append('avatar', this.$refs.imgInput.files[0])
			} else if (this.avatarEdited) {
				dataRequest.append('avatar', '')
			}
      this.$emit('action',dataRequest)
    },
    close() {
      this.$emit('close')
    },
    uploadImg(event) {
      this.avatarEdited = true
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
			this.avatarEdited = true
			const imgInput = this.$refs['imgInput'];
			const imgContainer = this.$refs['imgContainer'];
			imgContainer.innerHTML = ''
			imgInput.value = ''
			this.uploadPhoto = false
			
		}
  }
}
</script>