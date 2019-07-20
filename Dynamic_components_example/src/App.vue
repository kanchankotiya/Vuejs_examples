<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <button @click="selectedComponent = 'appQuote'">Quote</button>
        <button @click="selectedComponent = 'appAuthor'">Author</button>
        <button @click="selectedComponent = 'appNew'">New</button>
        <hr>
        <p>{{ selectedComponent }}</p>
        <!-- keep components alive -->
        <keep-alive>
          <!-- for creating dynamic component -->
          <component :is="selectedComponent">
            <p>The Title</p>
          </component>
        </keep-alive>
        <!-- <app-quote>
          <h2 slot="title">{{ quoteTitle }}</h2>
          <p>slots render data from outside and render it in the child component.</p>
        </app-quote> -->
      </div>
    </div>
  </div>
</template>

<script>
  import Quote from './components/Quote.vue';
  import Author from './components/Author.vue';
  import New from './components/New.vue';
  export default {
    data: function() {
      return{
        quoteTitle: 'The Title!',
        selectedComponent: 'appQuote'
      }
    },
    components: {
      appQuote : Quote,
      appAuthor: Author,
      appNew: New
    }
  }
</script>

<style scoped>
</style>
