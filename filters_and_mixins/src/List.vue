<template>
  <div>
    <h1>Filters and Mixins</h1>

    <input v-model="filterText">
    <ul>
      <li v-for="fruit in filteredFruits">{{ fruit }}</li>
    </ul>
  </div>  
</template>

<script>
  import {fruitMixins} from './fruitMixin';
  export default {
    mixins: [fruitMixins],
    created() {
      console.log('created in list');
    }
  }
</script>

<style>

</style>
