import { defineStore } from 'pinia'
import monstersData from '@/../data/monsters.json';
import type { GameMonster } from '@/types/MonsterType';
import { useUserStore } from './User';

export const useMonsterStore = defineStore('monster', () => {
  const userData = useUserStore().userData;

  async function monsterVitalityRestore() {
    const interval = setInterval(() => {
        // if (selectedclass.baseStats.health + selectedclass.baseStats.healthRegen >= selectedclass.baseStats.maxHealth && battleOver.value === true) {
        //   selectedclass.baseStats.health = selectedclass.baseStats.maxHealth;
        // }
        // else {
        //   selectedclass.baseStats.health += selectedclass.baseStats.healthRegen;
        // }
        console.log("Test testestsetse");
      }, userData.selectedMonster?.baseStats.healthRegenInterval);
  }

  function setMonster(monster: GameMonster) {
    userData.selectedMonster = monster;
  }

  function getFreshMonster(id: number): GameMonster {
    return JSON.parse(JSON.stringify(monstersData[id]));
  }

  function addMonster(monster: number) {
    setMonster(getFreshMonster(monster));
  }

  function clearMonster() {
    userData.selectedMonster = null;
  }

  return {monsterVitalityRestore,addMonster, setMonster, clearMonster}
})
