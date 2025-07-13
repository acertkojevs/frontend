<script setup lang="ts">

</script>
<template>
  <footer class="text-xs bg-green-700 flex justify-between items-center flex-col">
    <h1>© 2025 Dungeon Heroes</h1>
    <nav class="flex gap-4 items-center">
      <router-link to="/changelog" class="hover:text-white">v1.0.0</router-link>
      <router-link to="https://discord.gg/yourgame" target="_blank" class="hover:text-white">Discord</router-link>
      <router-link to="/terms" class="hover:text-white">Terms</router-link>
    </nav>
  </footer>
</template>
