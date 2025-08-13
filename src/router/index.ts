import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/User'
import AppLandingView from '@/views/AppLandingView.vue'
import AppSettingView from '@/views/AppSettingView.vue'
import AppHeroesView from '@/views/AppHeroesView.vue'
import AppDungeonView from '@/views/AppDungeonView.vue'
import AppBattleView from '@/views/AppBattleView.vue'
import AppAchievementsView from '@/views/AppAchievementsView.vue'
import AppInventory from '@/views/AppInventory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'landing', component: AppLandingView },
    { path: '/dungeon', name: 'dungeon', component: AppDungeonView },
    { path: '/battle', name: 'battle', component: AppBattleView },
    { path: '/achievements', name: 'achievements', component: AppAchievementsView },
    { path: '/settings', name: 'settings', component: AppSettingView },
    { path: '/heroes', name: 'heroes', component: AppHeroesView },
    { path: '/inventory', name: 'inventory', component: AppInventory },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (!localStorage.getItem('data')) {
    userStore.loadUser()
  }

  next()
})


export default router
