import Vue from "vue";
import Vuex from "vuex";

import state from '@/store/state/index';
import mutations from "@/store/mutations/index";
import actions from "@/store/actions/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations
});
