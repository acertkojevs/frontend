<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import MonsterSection from '@/components/MonsterBattle.vue';
import { useUserStore } from '@/stores/User';
import { ref } from 'vue';
// import monstersData from '@/../data/monsters.json';
import type { GameMonster } from '@/types/MonsterType';
import { useMonsterStore } from '@/stores/Monster';


const userStore = useUserStore();
const monsterStore = useMonsterStore();

async function startBattle() {
  // const monster = userStore.userData.selectedMonster;
  console.log('Starting battle with class:', userStore.selectedClass);
  console.log('Starting battle with monster:', userStore.selectedMonster);

  userStore.inBattle = true; // Set battle status to true

  userStore.userSkills(); //cast user skills
  userStore.userVitalityRestore(); //restores user vitality calculation
  // monsterStore.monsterVitalityRestore(); //restores monster vitality calculation
}


function rebattle() {
  console.log('Rebattle initiated');
  console.log(userStore.selectedMonster)
  if (typeof userStore.selectedMonster?.id === 'number') {
    monsterStore.addMonster(userStore.selectedMonster.id);
    // userStore.inBattle = false;
    startBattle();
  }
}
</script>

<template>
  <h1 class="text-3xl font-bold p-4">
    Battle Page
  </h1>
  <button @click="startBattle">
    Start Battle
  </button>
  <div class="flex justify-between">
    <HeroSection />
    <MonsterSection />
  </div>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">You won</h3>
      <p class="py-4">You gained {{ userStore.selectedMonster?.xp }} xp!</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="rebattle">Fight Again</button>
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
