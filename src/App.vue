<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppheaderView from '@/views/AppHeaderView.vue'
import AppFooterView from '@/views/AppFooterView.vue'
import { useUserStore } from '@/stores/User.ts'
import { onMounted } from 'vue'

onMounted(() => {
  useUserStore().loadUser()
})

</script>

<template>
  <AppheaderView />
  <RouterView />
  <AppFooterView />
</template>
