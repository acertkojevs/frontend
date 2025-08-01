import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import monstersData from '@/../data/monsters.json';

//skills data
type SkillType = 'damage' | 'heal' | 'buff' | 'debuff';

type Skill = {
  name: string;
  type: SkillType;
  cooldown: number; // in milliseconds
  staminaCost: number;
  minDamage?: number;
  maxDamage?: number;
  effect?: string;
  duration?: number;
  enabled: boolean;
};

//monster data
export type MonsterStats = {
  health: number;
  maxHealth: number;
};

export type Monster = {
  id: number;
  name: string;
  level: number;
  baseStats: MonsterStats;
  xp: number;
  location: string;
  skills?: Skill[];
};

type classAttributes = {
  vitality: number;
  endurance: number;
  power: number;
  dodge: number;
  resilience: number;
  luck: number;
};

type ClassStats = {
  level: number;
  maxLevel: number;
  xp: number;
  xpToNextLevel: number;
  unspentSkillPoints: number;
  health: number;
  maxHealth: number;
  healthRegen: number;
  healthRegenInterval: number;
  stamina: number;
  maxStamina: number;
  staminaRecover: number;
  staminaRecoverInterval: number;
  attributes: classAttributes;
  skills?: Skill[];
};

type Class = {
  name: string;
  baseStats: ClassStats;
};

type ClassData = {
  selectedClass: number;
  selectedMonster?: Monster | null;
  classes: Class[];
  inBattle: boolean,
};

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
        maxStamina: 100,
        staminaRecover: 20,
        staminaRecoverInterval: 1000,
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
            name: "Slash",
            type: 'damage',
            cooldown: 1000,
            staminaCost: 10,
            minDamage: 1,
            maxDamage: 3,
            enabled: true
          },
          {
            name: "Mace hit",
            type: 'damage',
            cooldown: 3000,
            staminaCost: 10,
            minDamage: 5,
            maxDamage: 15,
            enabled: true
          },
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
        maxStamina: 100,
        staminaRecover: 20,
        staminaRecoverInterval: 1000,
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
            name: "Slash",
            type: 'damage',
            cooldown: 1000,
            staminaCost: 10,
            minDamage: 1,
            maxDamage: 3,
            enabled: true
          },
          {
            name: "Mace hit",
            type: 'damage',
            cooldown: 3000,
            staminaCost: 10,
            minDamage: 5,
            maxDamage: 15,
            enabled: true
          },
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
        maxStamina: 100,
        staminaRecover: 20,
        staminaRecoverInterval: 1000,
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
            name: "Slash",
            type: 'damage',
            cooldown: 1000,
            staminaCost: 10,
            minDamage: 1,
            maxDamage: 3,
            enabled: true
          },
          {
            name: "Mace hit",
            type: 'damage',
            cooldown: 3000,
            staminaCost: 10,
            minDamage: 5,
            maxDamage: 15,
            enabled: true
          },
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


  function setMonster(monster: Monster) {
    userData.value.selectedMonster = monster;
  }

  function getFreshMonster(id: number): Monster {
    return JSON.parse(JSON.stringify(monstersData[id]));
  }

  function addMonster(monster: number) {
    setMonster(getFreshMonster(monster));
  }

  function clearMonster() {
    userData.value.selectedMonster = null;
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

  function levelUpStat(stat: keyof classAttributes) {
    const selectedClass = userData.value.classes[userData.value.selectedClass];
    if (selectedClass.baseStats.unspentSkillPoints > 0) {
      selectedClass.baseStats.attributes[stat] += 1;
      selectedClass.baseStats.unspentSkillPoints -= 1;
    }
  }

  watch(userData,(newValue) => {
    localStorage.setItem('data', JSON.stringify(newValue));
  }, { deep: true })

  return {userData, addMonster, loadUser, setMonster, clearMonster, gainXP, levelUpStat}
})
