<template>
  <div class="modal-body text-black mb-8">
      {{ dataModal.text }}
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
  methods: {
    action() {
      this.$emit('action')
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>