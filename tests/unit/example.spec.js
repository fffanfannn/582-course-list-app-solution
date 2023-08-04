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
  it("renders default object when passed ", async () => {
    const wrapper = shallowMount(CourseItem);
    expect(wrapper.find("h2").text()).toBe("Course Name");
  });

  it("renders props.msg when passed to course name", async () => {
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

    expect(wrapper.find("h2").text()).toBe("Vue.js");
    // setData not works for props
    // await wrapper.setData({
    //   course: {
    //     name: "Vue",
    //   },
    // });
    // expect(wrapper.find("h2").text()).toBe("Vue");

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

    expect(wrapper.find("h2").text()).toBe("React");
  });

  it("renders props.msg when passed to course discription", () => {
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

    expect(wrapper.find("p").text()).toBe(
      "The Progressive JavaScript Framework"
    );
  });

  it("When isAdded is false(by default), Add Course button display", () => {
    const wrapper = shallowMount(CourseItem);
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Add Course");
  });

  it("When click button, tringger the sendAdd function", async () => {
    const wrapper = shallowMount(CourseItem);
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().sendAdd[0]).toEqual(true);
  });
});
