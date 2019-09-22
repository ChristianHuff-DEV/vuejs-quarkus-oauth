<template>
  <p>{{ message }}</p>
</template>

<script>
import { getSecretMessage } from '../api'

export default {
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    getSecretMessage()
      .then(response => {
        this.message = response.data.message
      })
      .catch((error) => {
        if (error.response.status === 403) {
          this.message = 'You are not allowed to see the secret message!'
        } else {
          this.message = ''
        }
      })
  }
}
</script>

<style>
</style>
