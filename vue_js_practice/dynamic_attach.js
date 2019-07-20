new Vue({
  el: "#style",
  data: {
    attachRed: false,
    color: 'green'
  },
  // with the help of computed methods
  computed: {
    divClasses: function(){
      return {
        red: this.attachRed,
        blue: !this.attachRed
      };
    }
  }
});