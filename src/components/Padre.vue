<template>
  <section>
    <ul ref="drag" v-bind:class="getClass">
      <Hijo v-for="item in items"
        v-bind:item="item"
        v-bind:key="item"/>
    </ul>
  </section>
</template>
<script>
import Hijo from './Hijo'
import {draggable} from '../mixins/draggable'

export default {
  name: 'Padre',
  mixins: [draggable],
  components: {
    Hijo
  },
  data() {
    return {
      items: Array.apply(null, {length: 100}).map(Number.call, Number)
    }
  },
  computed: {
    getClass() {
      return this.dragging ? 'disabled' : ''
    }
  }
}
</script>
<style scoped>
  .disabled {
    cursor: grabbing;
  }
  .disabled > * {
    pointer-events: none;
  }
</style>
