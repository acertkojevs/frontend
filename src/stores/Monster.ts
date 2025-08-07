import { defineStore } from 'pinia'
import monstersData from '@/../data/monsters.json';
import type { GameMonster } from '@/types/MonsterType';
import { useUserStore } from './User';

export const useMonsterStore = defineStore('monster', () => {
  const userData = useUserStore().userData;
  // const inBattle = userData.inBattle;

  async function monsterVitalityRestore() {
    console.log(userData.inBattle)

    if (!userData.inBattle){
      console.log("Not in battle, monster vitality restore skipped.");
      return;
    }


    if (!userData.selectedMonster) return;
      if (userData.selectedMonster.baseStats.health + userData.selectedMonster.baseStats.healthRegen >= userData.selectedMonster.baseStats.maxHealth) {
        userData.selectedMonster.baseStats.health = userData.selectedMonster.baseStats.maxHealth;
      } else {
        userData.selectedMonster.baseStats.health += userData.selectedMonster.baseStats.healthRegen;
      }
    console.log("Monster Vitality restored to", userData.selectedMonster.baseStats.health);

    setTimeout(monsterVitalityRestore, userData.selectedMonster.baseStats.healthRegenInterval);
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
