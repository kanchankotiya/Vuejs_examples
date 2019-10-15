import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import {routes} from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  // routes: routes
  routes,
  //for defining a routing mode
  mode: 'history',
  // added scrolling behaviour
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    if(to.hash){
      return {selector: to.hash};
    }
    return {x: 0, y: 0};
  }
});

//using before enter guard
router.beforeEach((to, from, next) => {
  console.log('before Each');
  next();
});

new Vue({
  el: '#app',
  // router: router
  router,
  render: h => h(App)
})
