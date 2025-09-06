<script setup lang="ts">
import { ref, onMounted } from 'vue';
import monstersData from '../../data/monsters';
import type { GameMonster } from '@/types/MonsterType';
import { useMonsterStore } from '@/stores/Monster';
import { useRouter } from 'vue-router'

const monsterStore = useMonsterStore();
const router = useRouter();
const monsterLocations = ref<Record<string, GameMonster[]>>({});


function setMonsterInStorage(monsterID: number) {
  // monsterStore.addMonster(monsterID); // Use the first monster as a placeholder
  monsterStore.addMonster(monsterID); // Set the first monster as a placeholder
  console.log("Selected Monster ID:", monsterID);
  router.push({ name: 'combat' });
  // console.log("test", monsterID);
}

onMounted(() => {
  // Group monsters by location
  for (const monster of monstersData) {
    const loc = monster.location;
    if (!monsterLocations.value[loc]) {
      monsterLocations.value[loc] = [];
    }
    monsterLocations.value[loc].push(monster);
  }
});
</script>


<template>
  <section class="p-6">
    <div v-for="(monsters, location) in monsterLocations" :key="location" class="mb-6">
      <h2 class="text-2xl font-semibold mb-2">{{ location }}</h2>
      <ul class="pl-4 border-l-2 border-indigo-400 space-y-1">
        <li v-for="monster in monsters" :key="monster.id" class="hover:text-indigo-600 cursor-pointer"
          @click="setMonsterInStorage(monster.id)">
          {{ monster.name }} (Lvl {{ monster.level }}, HP: {{ monster.baseStats.health }})
        </li>
      </ul>
    </div>
  </section>
</template>
