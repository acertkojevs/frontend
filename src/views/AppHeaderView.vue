<script setup lang="ts">

</script>
<template>
  <header class="flex items-center justify-between bg-green-700">
    <h1 class="text-3xl font-bold text-white p-4">
      Dungeon Heroes
    </h1>
    <nav class="flex">
      <ul class="flex gap-4 justify-center p-4">
        <li>
          <router-link :to="{ name: 'heroes' }" class="text-white hover:underline">Heroes</router-link>
        </li>
        <li>
          <router-link to="/about" class="text-white hover:underline">Dungeons</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'settings' }" class="text-white hover:underline">Settings</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
