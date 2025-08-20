<script setup lang="ts">
import { useUserStore } from '@/stores/User.ts'

const userStore = useUserStore()
// const selectedclass = userStore.selectedClass;


</script>

<template>

  <section v-if="userStore.selectedClass"
    class="max-w-md w-full  bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 space-y-4 border border-gray-300 dark:border-gray-700">
    <h1 class="text-2xl font-bold text-center text-gray-800 dark:text-white">
      {{ userStore.selectedClass.name }}
    </h1>

    <div class="text-sm text-gray-600 dark:text-gray-300 text-center">
      Level {{ userStore.selectedClass.baseStats.level }} / {{ userStore.selectedClass.baseStats.maxLevel }}<br>
      XP: {{ userStore.selectedClass.baseStats.xp }} / {{ userStore.selectedClass.baseStats.xpToNextLevel }}<br>
      Unspent Skill Points: <span class="font-semibold text-yellow-500">{{
        userStore.selectedClass.baseStats.unspentSkillPoints
        }}</span>
    </div>

    <div class="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-200 text-sm">
      <div>
        <strong>HP:</strong> {{ userStore.selectedClass.baseStats.health }} / {{
          userStore.selectedClass.baseStats.maxHealth }} <br>
        <strong>Regen:</strong> {{ userStore.selectedClass.baseStats.healthRegen }} / {{
          userStore.selectedClass.baseStats.healthRegenInterval / 1000 }}s
      </div>
    </div>

    <div class="border-t border-gray-300 dark:border-gray-700 pt-4">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Stats</h2>
      <ul class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-200">
        <li v-for="(value, name) in userStore.selectedClass.baseStats.attributes" :key="value">
          <strong>{{ name }}:</strong> {{ userStore.selectedClass.baseStats.attributes[name] }}
          <button v-if="userStore.selectedClass.baseStats.unspentSkillPoints > 0" @click="userStore.levelUpStat(name)">
            Level up
          </button>
        </li>
      </ul>
    </div>
    <section class="border-t border-gray-300 dark:border-gray-700 pt-4">

      <div v-for="skill in userStore.selectedClass.baseStats.skills" :key="skill.name">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ skill.name }}</h2>

        <!-- Progress bar -->
        <progress class="progress w-56" :value="skill.progress" max="100"></progress>

        <div>Cooldown: {{ skill.cooldown / 1000 }}s</div>
        <div v-if="skill.type === 'damage'">
          Damage: {{ skill.minDamage }} - {{ skill.maxDamage }}
        </div>
      </div>
    </section>
  </section>

</template>
