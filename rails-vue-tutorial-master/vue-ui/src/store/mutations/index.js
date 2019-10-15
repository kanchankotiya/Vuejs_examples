import * as mutations from "@/store/mutations/types";
import * as states from "@/store/state/types";

export default {
  [mutations.SET_EVENTS](state, events) {
    state[states.EVENTS] = events;
  },
  [mutations.SET_EVENT](state, event) {
    const i = state[states.EVENTS].findIndex(e => e.id == event.id);

    if (i >= 0) {
      // DOM will not be updated if you modify via index.
      state[states.EVENTS].splice(i, 1, event);
    } else {
      state[states.EVENTS].push(event);
    }
  },
  [mutations.DELETE_EVENT](state, event) {
    const i = state[states.EVENTS].findIndex(e => e.id == event.id);

    if (i >= 0) {
      state[states.EVENTS].splice(i, 1);
    }
  }
};
