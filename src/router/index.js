import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/register/RegisterView.vue'
import Login from '../views/login/LoginView.vue'
//import Header from '@/components/HomePage/Header'
import HomeView from '@/views/HomePage/HomeView.vue'

Vue.use(VueRouter)

const routes = [
   /*导航栏跳转页面*/
  {
    path: '/',
    name: 'home',
    // component: () => import(/* webpackChunkName: "about" */ '../views/HomePage/HomeView.vue')
    component: HomeView
  },
 
  {
    path: '/creation',
    name: 'creation',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/CreationView.vue')
  },
  {
    path: '/person',
    name: 'person',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/PersonView.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "about" */ '../views/GuidePage/MessageView.vue')
  },
   /*视频播放页面*/
  {
    path: '/video/:id',/*注意这里*/
    name: 'video',
    component: () => import(/* webpackChunkName: "about" */ '../views/VideoView.vue')
  },
  /*搜索页面*/
  {
    path:'/search',
    name:'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue')
  },
  /*用户的个人主页页面*/
  {
    path: '/user/:id',/*注意这里*/
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/VideoView.vue')
  },
   /*分区的标签页面*/
   {
    path:'/life',
    name:'life',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/LifeView.vue')
  },
  {
    path:'/entertainment',
    name:'entertainment',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/EntertainmentView.vue')
  },
  {
    path:'/film',
    name:'film',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/FilmView.vue')
  },
  {
    path:'/game',
    name:'game',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/GameView.vue')
  },
  {
    path:'/sports',
    name:'sports',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/SportsView.vue')
  },
  {
    path:'/food',
    name:'food',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/FoodView.vue')
  },
  {
    path:'/technology',
    name:'technology',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/TechnologyView.vue')
  },
  {
    path:'/military',
    name:'military',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/MilitaryView.vue')
  },
  {
    path:'/music',
    name:'music',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/MusicView.vue')
  },
  {
    path:'/study',
    name:'study',
    component: () => import(/* webpackChunkName: "about" */ '../views/LabelPage/StudyView.vue')
  },
  {
    path: '/search_result',/*注意这里*/
    name: 'search_result',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchResult.vue')
  },
  /*Y 0517 第一次合并*/
  {
     path: '/register', 
    name: 'register',
    component: Register
  },
  {
    path: '/login', 
    name: 'login',
    component: Login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router