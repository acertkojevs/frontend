import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

type ClassStats = {
  health: number;
  maxHealth: number;
  healthRegen: number;
  healthRegenInterval: number;
  minAttack: number;
  maxAttack: number;
  stamina: number;
  maxStamina: number;
  staminaRecover: number;
  staminaRecoverInterval: number;
};

type Class = {
  name: string;
  baseStats: ClassStats;
};

type ClassData = {
  selectedClass: number;
  classes: Class[];
};

const userData = ref<ClassData>({
  selectedClass: -1,
  classes: [
    {
      name: "Warrior",
      baseStats: {
        health: 100,
        maxHealth: 100,
        healthRegen: 1,
        healthRegenInterval: 2000,
        minAttack: 1,
        maxAttack: 10,
        stamina: 100,
        maxStamina: 100,
        staminaRecover: 5,
        staminaRecoverInterval: 1000
      }
    }
  ]
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

  watch(userData,(newValue) => {
    localStorage.setItem('data', JSON.stringify(newValue));
  }, { deep: true })

  return {userData, loadUser}
})
