import home from '../components/Home/Index.vue'
import { createRouter, createWebHistory } from 'vue-router'
// there is also createWebHashHistory and createMemoryHistory
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: home,
      path: '/'
    }
  ],
})