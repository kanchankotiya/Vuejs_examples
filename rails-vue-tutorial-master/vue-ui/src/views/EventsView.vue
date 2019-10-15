<template>
  <div class="cf">
    <div class="fl w-100 w-25-ns pr0 pr2-ns">
      <h2 class="f5 mt0">
        Events &mdash;
        <a @click="newEvent" class="pointer">
          New Event
        </a>
      </h2>
      <EventList :events="events" @eventSelected="selectEvent" />
    </div>
    <div class="fl w-100 w-75-ns pl0 pl2-ns">
      <div class="pv2 ph4">
        <div v-if="showEvent">
          <Event :event="event" @eventEdit="editEvent" />
          <p>
            <a @click="editEvent(event)" class="pointer">Edit </a>
            &mdash;
            <a @click="deleteEvent(event)" class="pointer">Delete </a>
          </p>
        </div>
        <div v-else-if="showEventForm">
          <EventForm :event="event" @eventSelected="selectEvent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { GET_EVENTS, DELETE_EVENT } from "@/store/actions/types";
import { EVENTS } from "@/store/state/types";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import Event from "@/components/Event";

export default {
  components: {
    EventList,
    EventForm,
    Event
  },
  data() {
    return {
      event: null
    };
  },
  created() {
    this[GET_EVENTS]();
  },
  computed: {
    ...mapState([EVENTS]),
    events() {
      return this[EVENTS];
    },
    showEvent() {
      return this.$route.name == "event" && this.event !== null;
    },
    showEventForm() {
      // TODO use constant route_names.NEW_EVENT
      return this.$route.name == "newEvent" && this.event !== null;
    }
  },
  methods: {
    ...mapActions([GET_EVENTS, DELETE_EVENT]),
    selectEvent(event) {
      this.event = event;
      this.$router.push({ name: "event", params: { id: event.id } });
    },
    newEvent() {
      this.event = {};
      this.$router.push({ name: "newEvent" });
    },
    editEvent(event) {
      this.event = event;
      this.$router.push({ name: "newEvent" });
    },
    deleteEvent(event) {
      this[DELETE_EVENT](event).then(() => {
        this.$router.push({ name: "events" });
      });
    }
  }
};
</script>
