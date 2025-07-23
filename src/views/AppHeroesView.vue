<script setup lang="ts">
import { useUserStore } from '@/stores/User.ts'

const userStore = useUserStore()
const selectedclass = userStore.userData.classes[userStore.userData.selectedClass];

function selectClass(classIndex: number) {
  userStore.userData.selectedClass = classIndex;
  console.log(`Selected class: ${userStore.userData.classes[classIndex]}`);
}
</script>

<template>
  <section class="flex flex-row items-center justify-between">
    <div v-for="(hero, index) in userStore.userData?.classes" :key="index" class="flex flex-col items-center">

      <div>{{ index }}. {{ hero.name }}</div>
      <div>{{ hero }}</div>
      <div>Level: {{ hero.baseStats.level }}/{{ hero.baseStats.maxLevel }}</div>
      <button @click="selectClass(index)" class="bg-blue-500 text-white px-4 py-2 rounded">
        Select {{ hero.name }}
      </button>
      <button class="bg-blue-500 text-white px-4 py-2 rounded">
        View {{ hero.name }}
      </button>

    </div>
    <div v-show="userStore.userData.selectedClass !== -1" class="flex flex-col items-center">
      <div>{{ selectedclass.name }}</div>
      <div>Level: {{ selectedclass.baseStats.xp }}/{{ selectedclass.baseStats.xpToNextLevel }}</div>
      <div>Level: {{ selectedclass.baseStats.level }}/{{ selectedclass.baseStats.maxLevel }}</div>
      <div>{{ selectedclass.baseStats.unspentSkillPoints }}</div>
      <div>HP: {{ selectedclass.baseStats.maxHealth }}</div>
      <div>HP regen/sec {{ selectedclass.baseStats.healthRegen }} / {{ selectedclass.baseStats.healthRegenInterval }}
      </div>
      <div>Stamin: {{ selectedclass.baseStats.maxStamina }}</div>
      <div>Stamin regen/sec {{ selectedclass.baseStats.staminaRecover }} / {{
        selectedclass.baseStats.staminaRecoverInterval }}
      </div>
      <div>Stats:</div>
      <div>vitality: {{ selectedclass.baseStats.vitality }}</div>
      <div>endurance: {{ selectedclass.baseStats.endurance }}</div>
      <div>power: {{ selectedclass.baseStats.power }}</div>
      <div>dodge: {{ selectedclass.baseStats.dodge }}</div>
      <div>resilience: {{ selectedclass.baseStats.resilience }}</div>
      <div>luck: {{ selectedclass.baseStats.luck }}</div>
    </div>
  </section>
</template>
