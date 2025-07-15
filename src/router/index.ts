import { createRouter, createWebHistory } from 'vue-router'
import AppLandingView from '@/views/AppLandingView.vue'
import AppSettingView from '@/views/AppSettingView.vue'
import AppHeroesView from '@/views/AppHeroesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: AppLandingView },
    { path: '/settings', name: 'settings', component: AppSettingView },
    { path: '/heroes', name: 'heroes', component: AppHeroesView },
  ],
})

export default router
