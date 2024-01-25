<template>
  <main>
    This is Home page, you did it!
  </main>
</template>


<script>
import { mapActions, mapState } from 'pinia'
import { userLogin } from '@/stores/userLogin'
export default {
  computed: {
    ...mapState(userLogin, ['user']),
  }
}
</script>

