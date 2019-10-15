import Vue from 'vue'
import Router from 'vue-router'
import EventList from '@/components/EventList'
import EventForm from '@/components/EventForm'
import Event from '@/components/Event'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/events',
      name: 'events',
      component: EventList
    },
    {
      path: '/events/new',
      name: 'newEvent',
      component: EventForm
    },
    {
      path: '/events/:id',
      name: 'event',
      component: Event
    }
  ]
})
