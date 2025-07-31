<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue';
import MonsterSection from '@/components/MonsterBattle.vue';
import { useUserStore, type Monster } from '@/stores/User';
import { ref } from 'vue';
import monstersData from '@/../data/monsters.json';
import { computed } from 'vue';

const userStore = useUserStore();
const selectedclass = userStore.userData.classes[userStore.userData.selectedClass];
const monster = computed(() => userStore.userData.selectedMonster);
const battleOver = ref(userStore.userData.inBattle);

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function winBattleFinishedModal(monster: Monster) {
  console.log('Show modal for battle start');
  (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
  selectedclass.baseStats.xp += monster.xp;
}

async function startBattle() {
  // const monster = userStore.userData.selectedMonster;
  console.log('Starting battle with class:', selectedclass);
  console.log('Starting battle with monster:', monster);

  userSkills(); //cast user skills
  userStaminaRestore(); //restores user stamina calculation
  userVitalityRestore(); //restores user vitality calculation
}

async function userSkills() {
  selectedclass.baseStats.skills?.forEach(skill => {
    if (skill.enabled) {
      castSpell(skill);
    }
  });
}

async function castSpell(skill: any) {

  const interval = setInterval(() => {
    if (battleOver.value) {
      clearInterval(interval);
      return;
    }

    if (!monster) {
      clearInterval(interval);
      battleOver.value = true;
      return;
    }

    if (selectedclass.baseStats.health <= 0) {
      clearInterval(interval);
      battleOver.value = true;
      return;
    }

    if (monster.value && monster.value.baseStats.health <= 0) {
      clearInterval(interval);
      if (!battleOver.value) {

        // console.log(`Gained ${monster.xp} XP from defeating ${monster.name}`);
        winBattleFinishedModal(monster.value);
      }
      battleOver.value = true;
      return;
    }

    // Check stamina
    if (selectedclass.baseStats.stamina > skill.staminaCost) {
      selectedclass.baseStats.stamina -= skill.staminaCost;
    }
    else {
      console.log('Not enough stamina for skill:', skill.name);
      return;
    }

    const dmg = getRandomInt(skill.minDamage, skill.maxDamage);
    if (monster.value) {
      monster.value.baseStats.health -= dmg;

    }

    if (monster.value)
      console.log(`${skill.name} hit for ${dmg}, monster HP: ${monster?.value.baseStats.health}`);
  }, skill.cooldown);
}

async function userStaminaRestore() {
  const interval = setInterval(() => {
    if ((selectedclass.baseStats.stamina + selectedclass.baseStats.staminaRecover) >= selectedclass.baseStats.maxStamina && battleOver.value === true) {
      selectedclass.baseStats.stamina = selectedclass.baseStats.maxStamina;

    }
    else {
      selectedclass.baseStats.stamina += selectedclass.baseStats.staminaRecover;
    }
  }, selectedclass.baseStats.staminaRecoverInterval);
}

async function userVitalityRestore() {
  const interval = setInterval(() => {
    if (selectedclass.baseStats.health + selectedclass.baseStats.healthRegen >= selectedclass.baseStats.maxHealth && battleOver.value === true) {
      selectedclass.baseStats.health = selectedclass.baseStats.maxHealth;
    }
    else {
      selectedclass.baseStats.health += selectedclass.baseStats.healthRegen;
    }
  }, selectedclass.baseStats.healthRegenInterval);
}

function rebattle() {
  console.log(monstersData)
  console.log('Rebattle initiated');
  console.log(monster)
  userStore.addMonster(0);
  battleOver.value = false;
  startBattle();
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
      <p class="py-4">You gained {{ monster?.xp }} xp!</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="rebattle">Fight Again</button>
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
