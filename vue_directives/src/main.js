import Vue from 'vue'
import App from './App.vue'

// create directive globally
Vue.directive('highlight',{
  // creating simple directive
  bind(el, binding, vnode){
    // el.style.backgroundColor = 'green';

    // passing value to custom directive
    // el.style.backgroundColor = binding.value;

    // check modifier setup (modifiers is an array)
    var delay = 0;
    if(binding.modifiers['delayed']) {
      delay = 3000;
    }
    setTimeout(() => {
      // passing argumet to custom directive
      if(binding.arg == 'background'){
        el.style.backgroundColor = binding.value;
      }else{
        el.style.color = binding.value;
      }
    }, delay);
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})


// five hooks for directive 
// 1. bind(el, binding, vnode) : once directive is attached
//   el: refers to the element the directive sits on.
//   binding: refers to the way this directive is set up, so which arguments we may pass in.
//   vnode: refers to the node in the virtual DOM.
//   note: the argument binding and vnode is treated to read only.

// 2. inserted(el, bind, vnode) : inserted in parent node
// 3. update(el, binding, vnode, oldVnode): once component is updated(without childern)
// 4.componentUpdated(el, binding, vnode, oldVnode) : once component is updated (with childern)
// 5. unbind(el, binding, vnode) : once directive is removed
