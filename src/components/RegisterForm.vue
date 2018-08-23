<template>
  <v-container>
    <v-layout  row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text ">Sign Up</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
          <form id="form" @submit.prevent="validateBeforeSubmit()">
            <v-text-field
              v-validate="'required|email'"
              v-model="user.email"
              :error-messages="errors.collect('email')"
              label="E-mail"
              data-vv-name="email"
            ></v-text-field>
            <v-text-field
              v-validate="'required|'"
              v-model="user.password"
              name="password"
              type="password"
              :error-messages="errors.first('password')"
              placeholder="Password"
              ref="password"
            ></v-text-field>
            <v-text-field
              v-validate="'required|confirmed:password'"
              v-model="user.confirmPassword"
              :error-messages="errors.first('passwords')"
              name="passwords"
              type="password"
              placeholder="Password, Again"

            ></v-text-field>
            <v-layout v-if="customErrors.length > 0" >{{customErrors}}</v-layout>
            <v-btn @click="submit">submit</v-btn>
          </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    user: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    users: [],
    customErrors: {}
  }),

  methods: {
    submit () {
      this.$validator.validateAll().then(user => {
        if (!user) {
          return
        }
        this.users.push({user: this.user})
        this.user = {
          email: '',
          password: '',
          confirmPassword: ''
        }
        this.$router.push({path: '/profile'})
      })
    }
  },
  mounted () {
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'))
    }
  },
  watch: {
    users: {
      handler () {
        console.log('Users changed!')
        localStorage.setItem('users', JSON.stringify(this.users))
      },
      deep: true
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
