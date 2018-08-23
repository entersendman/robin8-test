import Vue from 'vue'
import Router from 'vue-router'
import RegisterForm from '../components/RegisterForm'
import Profile from '../components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RegisterForm',
      component: RegisterForm
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
