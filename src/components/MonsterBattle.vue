<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { computed } from 'vue';

const userStore = useUserStore();
const monster = computed(() => userStore.userData.selectedMonster);

</script>

<template>
  <article class="bg-green-100 border border-green-300 p-4 rounded-xl shadow-md w-full max-w-sm text-center">
    <h2 class="text-2xl font-bold text-green-800 mb-2">{{ monster?.name }}</h2>
    <div class="text-sm text-gray-700 mb-2">Level: {{ monster?.level }}</div>

    <div class="bg-white rounded-lg shadow-inner overflow-hidden h-4 mb-3">
      <div class="bg-green-500 h-full"
        :style="{ width: `${(monster!.baseStats.health / monster!.baseStats.maxHealth) * 100}%` }">
      </div>
    </div>
    <div class="text-xs text-gray-600 mb-4">
      HP: {{ monster?.baseStats.health }} / {{ monster?.baseStats.maxHealth }}
    </div>
    <!-- <div v-for="skill in monster?.skills" class="text-xs text-gray-600 mb-1">
      <strong>{{ skill.name }}:</strong> {{ skill.minDamage }} - {{ skill.maxDamage }} damage, Cooldown: {{
        skill.cooldown / 1000 }}s
    </div> -->
    <div class="text-xs text-gray-600">XP Reward: {{ monster?.xp }}</div>
  </article>
</template>
