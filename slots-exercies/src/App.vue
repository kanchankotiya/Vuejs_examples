<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <button @click="selectedComponent = 'appRed'">Red</button>
        <button @click="selectedComponent = 'appGreen'">Green</button>
        <button @click="selectedComponent = 'appBlue'">Blue</button>
        <p>{{ selectedComponent }}</p>
        <component :is="selectedComponent">
          <p>This is the Content</p>
        </component>
        <!-- <app-red>
          <p>This is the Content</p>
        </app-red>
        <app-blue>
          <p>This is the Content</p>
        </app-blue>
        <app-green>
          <p>This is the Content</p>
        </app-green> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Red from './components/Red.vue';
  import Blue from './components/Blue.vue';
  import Green from './components/Green.vue';
  export default{
    data: function(){
      return {
        selectedComponent: 'appRed'
      }
    },
    components: {
      appRed : Red,
      appBlue : Blue,
      appGreen : Green
    }
  }
</script>

<style>

</style>
