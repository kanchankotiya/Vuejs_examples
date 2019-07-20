<template>
  <div class="row">
    <div class="col-sm-8 offset-sm-2 col-xs-12 col-md-6 offset-md-3 form-group">
      <form>
        <label>Quote</label>
        <textarea class="form-control" rows="3" v-model="quote"></textarea>
        <div class="col-sm-8 col-sm-offset-2 col-xs-12 col-md-6 col-md-offset-3 form-group mt-3">
          <button class="btn btn-primary" @click.prevent="changeQuote">Add Quote</button>
        </div>
      </form>  
    </div>
  </div>  
</template>

<script>
  export default {
    data: function(){
      return{
        quote: ''
      }
    },
    methods: {
      changeQuote(){
        this.$emit('quoteAdded', this.quote);
        this.quote ='';
      }
    }
  }
</script>

<style>
  
</style>
