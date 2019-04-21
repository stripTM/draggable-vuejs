<template>
  <section>
    <ul ref="drag">
      <Hijo v-for="item in items"
        v-bind:item="item"
        v-bind:key="item" 
        :preventClick="mouseMove"/>­
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
  }
}
</script>