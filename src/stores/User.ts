import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

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
  minAttack: number;
  maxAttack: number;
};

export type Monster = {
  id: number;
  name: string;
  level: number;
  baseStats: MonsterStats;
  xp: number;
  skills?: Skill[];
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
  vitality: number;
  endurance: number;
  power: number;
  dodge: number;
  resilience: number;
  luck: number;
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
        xpToNextLevel: 100,
        unspentSkillPoints: 0,
        health: 1,
        maxHealth: 100,
        healthRegen: 1,
        healthRegenInterval: 2000,
        stamina: 100,
        maxStamina: 100,
        staminaRecover: 20,
        staminaRecoverInterval: 1000,
        vitality: 0,
        endurance: 0,
        power: 0,
        dodge: 0,
        resilience: 0,
        luck: 0,
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
        xpToNextLevel: 100,
        unspentSkillPoints: 0,
        health: 1,
        maxHealth: 100,
        healthRegen: 1,
        healthRegenInterval: 2000,
        stamina: 100,
        maxStamina: 100,
        staminaRecover: 20,
        staminaRecoverInterval: 1000,
        vitality: 0,
        endurance: 0,
        power: 0,
        dodge: 0,
        resilience: 0,
        luck: 0,
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
        xpToNextLevel: 100,
        unspentSkillPoints: 0,
        health: 1,
        maxHealth: 100,
        healthRegen: 1,
        healthRegenInterval: 2000,
        stamina: 100,
        maxStamina: 100,
        staminaRecover: 20,
        staminaRecoverInterval: 1000,
        vitality: 0,
        endurance: 0,
        power: 0,
        dodge: 0,
        resilience: 0,
        luck: 0,
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

  function clearMonster() {
    userData.value.selectedMonster = null;
  }

  watch(userData,(newValue) => {
    localStorage.setItem('data', JSON.stringify(newValue));
  }, { deep: true })

  return {userData, loadUser, setMonster, clearMonster}
})
