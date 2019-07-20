<template>
  <div class="component">
    <h1>The User Component</h1>
    <p>I'm an awesome User!</p>
    <button @click="changeName">Change My Name</button>
    <p>Name is: {{ name }}</p>
    <hr>
    <div class="row">
        <div class="col-xs-12 col-sm-6">
            <app-user-details :myName="name" @nameWaReset="name = $event"></app-user-details>
        </div>
        <div class="col-xs-12 col-sm-6">
          <app-user-edit></app-user-edit>
        </div>
    </div>
  </div>
</template>

<script>
  import UserDetail from './UserDetail.vue';
  import UserEdit from './UserEdit.vue';

  export default {
    data: function() {
      return {
        name: 'Max'
      };
    },
    methods: {
      changeName() {
        this.name = "kanchan";
      }
    },
    components: {
      'appUserDetails': UserDetail,
      'appUserEdit' : UserEdit
    }
  }
</script>

<style scoped>
  div {
    background-color: lightblue;
  }
</style>