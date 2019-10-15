<template>
 <!--  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-3">
        <h1>Filters and Mixins</h1>
        <p>{{ text | toUpperCase | to-lowercase}}</p>
        <button @click="fruits.push('Barries')">Add new item</button>  
        <input v-model="filterText">
        <ul>
          <li v-for="fruit in filteredFruits">{{ fruit }}</li>
        </ul>
        <hr>
        <app-list></app-list>
      </div>
    </div>
  </div> -->

  <!-- filters and mixins exercies -->
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-3">
        <!-- build local filter which revers the text  -->
        <p>{{ 'Hello There!' | toReverse }}</p>

        <!-- build local filter which count the text -->
        <p>{{ 'text' | calculateLength}}</p>

        <!-- do same thing with computed propertiex -->
        <p>{{ ReverseText }}</p>
        <p>{{ calculateTextLength }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {fruitMixins} from './fruitMixin';
  export default{
    filters: {
      toReverse(value) {
        return value.split('').reverse().join('');
      }
    },
    mixins: [fruitMixins]
  }
  // import List from './List.vue'; 
  // import {fruitMixins} from './fruitMixin';
  // export default {
  //   data() {
  //     return{
  //       text: "Some Text",
  //     }
  //   },
  //   filters: {
  //     toUpperCase(value) {
  //       return value.toUpperCase(); 
  //     } 
  //   },
  //   components: {
  //     'appList': List
  //   },
  //   mixins: [fruitMixins]
  //   // Filters is used to transform the output n template, its helps you to transform output
  //   // in the data, it doesn't transform data itself it only transform what user see.
  // }
</script>

<style>

</style>
