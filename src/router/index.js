import Vue from "vue";
import VueRouter from "vue-router";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(/* webpackChunkName: "Registration" */ "@/views/Registration"),
  },
  {
    path: "/catalog/",
    name: "Catalog",
    component: () =>
      import(/* webpackChunkName: "Catalog" */ "@/views/Catalog"),
    meta: { requiresAuth: true },
  },
  {
    path: "/product-info/:prodId",
    name: "ProductInfo",
    component: () =>
      import(/* webpackChunkName: "ProductInfo" */ "@/views/ProductInfo"),
    meta: { requiresAuth: true },
  },
  {
    path: "/shopping-cart",
    name: "ShoppingCart",
    component: () =>
      import(/* webpackChunkName: "ShoppingCart" */ "@/views/ShoppingCart"),
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () =>
      import(/* webpackChunkName: "Orders" */ "@/views/Orders"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  // console.log(isAuthenticated);

  
  if (!requiresAuth) next()
  else if (requiresAuth && !isAuthenticated) next("/login");
  else isAuthenticated.getIdTokenResult().then(idToken => {
    if (idToken.claims.validCustomer) next()
    else next('/login')
  })
});

export default router;
