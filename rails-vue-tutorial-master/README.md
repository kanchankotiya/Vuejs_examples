# Simple CRUD app with Rails and Vue

This tutorial was inspired by [James Hibbard's post](https://hibbard.eu/rails-react-crud-app/)
but instead of using React, I will use Vue. This is not meant to compare
React and Vue nor to conclude which one is better though I find Vue more
approachable. This is just my second time to use Vue so please don't look
at me as an expert. This is also a learning experience for me and I hope
you learn something, too :)

While most of the content are based on James' post, I decided to treat Rails
and Vue as two separate applications. The Rails application is API-only that
serves JSON, i.e. you will not see any mention of Vue included in the codebase.
On the other hand, the Vue application is also a pure web client and does
everything via API calls. I will also use Vuex to centrally managed the API
calls and the state used by the Vue components.

In this post, I decided not to do a typical tutorial where you go about
building the application from start to finish. Instead, I will just
highlight the major code changes.

## Setup

The tutorial was developed using the following:
- Ruby 2.6.1
- Rails 5.2.2
- Npm 5.6.0  ([See installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
- Vue 2.6.8 ([See installation guide](https://vuejs.org/v2/guide/installation.html))

## Quick Guide

    # Get the code
    git checkout git@github.com:gregmoreno/rails-vue-tutorial.git
    cd rails-vue-tutorial

    # Run Rails app
    # To view JSON localhost:3000/events
    cd rails-api
    bundle install
    rails db:setup
    rails db:seed
    rails s

    # Run Vue app
    # To view app localhost:8080/events
    cd vue-ui
    npm install
    npm run serve

    # Or using foreman to run the 2 apps
    foreman start -f Procfile.dev

Start here:

    http://localhost:8080/events

## Architecture

The project is composed of 2 applications - a Rails application that returns `events`
in JSON and a Vue application that handles UI interaction.
The applications are in their respective directories.

    ./rails-api
    ./vue-ui


## API Endpoints

    GET     /events      # list of events
    POST    /events      # create a new event
    PUT     /events/:id  # update an event
    DELETE  /events/:id  # delete an event

Each `event` has the following structure:

    {
      "id": 1,
      "event_type": "Symposium",
      "event_date": "2018-05-01",
      "title": "A Social-Neuroscience Perspective on Empathy",
      "speaker": "Albert von Bezold, Jules Cotard, Marian Diamond",
      "host": "Alcmaeon of Croton",
      "published": true,
      "created_at": "2019-04-13T22:41:55.867Z",
      "updated_at": "2019-04-13T22:41:55.867Z"
    },


## Rails Components

### Controller

The `EventsController` is a typical Rails controller that returns
a JSON using [Jbuilder](https://github.com/rails/jbuilder). However, I
would love to share a pattern that I often use with my Rails
controller.


    class EventsController < ApplicationController
      def index
        load_events
      end

      def create
        build_event

        # more code follows
      end

      def update
        load_event
        build_event

        # more code follows
      end

      def destroy
        load_event
        @event.destroy

        # more code follows
      end

    private

      def event_scope
        Event.all
      end

      def load_events
        @events = event_scope.order(event_date: :DESC)
      end

      def load_event
        @event ||= event_scope.find(params[:id])
      end

      def build_event
        @event ||= event_scope.build
        @event.attributes = event_params
      end

      def event_params
        @event_params = params[:event]
        @event_params ? @event_params.permit(permitted_params) : {}
      end

      def permitted_params
        %i[
          event_type
          event_date
          title
          speaker
          host
          published
        ]
      end
    end


Did you notice it?
I like separating the actions into disctinct methods even though it
often just results to one-liners. However, this clean separation
makes the controller easier to understand and evolve. For example,
`event_scope` may eventually evolve to scope with `current_user`.

Our Rail application is boring but I love it that way.
It is all Ruby and there is no Javascript framework to worry about

Since we have built an API on top of Rails, we need to tell our Rails
application that requests would come from a diferent source. Otherwise,
our Vue application will just receive errors every time it calls the API.
If you're planning on serving your Vue application other than from 
`localhost`, update the `origins` parameter and restart your Rails application.

    # config/initializers/cors.rb

    Rails.application.config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins /localhost:*/

        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true
      end
    end


Here is good introduction about [CORS in the context of Rails](https://medium.com/@Nicholson85/handling-cors-issues-in-your-rails-api-120dfbcb8a24)
if you like to dig deeper.


## Vue Components

Components are building blocks of a Vue-based application. You might
represent the page header as a component, or the sidebar, the list
of events, or even just the event itself. A single page can also
be a component composed of several components, and so on.

Components under `src/views`, by convention, maps to URLs and
represent the top-level page. The mapping is listed in `src/router.js`.

    src/views/
      About.vue
      EventsView.vue

    src/components/
      Event.vue
      EventForm.vue
      EventList.vue

### Lifecycle

1. User action is captured by a Vue component.
2. Vue component calls a Vuex action that calls an API (via axios library).
3. Rails handles the API and returns a JSON response.
4. Vuex mutates a state based on the response.
5. The Vue component updates the page based on the state changes.

In this sequence, the Vue component has no idea about the API
calls - it simply calls a Vuex action. The Vuex action has
no idea about about the Vue component - it only cares about
the API request/response and the state to be modified. The Vue
component reacts to changes to the state.

### Vuex and State Management

When building an application, you often how to deal with these three
things:

- state - the source of truth
- view (or views) - mapping the state for the components
- actions - ways the state could change

In our sample application, the state is the list of events,
the view is the component the displays each event, and the
actions are loading the events via the API, adding new event,
etc.

The beauty of Vuex (and other state management libraries like Redux)
is it enables a clean separation between state, views, and actions
and at the same, they work together in a harmonious way. It was
an aha! moment when I finally I understood what it does.

### Listing Events

Let's see how the Vue pieces fit together in the context of listing events.

First, initialize list of events.

    // src/main.js#9
    const store = initStore({
      [states.EVENTS]: []
    });

Visiting the URL `/events` loads the EventsView component.
The mapping is specified using the [Vue Router](https://router.vuejs.org/).

    // src/router.js#11
    {
      path: "/events",
      name: "events",
      component: EventsView
    }

After the component is loaded, invoke the action `GET_EVENTS`

    // src/views/EventsView.vue#63
    created() {
      this[GET_EVENTS]();
    }

The `GET_EVENTS` action is just another method that calls
the API to fetch the list of events.
The state is then mutated with the response data.

    // src/store/actions/index.js#6
    [actions.GET_EVENTS]({ state, commit }) {
      return api
        .getEvents()
        .then(response => {
          commit(mutations.SET_EVENTS, response.data);
        })
    }

    // src/api.js#12
    getEvents() {
      return axios.get("/events");
    }

The list events from the API call is then saved. Or, using
the right technical term, the state is mutated.

    // src/store/mutations/index.js#8
    [mutations.SET_EVENTS](state, events) {
      state[states.EVENTS] = events;
    }

The component `EventsView` listens to any changes to the list of
events. It then passes the list to another component `EventList`.

    // src/views/EventsView.vue#12
    <template>
      ...
      <EventList :events="events"/>
    </template

The `EventList` component takes care of actually displaying the events.

    // src/components/EventList.vue
    <template>
      <div>
        <div v-for="event in events" :key="event.id">
          <a>
            <span>{{ event.event_date }}</span>
            &mdash;
            <span>{{ event.event_type }}</span>
          </a>
        </div>
      </div>
    </template>

### Adding and Updating Events

Of course, our application will be useless if it can only list events.
So, let's include a way to add events to our application.

First, add an event handler when a link (or button) is clicked.

    // src/views/EventsView.vue#7
    <a @click="newEvent">New Event</a>

    // src/views/EventsView.vue#90
    newEvent() {
      this.$router.push({ name: "newEvent" });
    },

The `newEvent()` method pushes the path `/events/new` via the Vue router
which we used to determine when to show the `EventForm` component.

    // src/views/EventsView.vue#19
    <div v-if="showEvent">
      <Event :event="event"/>
    </div>
    <div v-else-if="showEventForm">
      <EventForm :event="event"/>
    </div>

The conditionals are just methods that checks the current path.

    // src/views/EventsView.vue#73
    showEvent() {
      return (this.$route.name == "event") && (this.event !== null);
    },
    showEventForm() {
      return (this.$route.name == "newEvent") && (this.event !== null);
    }

The `EventForm` component receives the event selected from the `EventsList`
component. In Vue, passing an object from a parent component to a child
component is done via [props](https://vuejs.org/v2/guide/components-props.html).

    // src/components/EventForm.vue#99
    props: {
      event: {
        type: Object,
        required: true
      }
    },

The `EventForm` component handles the saving of events whether it is part
of adding a new event or updating an existing one sequence. The component also
follows the state-view-actions pattern. First, we create a handler
when the form is submitted.

    // src/components/EventForm.vue#6
    <form v-on:submit.prevent="saveEvent()" className="eventForm">
      ...
    </form>


    // src/components/EventForm.vue#109
    saveEvent() {
      this[SAVE_EVENT](this.aEvent)
        .then(() => {
          this.$emit("eventSelected", this.aEvent);
        });
    }


The `SAVE_EVENT` action is just a method that accepts an event object
and takes care of calling the API.

    // src/store/actions/index.js#13
    [actions.SAVE_EVENT]({ state, commit }, event) {
      if (event.id) {
        return api
          .updateEvent(event)
          .then(response => {
            commit(mutations.SET_EVENT, response.data);
          })
      } else {
        return api
          .createEvent(event)
          .then(response => {
            commit(mutations.SET_EVENT, response.data);
          })
      }
    },

After receiving the response from the API, the list of events is updated.

    // src/store/mutations/index.js#8
    [mutations.SET_EVENT](state, event) {
      const i = state[states.EVENTS].findIndex(e => e.id == event.id);

      if (i >= 0) {
        // DOM will not be updated if you modify via index.
        state[states.EVENTS].splice(i, 1, event);
      } else {
        state[states.EVENTS].push(event);
      }
    },

Since the `EventList` component is watching the events list object, it
automatically updates the list when an event is added or updated.


### Deleting an event

There is nothing special with deleting an event - it just follows the
state-view-action pattern like the other scenarios.

    // src/views/EventsView.vue#98
    deleteEvent(event) {
      this[DELETE_EVENT](event)
        .then(() => {
          this.$router.push({ name: "events" });
        })
    }


    // src/store/actions/index.js#28
    [actions.DELETE_EVENT]({ state, commit }, event) {
      if (event.id) {
        return api
          .deleteEvent(event)
          .then(response => {
            commit(mutations.DELETE_EVENT, event);
          })
      }
    }

    // src/store/mutations/index.js#18
    [mutations.DELETE_EVENT](state, event) {
      const i = state[states.EVENTS].findIndex(e => e.id == event.id);

      if (i >= 0) {
        state[states.EVENTS].splice(i, 1);
      }
    }


### Testing

I was curious how to test Vue applications so I added a simple
unit test using Jest. If you like to use a different framework,
the `vue-cli` create command will allow you to choose one.

To help in our testing, we use a factory method to prepare the
component to be tested.

    // tests/unit/Event.spec.js
    import { shallowMount } from "@vue/test-utils";
    import Event from "@/components/Event";

    const factory = (values = {}) => {
      return shallowMount(Event, {
        propsData: {
          event: { ...values }
        }
      });
    };

[shallowMount](https://vue-test-utils.vuejs.org/api/#shallowmount) loads a component and stubs the child components
which is perfect for unit testing. It also allows you to set
the `data` or `props` attributes of the component, for example:

    describe("Event", () => {
      it("renders the event details", () => {
        const wrapper = factory({
          title: "event title",
          event_type: "symposium"
        });

        expect(wrapper.find(".test-event-type").text()).toEqual("Type: symposium");
        expect(wrapper.find(".test-title").text()).toEqual("Title: event title");
      });
    });

To run the tests:

    npm run test:unit


Just follow the [Vue testing guide](https://vuejs.org/v2/cookbook/unit-testing-vue-components.html) if you want to dive deeper into
Vue testing.


## Conclusion

At this point, I hope you have a good idea how the different parts of Vue works
together. Like I said in the beginning, I'm not an expert in Vue nor have I
extensive experience on other Javascript frameworks like React. Though personally,
I find Vue more approachable and I will definitely use this in my personal
projects.

If you are new to Vue (like I am), I highly recommend you read their list
of [beginner gotchas](https://vuejs.org/2016/02/06/common-gotchas/). I
guarantee you in will save you lots of frustrations :)

If you are interested in comparing Vue with other frameworks, the [article
by Yogev Ahuvia is a good read](https://medium.com/fundbox-engineering/react-vs-vue-vs-angular-163f1ae7be56).
