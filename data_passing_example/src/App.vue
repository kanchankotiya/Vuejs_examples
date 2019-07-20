<template>
  <div class="container">
      <app-header></app-header>
      <hr>
      <div class="row">
        <app-servers></app-servers>
        <app-server-detail></app-server-detail>
      </div>
      <hr>
      <app-footer></app-footer>
  </div>
</template>


<script>
  import Header from './components/shared/Header.vue';
  import Servers from './components/servers/Servers.vue';
  import ServerDetails from './components/servers/ServerDetails.vue';
  import Footer from './components/shared/Footer.vue';
  /* import User from './components/User.vue'; */
  export default {
    components: {
      'app-header' : Header,
      'app-servers' : Servers,
      'app-server-detail': ServerDetails,
      'app-footer': Footer  
      /* 'app-user': User */
    } 
  }
</script>

<style>
  div.component {
    border: 1px solid black;
    padding: 30px;
  }
</style>
