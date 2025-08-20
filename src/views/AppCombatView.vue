<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import MonsterSection from '@/components/MonsterBattle.vue';
import { useUserStore } from '@/stores/User';
// import { ref } from 'vue';
// import monstersData from '@/../data/monsters.json';
// import type { GameMonster } from '@/types/MonsterType';
import { useMonsterStore } from '@/stores/Monster';


const userStore = useUserStore();
const monsterStore = useMonsterStore();

async function startBattle() {
  // const monster = userStore.userData.selectedMonster;
  console.log('Starting battle with class:', userStore.selectedClass);
  console.log('Starting battle with monster:', userStore.selectedMonster);

  userStore.userData.inBattle = true; // Set battle status to true
  // console.log(userStore.inBattle);
  userStore.userSkills(); //cast user skills
  userStore.userVitalityRestore(); //restores user vitality calculation
  monsterStore.monsterVitalityRestore(); //restores monster vitality calculation
  monsterStore.monsterSkills(); //cast monster skills
}


function rebattle() {
  console.log('Rebattle initiated');
  console.log(userStore.selectedMonster)
  if (typeof userStore.selectedMonster?.id === 'number') {
    monsterStore.addMonster(userStore.selectedMonster.id);
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
  <dialog id="battleVictory" class="modal">
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
  <dialog id="battleDefeat" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Defeat</h3>
      <p class="py-4">You lost</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- <button class="btn" @click="rebattle">Fight Again</button> -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
