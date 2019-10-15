import Vue from "vue";
import Router from "vue-router";
import EventsView from "@/views/EventsView";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/events",
      name: "events",
      component: EventsView
    },
    {
      path: "/events/new",
      name: "newEvent",
      component: EventsView
    },
    {
      path: "/events/:id",
      name: "event",
      component: EventsView
    }
  ]
});
