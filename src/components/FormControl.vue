<template>
    <TheForm @add-task="updateList"></TheForm>
    <ListLayout v-if="tasks.length > 0" :taskList="tasks"></ListLayout>
</template>

<script>
import TheForm from './TheForm.vue';
import ListLayout from './ListLayout';
// import { reactive, provide } from 'vue';
// let tasks = reactive([]);

export default {
  name: 'App',
  components: {
    TheForm,
    ListLayout
  },
  data() {
      return {
          tasks: []
      }
  },
  methods: {
      updateList(obj) {
          console.log(obj)
          this.tasks.unshift(obj);
      }
  },
//   setup() {
//     provide('taskList', tasks);
//   }
}
</script>

<style>
.clickable {
    cursor: pointer;
}
</style>