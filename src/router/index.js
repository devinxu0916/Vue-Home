import Vue from 'vue'
import Router from 'vue-router'
import index from '../view/index.vue'
import content from '../view/content.vue'
import login from '../view/login.vue'
import my from '../view/my.vue'
import publish from '../view/publish.vue'
import message from '../view/message.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/content',
      name: 'content',
      component: content
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish
    },
    {
      path: '/message',
      name: 'message',
      component: message
    }
  ]
})
