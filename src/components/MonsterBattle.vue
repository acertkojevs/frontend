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
    <div class="text-xs text-gray-600 mb-4">
      HP Regen: {{ monster?.baseStats.healthRegen }} HP / {{ monster!.baseStats.healthRegenInterval / 1000 }}s
    </div>

    <div class="text-xs text-gray-600">XP Reward: {{ monster?.xp }}</div>
    <section class="border-t border-gray-300 dark:border-gray-700 pt-4">

      <div v-for="skill in userStore.selectedMonster?.skills" :key="skill.name">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ skill.name }}</h2>

        <!-- Progress bar -->
        <progress class="progress w-56 text-gray-800" :value="skill.progress" max="100"></progress>

        <div class="text-gray-800">Cooldown: {{ skill.cooldown / 1000 }}s</div>
        <div v-if="skill.type === 'damage'" class="text-gray-800">
          Damage: {{ skill.minDamage }} - {{ skill.maxDamage }}
        </div>
      </div>
    </section>
  </article>
</template>
