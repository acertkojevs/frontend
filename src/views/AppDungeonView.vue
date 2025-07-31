<script setup lang="ts">
import MonsterSection from '@/components/MonsterSection.vue';
import { ref } from 'vue';

const showMonsters = ref(true);

</script>

<template>
  <section class="flex items-center justify-center">
    <nav class="bg-gray-800 text-white px-6 py-4 shadow-md flex space-x-8 text-lg font-medium">
      <div class="hover:text-yellow-400 cursor-pointer transition" @click="showMonsters = true">Monsters</div>
      <div class="hover:text-yellow-400 cursor-pointer transition" @click="showMonsters = false">Dungeons</div>
    </nav>

  </section>

  <MonsterSection v-if="showMonsters" />

</template>
