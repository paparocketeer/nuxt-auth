<template>
  <div class="container">
    <b-form @submit.prevent="login">
      <b-form-group id="input-group-1" label="Login" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.login"
          type="text"
          required
          placeholder="Enter login"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>      
    </b-form>
    <b-toast id="loginFailedToast" title="Ошибка" class="mt-3" static>
      Имя пользователя или пароль введены не верно
    </b-toast>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

const Cookie = require('js-cookie')

export default {
  middleware: 'redirectOnAuth',
  data() {
    return {
      form: {
        password: '',
        login: '',
      },
      loginFailed: false,
    }
  },
  methods: {
    login() {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        if (this.form.login == "Admin" && this.form.password == "12345") {
          const auth = {
            accessToken: 'some-secret-token',
          }
          this.$store.commit('setAuth', auth)
          Cookie.set('auth', auth)
          this.$router.push('/')
        }
        else{
          this.$bvToast.show('loginFailedToast')
        }
        this.$nuxt.$loading.finish()
      }, 500)
    },
  },
}
</script>
