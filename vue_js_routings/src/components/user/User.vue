<template>
  <div>
    <h1>The User Page</h1>
    <hr>
    <!-- navigate from code -->
    <!--  <p>Loaded Id: {{ id }}</p> -->
    <button @click="navigateToHome" class="btn btn-primary">Go to home</button>
    <hr>
    <router-view></router-view>
  </div>  
</template>

<script>
  export default {
    // retrive dynamic parameter
    // data() {
    //   return {
    //     // $route is active route
    //     id: this.$route.params.id
    //   }
    // },
    // watch: {
    //   '$route'(to, from){
    //     this.id = to.params.id;
    //   }
    // },
    methods: {
      navigateToHome() {
        // $router is router it self
        this.$router.push({name: 'home'});
      }
    }
  }
</script>