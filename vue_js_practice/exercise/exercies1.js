var section1 = new Vue({
  el: '#section1',
  data: {
    name: "kanchan kotiya",
    age: 23,
    src: "https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg"
  },
  methods: {

    random: function(){
      return (Math.random() * (0.000 - 1.000) + 1.000).toFixed(4);
    },
    changeName: function(){
      this.name = event.target.value;
    },
    multiplyAge: function() {
     return this.age*3;
    }, 

  }

});