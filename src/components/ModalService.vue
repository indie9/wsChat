
<template>
  <div class="h-screen w-screen bg-slate-400/[.6] inset-y-0 overflow-hidden flex items-center fixed ">
    <div class="modal h-auto w-1/2 mx-auto max-w-lg">
      <div class="modal-overlay"></div>
      <div class="modal-container bg-white p-4 rounded-lg shadow-lg">
        <div class="modal-header flex justify-between items-center mb-4">
          <h2 class="modal-title text-2xl text-black">{{ dataModal.title }}</h2>
          <button @click="close" class="modal-close-btn p-2 text-red-500">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
          <component :is="componentModal" :dataModal="dataModal" @close="close" @action="action"></component>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'pinia'
import { modalState } from '@/stores/modalState'
import ConfirmModal from '../components/modals/ConfirmModal.vue'
import EditUserModal from '../components/modals/EditUserModal.vue'
import EditChatModal from '../components/modals/EditChatModal.vue'
export default {
  components: {
    ConfirmModal,
    EditUserModal,
    EditChatModal
  },
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    this.isOpen = true
    document.body.style.overflow = 'hidden';
  },
  computed: {
    ...mapState(modalState, ['isOpenModal','dataModal','componentModal','actionModal']),
  },
  methods: {
    toggleMobileMenu() {
    },
    action(value) {

      this.actionModal(value)
      this.close()
    },
    close() {
      document.body.style.overflow = 'auto';
      this.$emit('close')
    },
  }
}
</script>
<style scoped>
body.modal-open {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
</style>
