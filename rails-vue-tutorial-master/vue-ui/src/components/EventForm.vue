<template>
  <div>
    <h2 class="f5 mt0">
      New Event
    </h2>

    <p v-if="error" class="error">
      {{ error }}
    </p>

    <form v-on:submit.prevent="saveEvent()" className="eventForm">
      <fieldset class="ba b--transparent ph0 mh0">
        <input type="hidden" v-model="aEvent.id" />
        <div>
          <label htmlFor="event_type" class="f6 b db mb2">
            <strong>Type:</strong>
          </label>
          <input
            type="text"
            id="event_type"
            name="event_type"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            required
            v-model="aEvent.event_type"
          />
        </div>
        <div>
          <label htmlFor="event_date" class="f6 b db mb2">
            <strong>Date:</strong>
          </label>
          <input
            type="text"
            id="event_date"
            name="event_date"
            ref="{this.dateInput}"
            autoComplete="off"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            v-model="aEvent.event_date"
          />
        </div>
        <div>
          <label htmlFor="title" class="f6 b db mb2">
            <strong>Title:</strong>
          </label>
          <textarea
            cols="30"
            rows="10"
            id="title"
            name="title"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            v-model="aEvent.title"
          />
        </div>
        <div>
          <label htmlFor="speaker" class="f6 b db mb2">
            <strong>Speakers:</strong>
          </label>
          <input
            type="text"
            id="speaker"
            name="speaker"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            v-model="aEvent.speaker"
          />
        </div>
        <div>
          <label htmlFor="host" class="f6 b db mb2">
            <strong>Hosts:</strong>
          </label>
          <input
            type="text"
            id="host"
            name="host"
            class="input-reset ba b--black-20 pa2 mb2 db w-100"
            v-model="aEvent.host"
          />
        </div>
        <div>
          <label htmlFor="published" class="pa0 ma0 lh-copy f6 pointer">
            <strong>Publish:</strong>
          </label>
          <input
            type="checkbox"
            id="published"
            name="published"
            v-model="aEvent.published"
          />
        </div>
      </fieldset>
      <div className="form-actions">
        <button
          class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { SAVE_EVENT } from "@/store/actions/types";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      // Because you don't want changes to propagate until saved,
      // you only work on a copy.
      aEvent: { ...this.event },
      error: ""
    };
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions([SAVE_EVENT]),
    saveEvent() {
      this[SAVE_EVENT](this.aEvent)
        .then(event => {
          this.$emit("eventSelected", event);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
