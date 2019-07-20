<template>
  <div>
    <p>Status Server: {{ status }}</p>
    <hr>
    <button @click="changeStatus">Change Status</button>
  </div>  
</template>


<script>
export default {
  data: function() {
    return{
      status: 'critical'
    }
  },
  methods: {
    changeStatus(){
      this.status = 'Normal';
    }
  }
}
</script>