import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Perfil from './views/Perfil.vue'
import Repositorie from './views/Repositorie.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/perfil/:id',
      name: 'perfil',
      component: Perfil,
      props: true
    },
    {
      path: '/repositorie/:id/:repo',
      name: 'repositorie',
      component: Repositorie,
      props: true
    },
    {
      path: '*',
      name: 'home',
      component: Home
    }
  ]
})
