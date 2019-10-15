import * as actions from "@/store/actions/types";
import * as mutations from "@/store/mutations/types";
import api from "@/api";

export default {
  [actions.GET_EVENTS]({ state, commit }) {
    return api
      .getEvents()
      .then(response => {
        commit(mutations.SET_EVENTS, response.data);
      });
  },
  [actions.SAVE_EVENT]({ state, commit }, event) {
    let method;

    if (event.id) {
      method = api.updateEvent;
    } else {
      method = api.createEvent;
    }

    return new Promise((resolve, reject) => {
      method(event)
      .then(response => {
        commit(mutations.SET_EVENT, response.data);
        resolve(response.data);
      })
      .catch(error => {
        // TODO
        // reject(error.response.data.error);
      })
    });
 },
  [actions.DELETE_EVENT]({ state, commit }, event) {
    if (event.id) {
      return api
        .deleteEvent(event)
        .then(response => {
          commit(mutations.DELETE_EVENT, event);
        });
    }
  }
};
