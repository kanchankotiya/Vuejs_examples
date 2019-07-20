<template>
  <div>
    <div 
      id="on"
      @click="switched(true)"
      :class= "{active: !value}">on</div>
    <div 
      id="Off"
      @click="switched(false)"
      :class= "{active: value}">Off</div>  
  </div>
</template>

<script>
  export default{
    props: ['value'],
    methods: {
      switched(isOn) {
        this.$emit('input', isOn);
      }
    }
  }
</script>

<style scoped>
  #on, #Off{
    width: 40px;
    height: 20px;
    background-color: lightgray;
    padding: 2px;
    display: inline-block;
    margin: 10px -2px;
    box-sizing: content-box;
    cursor: pointer;
    text-align: center;
  }
  #on:hover, #on.active{
    background-color: lightgreen;
  }
  #Off:hover, #Off.active{
    background-color: lightcoral;
  }
</style>