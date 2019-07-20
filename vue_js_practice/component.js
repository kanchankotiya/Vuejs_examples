// make component
// <!-- when we use having a shared data object the issue is that its change both intsances when i click the button --> 
//var data = {status: 'critical'};


//register component globally
// Vue.component('my-cmp', {
//   // function gets exected for each separat component and different vue components has its own object
//   data: function(){
//     return {
//       status: 'critical'
//     }
//   },
//   template: '<p>Server Status: {{ status }} (<button @click="changeStatus">Change</button>) </p>',
//   methods: {
//       changeStatus: function(){
//          this.status = 'normal';
//       }
//   }
// });

//register component locally

var cmp = {
  // function gets exected for each separat component and different vue components has its own object
  data: function() {
    return {
      status: 'critical'
    }
  },
  template: '<p>Server Status: {{ status }} (<button @click="changeStatus">Change</button>) </p>',
  methods: {
      changeStatus: function(){
         this.status = 'normal';
      }
  }
};



new Vue({
  el: "#app",
  components: {
    'my-cmp': cmp
  }
})

new Vue({
  el: "#app2"
})

