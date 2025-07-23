<script setup lang="ts">
import { useUserStore } from '@/stores/User';
import { ref } from 'vue';

const userStore = useUserStore();
const selectedclass = userStore.userData.classes[userStore.userData.selectedClass];
const monster = userStore.userData.selectedMonster;
const battleOver = ref(userStore.userData.inBattle);

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function startBattle() {
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

    if (monster.baseStats.health <= 0) {
      clearInterval(interval);
      if (!battleOver.value) {
        selectedclass.baseStats.xp += monster.xp;
        console.log(`Gained ${monster.xp} XP from defeating ${monster.name}`);
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
    if (monster) {
      monster.baseStats.health -= dmg;
    }

    console.log(`${skill.name} hit for ${dmg}, monster HP: ${monster?.baseStats.health}`);
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

</script>



<template>
  <h1 class="text-3xl font-bold p-4">
    Battle Page
  </h1>
  <button @click="startBattle">
    Start Battle
  </button>
  <div>
    {{ selectedclass }}
  </div>
</template>
