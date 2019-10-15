<template>
<!--   <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-3">
        <h1>Built-in Directives</h1>
        <p v-text="'some text'"></p>
        <p v-html="'<strong>some text</strong>'"></p>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-6 offset-3">
        <h1>Custom Directives</h1> -->
        <!-- <p v-highlight="'red'">color this</p> -->
        <!-- passing argument in custom directive -->
        <!-- <p v-highlight:background="'red'">color this</p> -->

        <!-- modifiying a custom directive with modifiers  -->
        <!-- <p v-highlight:background.delayed="'red'">color this</p> -->
        <!-- <p v-local-highlight:background.delayed.blink="'red'">color this</p> -->

        <!-- passing more complex value to directive -->
        <!-- <p v-local-highlight:background.delayed.blink="{mainColor: 'red', secondColor: 'green', delay: 1000}">color this</p> -->
  <!--     </div>
    </div>
  </div>  -->

  <!-- assignment on directives -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Directive Exercise</h1>
        <button v-customOn:click="clicked" class="btn btn-primary">Click Me</button>
        <div
          style="width: 100px; height: 100px; background-color: lightgreen"
          v-customOn:mouseenter="mouseEnter"
          v-customOn:mouseleave="mouseLeave"></div>
      </div>
    </div>    
  </div>
</template>

<script>
  // registering local directive
  export default{
    directives: {
      'customOn': {
          bind(el, binding){
            // el.onclick = function() {  
            //   binding.value;
            // }
            const type = binding.arg;
            const fn = binding.value;
            el.addEventListener(type, fn)
          }
        }
      },  
      methods: {
        clicked() {
          alert('Clicked Evenet...');
        },
        mouseEnter() {
          console.log('Mouse Enter...');
        },
        mouseLeave() {
          console.log('Mouse Leave');
        }
      }
    // directives: {
    //   'local-highlight': {
    //     bind(el, binding, vnode){
    //       var delay = 0;
    //       if(binding.modifiers['delayed']) {
    //         delay = 3000;
    //       }

    //       if(binding.modifiers['blink']){
    //         let mainColor = binding.value.mainColor;
    //         let secondColor = binding.value.secondColor;
    //         let currentColor = binding.value;
    //         setTimeout(() => {
    //           setInterval(() => {
    //             currentColor == secondColor ? currentColor = mainColor : currentColor = secondColor;
    //             // passing argumet to custom directive
    //             if(binding.arg == 'background'){
    //               el.style.backgroundColor = currentColor;
    //             }else{
    //               el.style.color = currentColor;
    //             }
    //           }, binding.value.secondColor)
    //         }, delay);
    //       }else{
    //         setTimeout(() => {
    //           // passing argumet to custom directive
    //           if(binding.arg == 'background'){
    //             el.style.backgroundColor = binding.value.mainColor;
    //           }else{
    //             el.style.color = binding.value.mainColor;
    //           }
    //         }, delay);
    //       }
    //     }
    //   }  
    // }
  }
</script>

<style>

</style>
