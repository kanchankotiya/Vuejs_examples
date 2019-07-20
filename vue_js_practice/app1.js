new Vue ({
  el: "#app1",
  data: {
    counter: 0,
    x: 0,
    y: 0
  },
  methods: {
    increase: function(step, event){
      this.counter += step;
    },
    updateCoordinates: function(event){
      this.x = event.clientX;
      this.y = event.clientY;
    },
    dummy: function(){
      event.stopPropagation();
    },
    alert: function(){
      alert('Alert');
    }
  }
});