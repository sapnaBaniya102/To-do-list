<template>
  <div class="w-full">
    <!-- Modal toggle -->
    <!-- <button
      data-modal-target="authentication-modal"
      data-modal-toggle="authentication-modal"
      class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      Toggle modal
    </button> -->

    <!-- Main modal -->
    <div
      v-if="showModal"
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      class="absolute z-50 w-1/3 mx-auto mt-44 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            v-on:click="CloseModal"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Create a Task
            </h3>
            <form @submit.prevent="submitForm" class="space-y-6" action="#">
              <div>
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Task Title</label
                >
                <input
                  type="text"
                  name="title"
                  id="title"
                  v-model="taskData.title"
                  v-validate="'required'"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Create Task"
                  :class="{ input: true, 'is-danger': errors.has('title') }"
                />
                <span
                  v-show="errors.has('title')"
                  class="error text-xs text-red-400"
                  >* {{ errors.first("title") }}</span
                >
              </div>
              <div class="flex gap-2">
                <div class="w-1/2">
                  <label
                    for="estimated_hour"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Estimated Hour</label
                  >
                  <input
                    type="number"
                    name="estimated_hour"
                    id="estimated_hour"
                    v-model="taskData.estimated_hour"
                    v-validate="'required'"
                    placeholder="2"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    :class="{
                      input: true,
                      'is-danger': errors.has('estimated_hour'),
                    }"
                  />
                  <span
                    v-show="errors.has('estimated_hour')"
                    class="error text-xs text-red-400"
                    >* {{ errors.first("estimated_hour") }}</span
                  >
                </div>
                <div class="w-1/2">
                  <label
                    for="priority"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Task Priority</label
                  >
                  <select
                    id="priority"
                    name="priority"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="taskData.priority"
                    v-validate="'required'"
                    :class="{
                      input: true,
                      'is-danger': errors.has('priority'),
                    }"
                  >
                    <option value="" disabled selected>Choose priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <span
                    v-show="errors.has('priority')"
                    class="error text-xs text-red-400"
                    >* {{ errors.first("priority") }}</span
                  >
                </div>
              </div>
              <div>
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Task Description</label
                >
                <textarea
                  id="description"
                  name="description"
                  v-model="taskData.description"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

    
<script >
import { ref } from "vue";
import nuxtStorage from "nuxt-storage";

export default {
  name: "CreateTask",

  components: {},

  props: {
    open: Boolean,
  },
  data() {
    return {
      showModal: this.open,

      taskData: {
        id: "",
        title: "",
        estimated_hour: "",
        priority: "",
        description: "",
        // Add more form fields here
      },
    };
  },

  watch: {
    open(newVal) {
      // Update the local data property when the prop changes
      this.showModal = newVal;
    },
  },

  methods: {
    CloseModal() {
      this.showModal = false;
      this.$emit("close");
    },

    submitForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          let formDataArray =
            nuxtStorage.localStorage.getData("TaskArray") || [];

          const maxId =
            formDataArray.length > 0
              ? Math.max(...formDataArray.map((item) => item.id))
              : 0;

          // Assign a new ID that is one greater than the maximum ID
          this.taskData.id = maxId + 1;

          // Push the current form data into the array
          formDataArray.push(this.taskData);

          // Store the updated array in local storage
          nuxtStorage.localStorage.setData("TaskArray", formDataArray, 1, "d");

          this.showModal = false;
          this.$emit("close");
        }
      });
    },

    mounted() {
      // Retrieve the array of form data from local storage when the component is mounted
      const formDataArray = nuxtStorage.localStorage.getData("TaskArray") || [];

      // You can use this array as needed in your component
    },
  },
};

// const isOpen = ref(false);
</script>