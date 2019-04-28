<template>
  <div id="app">
    <Padre/>
  </div>
</template>

<script>
import Padre from "./components/Padre";

export default {
  name: "App",
  components: {
    Padre
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
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
ul li {
  background-color: #cac;
  transition: background-color 0.3s;
}
ul li:nth-child(2n) {
  background-color: #acc;
  margin: 1rem;
}
ul li.click {
  background-color: yellow;
}
ul li a {
  padding: 0.5rem 1rem;
  white-space: nowrap;
}
</style>
