import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Home = () => import('../views/Home.vue');
const Board = () => import('../views/Board.vue');
const Card = () => import('../views/Card.vue');
const Register = () => import('../views/Register.vue');
const Login = () => import('../views/Login.vue');
const NotFound = () => import('../views/NotFound.vue');
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
    meta: {
      requiresAuth: true
    },
    children: [{
      path: 'list/:listId(\\d+)/card/cardId(\\d+)',
      name: 'Card',
      component: Card
    }]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    components: NotFound
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

store.commit('user/initUserInfo');

router.beforeEach((to, from, next) => {
  if (to.matched.some(matched => {
      return matched.meta.requiresAuth
    }) && !store.state.user.info) {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
});

export default router