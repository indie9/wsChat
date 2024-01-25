import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const modalState = defineStore('modalState', {
  state: () => {
    return { 
      isOpenModal: false,
      dataModal: null,
      componentModal: null,
      actionModal: () => {}
    }
  },
  actions: {
    openModal(componentModal,dataModal,actionModal) {
      this.dataModal = dataModal
      this.componentModal = componentModal
      this.actionModal = actionModal || (() => {})
      this.isOpenModal = true
    },
    closeModal() {
      this.dataModal = null
      this.actionModal = () => {}
      this.componentModal = null
      this.isOpenModal = false
    },
  },
})