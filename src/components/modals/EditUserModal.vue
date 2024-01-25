<template>
  <div class="modal-body text-black mb-8">
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
            <img v-if="dataModal.user.avatar && !avatarEdited" :src="host + '/' + dataModal.user.avatar"  alt="User Photo" />
						<div ref="imgContainer"></div>
						<div class="mt-1">
							<input type="file" ref="imgInput" @change="uploadImg" />
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
  data() {
    return {
      model: {},
      isAdmin: false,
      avatarEdited: false
    }
  },
  mounted() {
    this.model = {...this.dataModal.user}
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
		}
  }
}
</script>