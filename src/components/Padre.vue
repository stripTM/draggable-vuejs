<template>
  <section>
    <ul ref="drag" class="draggable" v-bind:class="getClass" >
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
      let styles = []
      this.dragging && styles.push('disabled')
      switch(true) {
        case (this.inBeginningX && this.inEndX && this.inBeginningY && this.inEndY):
          styles.push('shadow-overflow-none')
          break
        case (this.inBeginningX && this.inEndX && !this.inBeginningY && this.inEndY):
          styles.push('shadow-overflow-top')
          break
        case (this.inBeginningX && !this.inEndX && !this.inBeginningY && this.inEndY):
          styles.push('shadow-overflow-top-right')
          break
        case (this.inBeginningX && this.inEndX && !this.inBeginningY && !this.inEndY):
          styles.push('shadow-overflow-top-bottom')
          break
        case (!this.inBeginningX && this.inEndX && !this.inBeginningY && this.inEndY):
          styles.push('shadow-overflow-top-left')
          break
        case (this.inBeginningX && !this.inEndX && !this.inBeginningY && !this.inEndY):
          styles.push('shadow-overflow-top-right-bottom')
          break
        case (!this.inBeginningX && this.inEndX && !this.inBeginningY && !this.inEndY):
          styles.push('shadow-overflow-top-bottom-left')
          break
        case (!this.inBeginningX && !this.inEndX && !this.inBeginningY && this.inEndY):
          styles.push('shadow-overflow-top-right-left')
          break
        case (!this.inBeginningX && !this.inEndX && !this.inBeginningY && !this.inEndY):
          styles.push('shadow-overflow-top-right-bottom-left')
          break
        case (this.inBeginningX && !this.inEndX && this.inBeginningY && this.inEndY):
          styles.push('shadow-overflow-right')
          break
        case (this.inBeginningX && !this.inEndX && this.inBeginningY && !this.inEndY):
          styles.push('shadow-overflow-right-bottom')
          break
        case (!this.inBeginningX && !this.inEndX && this.inBeginningY && this.inEndY):
          styles.push('shadow-overflow-right-left')
          break
        case (!this.inBeginningX && !this.inEndX && this.inBeginningY && !this.inEndY):
          styles.push('shadow-overflow-right-bottom-left')
          break
        case (this.inBeginningX && this.inEndX && this.inBeginningY && !this.inEndY):
          styles.push('shadow-overflow-bottom')
          break
        case (!this.inBeginningX && this.inEndX && this.inBeginningY && !this.inEndY):
          styles.push('shadow-overflow-bottom-left')
          break
        case (!this.inBeginningX && this.inEndX && this.inBeginningY && this.inEndY):
          styles.push('draggable.shadow-overflow-left')
          break
      }
      return styles
    }
  }
}
</script>
<style>
  .draggable {
    display: flex;
    cursor: grab;
    margin: 0;
    padding: 0;
    list-style: none;
    width: 10rem;
    height: 10rem;
    overflow: auto;
    flex-wrap: wrap;
  }
    .draggable::after {
      display: block;
      position: absolute;
      content: "\A0";
      pointer-events: none;
      width: 10rem;
      height: 10rem;
      transition: background-position .5s linear, background-size .5s linear;
      background: linear-gradient(to right,
     rgba(0,0,0,.7) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,.7) 100%),
      linear-gradient(to bottom,
     rgba(0,0,0,.7) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,.7) 100%);
      background-repeat: no-repeat;
      background-size: 14rem; /* 10 + 4 */
      background-position: center;
    }
    .draggable.shadow-overflow-none::after {
      background-position: center;
      background-size: 14rem 14rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-top::after {
      background-position-y: 0;
      background-size: 14rem 12rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-top-right::after {
      background-position-x: -2rem;
      background-position-y: 0;
      background-size: 12rem 12rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-top-bottom::after {
      background-position-x: center;
      background-position-y: 0;
      background-size: 14rem 10rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-top-left::after {
      background-position-x: 0;
      background-position-y: 0;
      background-size: 12rem 12rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-top-right-bottom::after {
      background-position-x: -2rem;
      background-position-y: 0;
      background-size: 12rem 10rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-top-bottom-left::after {
      background-position-x: 0;
      background-position-y: 0;
      background-size: 12rem 10rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-top-right-left::after {
      background-position-x: 0;
      background-position-y: 0;
      background-size: 10rem 12rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-top-right-bottom-left::after {
      background-position-x: 0;
      background-position-y: 0;
      background-size: 10rem 10rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-right::after {
      background-position-x: -2rem;
      background-position-y: center;
      background-size: 12rem 14rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-right-bottom::after {
      background-position-x: -2rem;
      background-position-y: -2rem;
      background-size: 12rem 12rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-right-left::after {
      background-position-x: 0;
      background-position-y: center;
      background-size: 10rem 14rem;
    }
    .draggable.shadow-overflow-right-bottom-left::after {
      background-position-x: 0;
      background-position-y: -2rem;
      background-size: 10rem 12rem;
    }
    .draggable.shadow-overflow-bottom::after {
      background-position-x: center;
      background-position-y: -2rem;
      background-size: 14rem 12rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-bottom-left::after {
      background-position-x: 0;
      background-position-y: -2rem;
      background-size: 12rem 12rem; /* 10 + 2 */
    }
    .draggable.shadow-overflow-left::after {
      background-position-x: 0;
      background-position-y: center;
      background-size: 12rem 14rem; /* 10 + 2 */
    }
    */
  .draggable li {
    background-color: #cac;
    transition: background-color 0.3s;
  }
  .draggable li:nth-child(2n) {
    background-color: #acc;
    margin: 1rem;
  }
  .draggable li.click {
    background-color: yellow;
  }
  .draggable li a {
    padding: 0.5rem 1rem;
    white-space: nowrap;
  }
  .draggable.disabled {
    cursor: grabbing;
  }
  .draggable.disabled > * {
    pointer-events: none;
  }
</style>
