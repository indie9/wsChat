<template>
	<div class="modal-body text-black mb-8">
		<form class="space-y-6" @submit.prevent="submitForm">
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">
					Название чата
				</label>
				<div class="mt-1">
					<input id="title" name="title" type="text" v-model="model.title" required placeholder="Название"
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black" />
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer text-right text-black">
		<button @click="close" class="modal-btn-cancel bg-gray-300 p-2 rounded-md mr-2">Отмена</button>
		<button @click="action" class="modal-btn-confirm bg-green-500 text-white p-2 rounded-md">Сохранить</button>
	</div>
</template>

<script>
import { userLogin } from '@/stores/userLogin'
import { mapActions, mapState } from 'pinia'
export default {
	props: {
		dataModal: Object
	},
	data() {
		return {
			model: {},
		}
	},
	computed: {
		...mapState(userLogin, ['user']),
		currentUserId() {
			return this.user
		}
	},
	mounted() {
		this.model = {
			author: this.dataModal.chat?.author?._id || this.currentUserId._id,
			title: this.dataModal.chat?.title || "",
			_id: this.dataModal.chat?._id || null,
		}
	},
	methods: {
		action() {
			this.$emit('action', this.model)
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