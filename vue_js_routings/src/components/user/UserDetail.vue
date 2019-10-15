<template>
  <div>
    <h3>Some User Details</h3>
    <p>Loaded ID: {{ $route.params.id }}</p>
    <!-- making router link more dynamic -->
    <!-- pass query parameter -->
    <router-link 
    tag="button" 
    :to="link"
    class="btn btn-primary">Edit Link</router-link>
  </div>  
</template>

<script>
  export default{
    data() {
      return {
        link: {
          name: 'userEdit', 
          params: { 
            id: this.$route.params.id
          }, 
          query: { 
            locale: 'en', q: 100
          },
          hash: '#data' 
        }
      }
    },
    beforeRouteEnter(to, from, next){
      if(true){
        next();
      }else{
        next(false);
      }
    }
  }
</script>