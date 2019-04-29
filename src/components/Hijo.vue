<template>
  <li v-bind:class="getStatus">
    {{ getStatus }}
    <a
      href="#foo"
      v-on:click="handleClick"
    >{{ item }} Lorem ipsum dolor sit amet</a>
  </li>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  name: "Hijo",
  props: {
    item: Number
  },
  data() {
    return {
      hasClicked: false
    };
  },
  methods: {
    handleClick() {
      this.hasClicked = true;
      setTimeout( () => this.hasClicked = false, 300)
    }
  },
  computed: {
    getStatus() {
      return this.hasClicked ? "click" : "idle";
    }
  }
};
</script>