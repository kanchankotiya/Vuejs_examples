var exercise3 = new Vue ({
  el: "#exercise3",
  data:  {
    value: 0
  },
  computed: {
    result: function(){
      return this.value == 37 ? 'DONE' : 'not there yet'
    }
  }, 
  watch: {
    result: function(){
      var vm = this;
      setTimeout(function(){
        vm.value = 0;
      }, 5000)
    }
  }
});