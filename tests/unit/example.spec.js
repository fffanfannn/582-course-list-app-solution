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

  it("renders default object when passed ", async () => {
    const wrapper = shallowMount(CourseItem);
    expect(wrapper.find("h2").text()).toBe("Course Name");
  });

  it("renders props.course when passed ", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    expect(wrapper.find("h2").text()).toBe("Vue.js");
    expect(wrapper.find("p").text()).toBe(
      "The Progressive JavaScript Framework"
    );
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

  // test 'Add Course' button display, remove, click action, and class name changes accordingly

  it("displays 'Add Course' button display, when isAdded is false(by default), ", () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Add Course");
  });

  it(" isFull is false and isAdded is false ", () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    expect(wrapper.vm.isFull).toBe(false);
    expect(wrapper.vm.isAdded).toBe(false);
  });

  it("when 'Add Course' button is clicked, emits 'addCourse' event with correct course id", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().addCourse).toBeTruthy;
    expect(wrapper.emitted().addCourse[0]).toEqual([1]);
  });

  it("when 'Add Course' button is clicked, isAdded is updated to true, class name contains isAdded", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.isAdded).toBe(true);
    expect(wrapper.classes()).toContain("isAdded");
  });

  it("when 'Add Course' button is clicked, 'Add Course' button is replaced ", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    await wrapper.find('[data-testid="add-course-btn"]').trigger("click");
    expect(wrapper.find('[data-testid="add-course-btn"]').exists()).toBe(false);
  });

  // test 'Remove Course' button display, remove, click action, and class name changes accordingly

  it("when 'Add Course' button is clicked, 'Add Course' button is replaced by 'Remove Course' button", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    await wrapper.find('[data-testid="add-course-btn"]').trigger("click");
    expect(wrapper.find('[data-testid="remove-course-btn"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-testid="remove-course-btn"]').text()).toBe(
      "Remove Course"
    );
  });

  it("when 'Remove Course' button is clicked, emits 'removeCourse' event with correct course id", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    await wrapper.find('[data-testid="add-course-btn"]').trigger("click");
    await wrapper.find('[data-testid="remove-course-btn"]').trigger("click");
    expect(wrapper.emitted().removeCourse).toBeTruthy;
    expect(wrapper.emitted().removeCourse[0]).toEqual([1]);
  });

  it("when 'Remove Course' button is clicked, isAdded is updated to false, and issAdded is removed in class name", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    await wrapper.find('[data-testid="add-course-btn"]').trigger("click");
    await wrapper.find('[data-testid="remove-course-btn"]').trigger("click");
    expect(wrapper.vm.isAdded).toBe(false);
    expect(wrapper.classes()).not.toContain("isAdded");
  });

  it("when 'Remove Course' button is clicked, 'Remove Course' button is replaced ", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    await wrapper.find('[data-testid="add-course-btn"]').trigger("click");
    await wrapper.find('[data-testid="remove-course-btn"]').trigger("click");
    expect(wrapper.find('[data-testid="remove-course-btn"]').exists()).toBe(
      false
    );
  });

  it("when 'Remove Course' button is clicked, 'Remove Course' button is replaced by 'Add Course' button", async () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    await wrapper.find('[data-testid="add-course-btn"]').trigger("click");
    await wrapper.find('[data-testid="remove-course-btn"]').trigger("click");
    expect(wrapper.find('[data-testid="add-course-btn"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="add-course-btn"]').text()).toBe(
      "Add Course"
    );
  });

  // test enrollment status with dynamic content, and class name isFull is added accordingly.

  it("if enrollment is 10, enrollment status is 'available to join' ", () => {
    const wrapper = shallowMount(CourseItem, {
      props: { course },
    });
    expect(wrapper.find("span").text()).toBe("available to join");
    expect(wrapper.vm.isFull).toBe(false);
  });

  it("if enrollment is 0, enrollment status is 'empty' ", () => {
    const wrapper = shallowMount(CourseItem, {
      props: {
        course: {
          name: "Vue.js",
          description: "The Progressive JavaScript Framework",
          hours: 50,
          credits: 3,
          location: "Online",
          instructor: "John Doe",
          id: 1,
          enrollment: 0,
        },
      },
    });
    expect(wrapper.find("span").text()).toBe("empty");
    expect(wrapper.vm.isFull).toBe(false);
  });

  it("if enrollment is 20, enrollment status is 'full'", () => {
    const wrapper = shallowMount(CourseItem, {
      props: {
        course: {
          name: "Vue.js",
          description: "The Progressive JavaScript Framework",
          hours: 50,
          credits: 3,
          location: "Online",
          instructor: "John Doe",
          id: 1,
          enrollment: 20,
        },
      },
    });
    expect(wrapper.find("span").text()).toBe("full");
  });

  it("if enrollment is 20, isFull is true, and class name 'isFull' is added", () => {
    const wrapper = shallowMount(CourseItem, {
      props: {
        course: {
          name: "Vue.js",
          description: "The Progressive JavaScript Framework",
          hours: 50,
          credits: 3,
          location: "Online",
          instructor: "John Doe",
          id: 1,
          enrollment: 20,
        },
      },
    });
    expect(wrapper.vm.isFull).toBe(true);
    expect(wrapper.classes()).toContain("isFull");
  });
});
