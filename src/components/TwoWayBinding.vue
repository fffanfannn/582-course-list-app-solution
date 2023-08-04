<template>
  <label for="firstName">omponent:</label>
  <!-- <input type="text" name="firstName" id="firstName" v-model="inputName" /> -->
  <input
    type="text"
    name="firstName"
    id="firstName"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "TwoWayBinding",
  props: ["modelValue"],

  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
