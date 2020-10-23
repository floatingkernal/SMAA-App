import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'
// import About from '../views/About.vue'
// import Login from "../views/Login.vue";
// import Registration from "../views/Registration.vue";
// import Catalog from "../views/Catalog.vue";
// import ProductInfo from "../views/ProductInfo.vue";
// import ShoppingCart from "../views/ShoppingCart.vue";

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home'),
    // component: Home
  },
  {
    path: "/login",
    name: "Login",
    // component: Login,
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login'),
  },
  {
    path: "/registration",
    name: "Registration",
    // component: Registration,
    component: () => import(/* webpackChunkName: "Registration" */ '@/views/Registration'),
  },
  {
    path: "/catalog/:pageNum",
    name: "Catalog",
    // component: Catalog,
    component: () => import(/* webpackChunkName: "Catalog" */ '@/views/Catalog'),
    meta: { requiresAuth: true }
  },
  {
    path: "/product-info/:prodId",
    name: "ProductInfo",
    // component: ProductInfo,
    component: () => import(/* webpackChunkName: "ProductInfo" */ '@/views/ProductInfo'),
    meta: { requiresAuth: true }
  },
  {
    path: "/shopping-cart",
    name: "ShoppingCart",
    // component: ShoppingCart,
    component: () => import(/* webpackChunkName: "ShoppingCart" */ '@/views/ShoppingCart'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    // component: About,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  // console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router
