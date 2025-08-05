import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ClassData, ClassAttributes } from '@/types/UserType';

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

        ]
      }
    }
  ],

});


export const useUserStore = defineStore('user', () => {

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

  watch(userData,(newValue) => {
    localStorage.setItem('data', JSON.stringify(newValue));
  }, { deep: true })

  return {userData, loadUser, gainXP, levelUpStat}
})
