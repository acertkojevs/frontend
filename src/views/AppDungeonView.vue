<script setup lang="ts">
import monsterData from '@/../data/monsters.json'
import { useUserStore } from '@/stores/User';
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const router = useRouter();

function addMonster(monster: number) {
  userStore.setMonster(monsterData[monster]);
  router.push({ name: 'battle' });
}

</script>

<template>
  <section class="flex items-center justify-between">
    <h1 class="text-3xl font-bold  p-4">
      Dungeon Page
    </h1>

    <ul class="space-y-2">
      <li v-for="(monster, index) in monsterData" :key="monster.id" class="border p-2 rounded shadow">
        <h2 class="font-semibold">{{ monster.name }} (Lvl {{ monster.level }})</h2>
        <p>HP: {{ monster.baseStats.health }} / {{ monster.baseStats.maxHealth }}</p>
        <p>Attack: {{ monster.baseStats.minAttack }} - {{ monster.baseStats.maxAttack }}</p>
        <div>
          <span class="font-medium">Drops:</span>
        </div>
        <button class="bg-blue-500 text-white px-4 py-2 rounded mt-2" @click="addMonster(index)">
          Challenge {{ monster.name }}
        </button>
      </li>
    </ul>
  </section>
</template>
