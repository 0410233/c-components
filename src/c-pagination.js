import CPagination from './c-pagination/CPagination.vue';

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('c-pagination', CPagination);
}
