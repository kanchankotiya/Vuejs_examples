<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-3">
        <h1>Http</h1>

        <div class="form-group">
          <label>Username</label>
          <input type="text" name="" class="form-control" v-model="user.username">
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="text" name="" class="form-control" v-model="user.password">
        </div>
        
        <button class="btn btn-primat" @click="submited">Submit</button>
        <input type="text" name="" class="form-control" v-model="node">
        <br>
        <button class="btn btn-primary" @click="fetchData">Get Data</button>
        <ul class="list-group mt-3">
          <li class="list-group-item" v-for="u in users">{{ u.username }} - {{ u.password }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return{
        user: {
          username: '',
          password: ''
        },
        users: [],
        resource: {},
        node: 'data'
      };
    },
    methods: {
      submited() {
        // this.$http.post('data.json', this.user)
        //   .then(response => {
        //     console.log('response');
        //   },error => {
        //     console.log('error');
        //   });
        // this.resource.save({}, this.user);
        this.resource.saveAlt(this.user);
      },
      fetchData() {
        // this.$http.get('data.json')
        //   .then(response => {
        //     return response.json();
        //   })
        //   .then(data => {
        //     const resultArray = [];
        //     for(let key in data){
        //       resultArray.push(data[key]);
        //     }
        //     this.users = resultArray;
        //   });
        this.resource.getData({node: this.node})
          .then(response => {
            return response.json();
          })
          .then(data => {
            const resultArray = [];
            for(let key in data){
              resultArray.push(data[key]);
            }
            this.users = resultArray;
          });
      }
    },
    created() {
      //create your own resource
      const customActions = {
        saveAlt: {method: 'POST', url: 'alternative.json'}, 
        getData: {method: 'GET'}
      }
      this.resource = this.$resource('{node}.json', {}, customActions)
    }

  }
</script>

<style>

</style>
