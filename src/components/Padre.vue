<template>
  <section>
    <ul ref="drag" class="draggable" v-bind:class="getClass" >
      <Hijo v-for="item in items"
        v-bind:item="item"
        v-bind:key="item"/>
    </ul>
    <label><input type="checkbox" v-model="scrollBarsVisibles"/> Show scroll bars</label>
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
      items: Array.apply(null, {length: 10}).map(Number.call, Number),
      scrollBarsVisibles: true
    }
  },
  computed: {
    getClass() {
      let styles = []
      this.scrollBarsVisibles && styles.push('noScrollBars')
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
        default:
          break;
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
    border: 0.3rem solid black;
    list-style: none;
    width: 10rem;
    height: 10rem;
    overflow: auto;
    flex-wrap: wrap;
  }
  .noScrollBars {
    overflow-x: hidden;
    overflow-y: hidden;
  }
    .draggable::after {
      display: block;
      position: absolute;
      content: "\A0";
      pointer-events: none;
      width: 10rem;
      height: 10rem;
      transition: box-shadow .5s linear;
    }
    .draggable.shadow-overflow-none::after {
       box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.80) inset,
         0 0 0 0 rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-top::after {
      box-shadow: 0 2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset,
        0 0 0 0 rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-top-right::after {
      box-shadow: -2rem 2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset,
        0 0 0 0 rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-top-bottom::after {
      box-shadow: 0 2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset,
        0 -2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-top-left::after {
      box-shadow: 0 2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset,
        2rem 0px 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-top-right-bottom::after {
      box-shadow: -2rem 2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset,
        0 -2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-top-bottom-left::after {
      box-shadow: 0 2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset,
       2rem -2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-top-right-left::after {
      box-shadow: -2rem 2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset,
       2rem 0px 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-top-right-bottom-left::after {
      box-shadow: -2rem 2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset,
       2rem -2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-right::after {
      box-shadow: -2rem 0px 1rem -1rem rgba(0, 0, 0, 0.80) inset,
        0 0 0 0 rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-right-bottom::after {
      box-shadow: -2rem 0px 1rem -1rem rgba(0, 0, 0, 0.80) inset,
        0 -2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset;;
    }
    .draggable.shadow-overflow-right-left::after {
      box-shadow: -2rem 0px 1rem -1rem rgba(0, 0, 0, 0.80) inset,
       2rem 0px 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-right-bottom-left::after {
      box-shadow: -2rem 0px 1rem -1rem rgba(0, 0, 0, 0.80) inset,
       2rem -2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-bottom::after {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.80) inset,
        0 -2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-bottom-left::after {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.80) inset,
        2rem -2rem 1rem -1rem rgba(0, 0, 0, 0.80) inset;
    }
    .draggable.shadow-overflow-left::after {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.80) inset,
        2rem 0px 1rem -1rem rgba(0, 0, 0, 0.80) inset;
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
