<template>
  <div>
    <h2>Profile</h2>
    <template v-if="profile !== null">
      <p>User: {{ profile.preferred_username }}</p>
      Roles:
      <ul v-if="profile.realm_access">
        <li
          v-for="role in profile.realm_access.roles"
          :key="role"
        >
          {{ role }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>

export default {
  data () {
    return {
      profile: null
    }
  },
  mounted () {
    this.$auth.getProfile()
      .then(profile => {
        this.profile = profile
      })
      .catch(error => {
        console.log(error)
        this.profile = {}
      })
  }

}
</script>

<style>

</style>
