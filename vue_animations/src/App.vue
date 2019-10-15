<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-3">
        <h1>Anmiations</h1>
        <button @click="show = !show" class="btn btn-primary">Add Alert</button>
        <br>
        <select class="form-control mt-3" v-model="alertAnimation">
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
        </select>
        <br>
        <transition :name="alertAnimation">
          <div class="alert alert-info mt-3" v-if="show">Show alert</div>
        </transition>  
        <transition :name="alertAnimation" type="animation">
          <div class="alert alert-info mt-3" v-if="show">Show alert</div>
        </transition> 
        <!-- when dom is lodaed fully then animation is perform we can use appear attribute-->
        <transition name="slide" type="animation" appear>
          <div class="alert alert-info mt-3" v-if="show">Show alert</div>
        </transition>  
        <!-- useing differnt animation classes -->
        <transition 
          enter-active-class="animated bounce"
          leave-active-class="animated shake">
          <div class="alert alert-info mt-3" v-if="show">Show alert</div>
        </transition>  
        <!-- transictions multiple elements -->
        <transition mode="out-in">
          <div class="alert alert-info mt-3" v-if="show" key="info">Show alert info</div>
          <div class="alert alert-danger mt-3" v-else key="warning">Show alert Warning</div>
        </transition>  

        <!-- added javascript animation -->
        <button class="btn btn-secondary" @click="load = !load">Load/ remove elememt</button>
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @enter-cancelled="enterCancelled"

          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
          @leave-cancelled="leaveCancelled"
          :css="false">
          <div style="width: 300px;height: 100px; background-color: green;" v-if="load" class="mt-3"></div>
        </transition>

        <hr>
        <button 
          @click="selectedComponent == 'app-success-alert' ? selectedComponent = 'app-danger-alert' : selectedComponent = 'app-success-alert'" 
          class="btn btn-primary">Toggle my component</button>  
        <br>
        <transition mode="out-in">
          <component :is="selectedComponent" class="mt-3" name="fade"></component>
        </transition>

        <hr>
        <button class="btn btn-primary mb-2" @click="addItem">Add item</button>
        <ul class="list-group mb-5">
          <transition-group name="slide">
            <li 
              class="list-group-item" 
              v-for="(number, index) in numbers"
              @click="removeItem(index)"
              style="cursor: pointer;"
              :key="numbers">
              {{ number }}
            </li>
          </transition-group>  
        </ul>  
      </div>
    </div>
  </div>      
</template>

<script>
import AlertDanger from './AlertDanger.vue';  
import AlertSuccess from './AlertSuccess.vue';  
export default {
  data() {
    return{
      show: false,
      load: true,
      alertAnimation: 'fade',
      elememtWidth: 100,
      selectedComponent: 'app-success-alert',
      numbers: [1, 3, 4, 5]
    }
  },
  methods: {
    beforeEnter(el){
      console.log('before enter');
      this.elememtWidth = 100;
      el.style.width = this.elememtWidth;
    },
    enter(el, done){
      console.log('enter');
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = (this.elememtWidth + round * 10) + 'px'; 
        round++;
        if(round > 20){
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterEnter(el){
      console.log('after enter');
    },
    enterCancelled(el){
      console.log('enter cancelled');
    },
    beforeLeave(el){
      console.log('before leave');
      this.elememtWidth = 300;
      el.style.width = this.elememtWidth;
    },
    leave(el, done){
      console.log('leave');
      let round = 1;
      const interval = setInterval(() => {
        el.style.width = (this.elememtWidth - round * 10) + 'px'; 
        round++;
        if(round > 20){
          clearInterval(interval);
          done();
        }
      }, 20);
    },
    afterLeave(el){
      console.log('after leave');
    },
    leaveCancelled(el){
      console.log('leave cancelled');
    },
    addItem(){
      const pos = Math.floor(Math.random() * this.numbers.length);
      this.numbers.splice(pos, 0, this.numbers.length + 1)
    },
    removeItem(index){
      this.numbers.splice(index, 1);
    }
  },
  components: {
    appDangerAlert: AlertDanger,
    appSuccessAlert: AlertSuccess
  }
}
</script>

<style>
  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity 1s;
  }
  .fade-leave{
    /*opacity: 1;*/
  }
  .fade-leave-active{
    transition: opacity 1s;
    opacity: 0;
  }
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
