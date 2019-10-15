<template>
  <div>
    <div
      v-for="event in events"
      :key="event.id"
      class="pv2 bg-near-white pa3 bb"
    >
      <a @click="selectEvent(event)" class="pointer">
        <span>{{ event.event_date }}</span>
        &mdash;
        <span>{{ event.event_type }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      required: true
    }
  },
  methods: {
    selectEvent(event) {
      this.$emit("eventSelected", event);
    }
  }
};
</script>
