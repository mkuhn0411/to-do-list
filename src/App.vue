<template>
  <FormControl></FormControl>
</template>

<script>
import FormControl from './components/FormControl.vue'

export default {
  name: 'App',
  components: {
    FormControl
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

textarea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
