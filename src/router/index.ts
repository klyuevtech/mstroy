import TreeStoreTable from '@/components/tree-store-table/tree-store-table.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ name: 'home', path: '/', component: TreeStoreTable }],
})

export default router
