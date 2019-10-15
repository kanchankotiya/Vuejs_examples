<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Routing</h1>
        <!-- named roter views and using multiple router views -->
        <!-- <app-header></app-header> -->
        <router-view name="header-top"></router-view>
        <!-- added transition in router views -->
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>  
        <router-view name="header-bottom"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue'; 
  export default {
    components: {
      appHeader: Header
    }
  }
</script>

<style>
  .slide-enter{
    /*transform: translate(20px);*/
    opacity: 0;
  }
  .slide-enter-active{
    animation: slide-in 1s ease-out forwards;
    transition: opacity 1s;
  }
  .slide-leave{
  }
  .slide-leave-active{
    animation: slide-out 1s ease-out forwards;
    transition: opacity 3s;
    opacity: 0;
    position: absolute;
  }
  .slide-move{
    transition: transform 1s;
  }

  @keyframes slide-in{
    from{
      transform: translateY(20px);
    }
    to{
      transform: translateY(0);
    }
  }
  @keyframes slide-out{
    from{
      transform: translateY(0);
    }
    to{
      transform: translateY(20px);
    }
  }
</style>
