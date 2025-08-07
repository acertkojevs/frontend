import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ClassData, ClassAttributes } from '@/types/UserType';
import type { DamageSkill } from '@/types/SkillType';
import { useMonsterStore } from './Monster';
import type { GameMonster } from '@/types/MonsterType';

const userData = ref<ClassData>({
  selectedClass: -1,
  selectedMonster: null,
  inBattle: false,
  classes: [
    {
      name: "Mage",
      baseStats: {
        level: 1,
        maxLevel: 100,
        xp: 0,
        xpToNextLevel: 25,
        unspentSkillPoints: 0,
        health: 1,
        maxHealth: 100,
        healthRegen: 1,
        healthRegenInterval: 2000,
        stamina: 100,
        attributes: {
          vitality: 0,
          endurance: 0,
          power: 0,
          dodge: 0,
          resilience: 0,
          luck: 0,
        },
        skills: [

        ]
      }
    },
    {
      name: "Warrior",
      baseStats: {
        level: 1,
        maxLevel: 100,
        xp: 0,
        xpToNextLevel: 25,
        unspentSkillPoints: 0,
        health: 1,
        maxHealth: 100,
        healthRegen: 1,
        healthRegenInterval: 2000,
        stamina: 100,
        attributes: {
          vitality: 0,
          endurance: 0,
          power: 0,
          dodge: 0,
          resilience: 0,
          luck: 0,
        },
        skills: [

        ]
      }
    },
    {
      name: "Rogue",
      baseStats: {
        level: 1,
        maxLevel: 100,
        xp: 0,
        xpToNextLevel: 25,
        unspentSkillPoints: 0,
        health: 1,
        maxHealth: 100,
        healthRegen: 1,
        healthRegenInterval: 2000,
        stamina: 100,
        attributes: {
          vitality: 0,
          endurance: 0,
          power: 0,
          dodge: 0,
          resilience: 0,
          luck: 0,
        },
        skills: [
          {
            name: "Power Slash",
            type: "damage",
            cooldown: 2000,
            enabled: true,
            minDamage: 10,
            maxDamage: 20
          },
          {
            name: "Fireball",
            type: "damage",
            cooldown: 5000,
            enabled: true,
            minDamage: 15,
            maxDamage: 30
          },
        ]
      }
    }
  ],

});


export const useUserStore = defineStore('user', () => {

  // const selectedclass = userData.classes[userData.selectedClass];
  const selectedClass = computed(() => userData.value.classes[userData.value.selectedClass]);
  const selectedMonster = computed(() => userData.value.selectedMonster);
  // const inBattle = ref(userData.value.inBattle);
  const battleResult = ref('');



  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function saveUser() {
    localStorage.setItem("data", JSON.stringify(userData.value));
  }

  function loadUser() {
    const storedData = localStorage.getItem("data");

    if (storedData) {
      userData.value = JSON.parse(storedData);
    } else {
      saveUser(); // save the default value
    }
  }

  function gainXP(xp: number) {
    const selectedClass = userData.value.classes[userData.value.selectedClass];

    if (selectedClass.baseStats.level <= selectedClass.baseStats.maxLevel) {
      selectedClass.baseStats.xp += xp;
    }

    if (selectedClass.baseStats.xp >= selectedClass.baseStats.xpToNextLevel) { //level up
      const baseXP = 25;
      const exponent = 1.2;
      selectedClass.baseStats.level++;
      selectedClass.baseStats.maxHealth += 10; // Increase max health on level up
      selectedClass.baseStats.health = selectedClass.baseStats.maxHealth; // Restore health on level up
      selectedClass.baseStats.stamina += 2; // Increase max stamina on level up
      selectedClass.baseStats.xp -= selectedClass.baseStats.xpToNextLevel;
      selectedClass.baseStats.xpToNextLevel = Math.floor(baseXP * Math.pow(selectedClass.baseStats.level, exponent)); // Increase the XP needed for the next level
      selectedClass.baseStats.unspentSkillPoints++;
    }
  }

  function levelUpStat(stat: keyof ClassAttributes) {
    const selectedClass = userData.value.classes[userData.value.selectedClass];
    if (selectedClass.baseStats.unspentSkillPoints > 0) {
      selectedClass.baseStats.attributes[stat] += 1;
      selectedClass.baseStats.unspentSkillPoints -= 1;
    }
  }

  async function userVitalityRestore() {
    if (!userData.value.inBattle) return;

    if (selectedClass.value.baseStats.health + selectedClass.value.baseStats.healthRegen >= selectedClass.value.baseStats.maxHealth) {
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth;
    } else {
      selectedClass.value.baseStats.health += selectedClass.value.baseStats.healthRegen;
    }
    console.log("Hero Vitality restored to", selectedClass.value.baseStats.health);

    setTimeout(userVitalityRestore, selectedClass.value.baseStats.healthRegenInterval);
  }

  async function userSkills() {
  if (!selectedClass.value.baseStats.skills) return;

  for (const skill of selectedClass.value.baseStats.skills) {
    if (skill.enabled && skill.type === 'damage') {
      // Start casting *after* cooldown delay for the first hit
      setTimeout(() => castDamageSkill(skill), skill.cooldown);
    }
  }
}

async function castDamageSkill(skill: DamageSkill) {
  if (!userData.value.inBattle || !selectedMonster.value || selectedMonster.value.baseStats.health <= 0) return;

  console.log(`Damage skill casted: ${skill.name}`);

  const dmg = getRandomInt(skill.minDamage, skill.maxDamage);
  selectedMonster.value.baseStats.health -= dmg;

  if (selectedMonster.value.baseStats.health < 0) {
    selectedMonster.value.baseStats.health = 0;
  }

  console.log(`${skill.name} hit for ${dmg}, monster HP: ${selectedMonster.value.baseStats.health}`);

  if (selectedMonster.value.baseStats.health === 0) {
    winBattleFinishedModal(selectedMonster.value);
    userData.value.inBattle = false;
    return;
  }

  setTimeout(() => castDamageSkill(skill), skill.cooldown);
}



  function winBattleFinishedModal(monster: GameMonster) {
    console.log('Show modal for battle end');
    (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal();
    gainXP(monster.xp);
    userData.value.inBattle = false; // Set inBattle to false when the battle is won
  }

  watch(userData,(newValue) => {
    localStorage.setItem('data', JSON.stringify(newValue));
  }, { deep: true })

  return {userData, loadUser, gainXP, levelUpStat, userVitalityRestore,userSkills, selectedClass, selectedMonster, battleResult, saveUser, getRandomInt}
})
