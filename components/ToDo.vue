<template>
  <div class="todo-wrapper space-y-10">
    <div
      class="todo-body flex justify-start p-20 -ml-1 h-52 bg-slate-800 w-full"
    >
      <h1 class="header text-4xl text-right text-white font-semibold">
        Create your own to-do task
      </h1>
      <span class="absolute left-3/4 mt-2 sm:ml-7">
        <button
          type="button"
          v-on:click="OpenCreateTask"
          class="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </span>
    </div>
    <CreateTask :open="buttonClicked" @close="closeTask" />

    <div class="to-do-table w-full">
      <TodoTable :searchTitle="search" />
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CreateTask from "./task/CreateTask.vue";
import { ref } from "vue";

export default {
  name: "ToDo",
  components: {
    FontAwesomeIcon,
    CreateTask,
  },
  data() {
    return {
      icon: faMagnifyingGlass,
      buttonClicked: false,
      showDeleteModal: null,
      // Change this to the desired icon
    };
  },

  methods: {
    OpenCreateTask() {
      this.buttonClicked = true;
    },

    closeTask() {
      this.buttonClicked = false;
    },
  },
};
</script>