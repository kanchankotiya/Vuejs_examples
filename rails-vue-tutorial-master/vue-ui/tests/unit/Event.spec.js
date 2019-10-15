import { shallowMount } from "@vue/test-utils";
import Event from "@/components/Event";

const factory = (values = {}) => {
  return shallowMount(Event, {
    propsData: {
      event: { ...values }
    }
  });
};

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

