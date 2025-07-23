<script setup lang="ts">
import { useUserStore } from '@/stores/User.ts'
import { computed } from 'vue';

const userStore = useUserStore()
const selectedclass = computed(() => {
  const index = userStore.userData.selectedClass;
  return index >= 0 ? userStore.userData.classes[index] : null;
});

</script>

<template>

  <article v-if="selectedclass"
    class="max-w-md w-full  bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 space-y-4 border border-gray-300 dark:border-gray-700">
    <h1 class="text-2xl font-bold text-center text-gray-800 dark:text-white">
      {{ selectedclass.name }}
    </h1>

    <div class="text-sm text-gray-600 dark:text-gray-300 text-center">
      Level {{ selectedclass.baseStats.level }} / {{ selectedclass.baseStats.maxLevel }}<br>
      XP: {{ selectedclass.baseStats.xp }} / {{ selectedclass.baseStats.xpToNextLevel }}<br>
      Unspent Skill Points: <span class="font-semibold text-yellow-500">{{ selectedclass.baseStats.unspentSkillPoints
      }}</span>
    </div>

    <div class="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-200 text-sm">
      <div>
        <strong>HP:</strong> {{ selectedclass.baseStats.maxHealth }}<br>
        <strong>Regen:</strong> {{ selectedclass.baseStats.healthRegen }} / {{
          selectedclass.baseStats.healthRegenInterval / 1000 }}s
      </div>
      <div>
        <strong>Stamina:</strong> {{ selectedclass.baseStats.maxStamina }}<br>
        <strong>Regen:</strong> {{ selectedclass.baseStats.staminaRecover }} / {{
          selectedclass.baseStats.staminaRecoverInterval / 1000 }}s
      </div>
    </div>

    <div class="border-t border-gray-300 dark:border-gray-700 pt-4">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Stats</h2>
      <ul class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-200">
        <li><strong>Vitality:</strong> {{ selectedclass.baseStats.vitality }}</li>
        <li><strong>Endurance:</strong> {{ selectedclass.baseStats.endurance }}</li>
        <li><strong>Power:</strong> {{ selectedclass.baseStats.power }}</li>
        <li><strong>Dodge:</strong> {{ selectedclass.baseStats.dodge }}</li>
        <li><strong>Resilience:</strong> {{ selectedclass.baseStats.resilience }}</li>
        <li><strong>Luck:</strong> {{ selectedclass.baseStats.luck }}</li>
      </ul>
    </div>
  </article>

</template>
