<template>
  <div>
    <h1>Welcome!</h1>
    <router-link
      v-if="isUserLoggedIn"
      to="/protected"
    >
      Protected |
    </router-link>
    <router-link
      v-if="isUserLoggedIn"
      to="/profile"
    >
      Profile
    </router-link>
    <br>
    <button
      v-if="!isUserLoggedIn"
      @click="onLogin()"
    >
      Login
    </button>
    <button
      v-else
      @click="onLogout()"
    >
      Logout
    </button>
  </div>
</template>

<script>
import { registerUserLoggedInEventListener, registerUserLoggedOutEventListener } from '../eventBus'

export default {
  name: 'Home',
  data () {
    return {
      isUserLoggedIn: false
    }
  },
  mounted () {
    this.$auth.isUserLoggedIn()
      .then(isLoggedIn => {
        this.isUserLoggedIn = isLoggedIn
      })
      // If somehting goes wrong we assume no user is logged in
      .catch(error => {
        console.log(error)
        this.isUserLoggedIn = false
      })

    registerUserLoggedInEventListener(() => { this.isUserLoggedIn = true })
    registerUserLoggedOutEventListener(() => { this.isUserLoggedIn = false })
  },
  methods: {
    onLogin () {
      this.$auth.login()
    },
    onLogout () {
      this.$auth.logout()
    }
  }
}
</script>
