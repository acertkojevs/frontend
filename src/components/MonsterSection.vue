<script setup lang="ts">
import { ref, onMounted } from 'vue';
import monstersData from '@/../data/monsters.json';
import type { Monster } from '@/stores/User';
import { useUserStore } from '@/stores/User';
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const router = useRouter();

const monsterLocations = ref<Record<string, Monster[]>>({});

function addMonster(monster: number) {
  userStore.setMonster(monstersData[monster]);
  router.push({ name: 'battle' });
}

onMounted(() => {
  // Group monsters by location
  for (const monster of monstersData as Monster[]) {
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
          @click="addMonster(monster.id)">
          {{ monster.name }} (Lvl {{ monster.level }}, HP: {{ monster.baseStats.health }})
        </li>
      </ul>
    </div>
  </section>
</template>
