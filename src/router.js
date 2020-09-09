import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import TodoList from './views/todolist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoList
    }
  ]
})
