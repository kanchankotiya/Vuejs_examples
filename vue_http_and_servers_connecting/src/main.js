import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'


Vue.use(VueResource);


// configuring vue resource globally
Vue.http.options.root = 'https://vuejs-http-4346b.firebaseio.com/'

//intercepting request(for updating data)
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if(request.method == 'POST'){
    request.method = 'PUT';
  }
  //intercepting response
  next(response => {
    response.json = () => {return {messages: response.body}}
  });
}); 


new Vue({
  el: '#app',
  render: h => h(App)
})
