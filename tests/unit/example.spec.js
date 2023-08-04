import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import CourseItem from "@/components/CourseItem.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("CourseItem.vue", () => {
  it("shows the button when visible is true", () => {
    const buttonText = "Button";
    const wrapper = shallowMount(CourseItem);
    // expect(wrapper.text()).toBe(buttonText);
    expect(wrapper.find("[data-testid='action']").text()).toBe(buttonText);
  });
});
