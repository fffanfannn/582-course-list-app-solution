<template>
  <h2>Course List</h2>
  <div class="course-list">
    <CourseItem
      v-for="course in courses"
      :course="course"
      @addCourse="addCourse"
      @removeCourse="removeCourse"
      :key="course.id"
    ></CourseItem>
  </div>
</template>

<script>
import CourseItem from "./CourseItem.vue";

export default {
  name: "CourseList",
  props: {
    courses: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    CourseItem,
  },
  methods: {
    addCourse(id) {
      this.$emit("addCourse", id);
      console.log("send this added course id: ", id, " to selected courses");
    },
    removeCourse(id) {
      this.$emit("removeCourse", id);
    },
  },
};
</script>

<style scoped lang="scss">
// .course-list {
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
// }
</style>
