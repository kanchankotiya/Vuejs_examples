import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';
// register home component
Vue.component('app-status-server', Home);


new Vue({
  el: '#app',
  render: h => h(App)
})
