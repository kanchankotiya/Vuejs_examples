var exercise2 = new Vue({
  el: '#exercise2', 
  data: {
    value: " ", 
    value1: " "
  },
  methods: {
    alert: function(){
      alert("alert");
    },
    getValue: function(event) {
      this.value = event.target.value;
    },
    getValue1: function(event) {
      this.value1 = event.target.value;
    },
  }
});