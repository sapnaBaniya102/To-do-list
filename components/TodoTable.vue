<template>
  <div class="table-body">
    <div class="relative overflow-x-auto shadow-lg sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-slate-200 dark:bg-slate-800 dark:text-gray-400"
        >
          <tr>
            <th
              v-for="(item, index) in headers"
              v-bind:key="index"
              scope="col"
              class="px-6 py-3"
            >
              {{ item }}
            </th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody v-if="TaskList.length > 0">
          <tr
            v-for="(item, index) in TaskList"
            v-bind:key="index"
            class="bg-gray-50 border-b dark:bg-gray-700 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              v-for="(item1, index1) in item"
              v-bind:key="index1"
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item1 }}
            </th>

            <td class="flex items-center px-6 py-4 space-x-3">
              <button
                type="button"
                v-on:click="UpdateTask(item)"
                class="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit
              </button>
              <button
                type="button"
                v-on:click="DeleteTask(item)"
                class="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <p class="flex text-center">No Data Found</p>
        </tbody>
      </table>
    </div>
    <div v-if="buttonClicked">
      <DeleteTask :open="buttonClicked" :id="listId" @close="closeTask" />
    </div>
    <div v-if="update">
      <updateTask :open="update" :id="listId" @closeUpdate="closeUpdateTask" />
    </div>
  </div>
</template>
<script>
import nuxtStorage from "nuxt-storage";
import { ref, moun } from "vue";
import DeleteTask from "./task/DeleteTask.vue";
import updateTask from "./task/updateTask.vue";

export default {
  name: "TodoTable",

  components: {
    DeleteTask,
    updateTask,
  },
  data() {
    return {
      TaskList: [],
      buttonClicked: false,
      update: false,
      listId: null,
      headers: ["id", "title", "estimated_hour", "priority", "description"],
    };
  },

  mounted() {
    // Retrieve the array of from local storage when the component is mounted
    const formDataArray =
      JSON.parse(
        JSON.stringify(nuxtStorage.localStorage.getData("TaskArray"))
      ) || [];

    // Set the component's data property to the retrieved data
    this.TaskList = formDataArray;
    if (this.TaskList.length > 0) {
      const Keys = Object.keys(this.TaskList[0]);
      this.headers = Keys;
    }

    // Watch for changes in local storage using the storage event
    window.addEventListener("storage", this.handleStorageChange);
  },

  methods: {
    handleStorageChange(event) {
      // Check if the changed item is the one you're interested in
      if (event.key === "TaskArray") {
        // Retrieve the updated data from local storage
        const formDataArray = JSON.parse(event.newValue) || [];

        // Update the component's data property with the updated data
        this.TaskList = formDataArray;
      }
    },

    DeleteTask(id) {
      this.buttonClicked = true;
      this.listId = id["id"];

      // const listId = id["id"];
      // const newData = this.TaskList.filter((item) => item.id !== listId);
      // nuxtStorage.localStorage.setData("TaskArray", newData);
    },

    UpdateTask(id) {
      this.update = true;
      this.listId = id;

      // const listId = id["id"];
      // const newData = this.TaskList.filter((item) => item.id !== listId);
      // nuxtStorage.localStorage.setData("TaskArray", newData);
    },

    closeTask() {
      this.buttonClicked = false;
    },

    closeUpdateTask() {
      this.update = false;
    },
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener("storage", this.handleStorageChange);
  },
};
</script>