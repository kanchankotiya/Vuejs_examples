var exercise4 = new Vue({
  el: "#exercise4",
  data: {
    effectHighlight: false,
    inputClass:  'fat-border',
    classEnabled: false,
    inputStyle: 'border: 5px solid black',
    percentComplete: 0
    // effectClasses: {
    //   highlight: false,
    //   shrink: true
    // }
  },
  methods: {

    startEffect: function() {

    var vm = this;

    setInterval(function() {

      vm.effectHighlight = !vm.effectHighlight;

      }, 1000);
    },
    startProgress: function(){
      this.percentComplete = 0;
      var vm = this;

      var interval= setInterval(function(){
        vm.percentComplete += 5;
        if(vm.percentComplete >= 1000) {
          console.log('Stopping progress')
          clearInterval(interval);
        }
      }, 100);
    }
  } ,
  // computed: {

  // effectClass: function() {

  //   return this.effectHighlight ? 'highlight' : 'shrink';
  //   }
  // }
  computed: {
    effectClass: function(){
      return {
        highlight: this.effectHighlight,
        shrink: !this.effectHighlight
      };
    }
  },

});  