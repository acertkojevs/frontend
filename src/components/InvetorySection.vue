<script setup lang="ts">
import items from '@/types/ItemType';

</script>

<template>

  <section
    class="grid grid-cols-10 gap-2 content-start bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-3 space-y-4 border border-gray-300 dark:border-gray-700">
    <div v-for="item in items" :key="item.id"
      class="bg-gray-700 w-10 h-10 p-0 m-0 flex items-center rounded-md text-white">
      {{ item.id }}
    </div>
  </section>

</template>
