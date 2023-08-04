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
  it("renders props.msg when passed", async () => {
    const course = {
      name: "Vue.js",
      description: "The Progressive JavaScript Framework",
      hours: 50,
      credits: 3,
      location: "Online",
      instructor: "John Doe",
      id: 1,
      enrollment: 10,
    };

    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });

    expect(wrapper.find("h2").text()).toMatch("Vue.js");

    await wrapper.setData({
      course: {
        name: "Vue",
      },
    });

    expect(wrapper.find("h2").text()).toMatch("Vue");

    await wrapper.setProps({
      course: {
        name: "React",
        description: "The Progressive JavaScript Framework",
        hours: 50,
        credits: 3,
        location: "Online",
        instructor: "John Doe",
        id: 1,
        enrollment: 10,
      },
    });

    expect(wrapper.find("h2").text()).toMatch("React");



    
  });
});
