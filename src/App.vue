<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppheaderView from '@/views/AppHeaderView.vue'
import AppFooterView from '@/views/AppFooterView.vue'
</script>

<template>
  <AppheaderView />
  <RouterView />
  <AppFooterView />
</template>
