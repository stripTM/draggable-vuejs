<template>
  <li>
    {{ getStatus }}
    <a
      href="http://vuejs.org"
      v-on:click="cancelClick"
    >{{ item }} Lorem ipsum dolor sit amet</a>
  </li>
</template>
<script>
export default {
  name: "Hijo",
  props: {
    item: Number,
    preventClick: Boolean
  },
  data() {
    return {
      hasClicked: false
    };
  },
  methods: {
    cancelClick(e) {
      if (this.preventClick) {
        e.preventDefault();
      } else {
        this.hasClicked = true;
      }
    }
  },
  computed: {
    getStatus() {
      return this.hasClicked ? "¡clic!" : "new";
    }
  }
};
</script>