<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand><nuxt-link to="/">App</nuxt-link></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/news">News</b-nav-item>
        <b-nav-item to="/profile">Profile</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="!$store.state.auth">
        <b-nav-item to="/login">Login</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>Admin</em>
          </template>
          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
const Cookie = require('js-cookie')

export default {
  methods: {
    logout() {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        Cookie.remove('auth')
        this.$store.commit('setAuth', null)
        this.$router.push('/')
        this.$nuxt.$loading.finish()
      }, 500)
    },
  },
}
</script>
