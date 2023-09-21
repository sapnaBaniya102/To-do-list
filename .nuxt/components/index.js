export { default as MainContainer } from '../../components/MainContainer.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as SideBar } from '../../components/SideBar.vue'
export { default as ToDo } from '../../components/ToDo.vue'
export { default as TodoTable } from '../../components/TodoTable.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as IconMagnifierIcon } from '../../components/icon/MagnifierIcon.vue'
export { default as TaskCreateTask } from '../../components/task/CreateTask.vue'
export { default as TaskDeleteTask } from '../../components/task/DeleteTask.vue'
export { default as TaskUpdateTask } from '../../components/task/updateTask.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
