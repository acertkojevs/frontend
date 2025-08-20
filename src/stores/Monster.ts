import { defineStore } from 'pinia'
import monstersData from '../../data/monsters';
import type { GameMonster } from '@/types/MonsterType';
import { useUserStore } from './User';
import type { DamageSkill } from '@/types/SkillType';

export const useMonsterStore = defineStore('monster', () => {
  const userStore = useUserStore();
  const userData = useUserStore().userData;


  async function monsterVitalityRestore() {

    if (!userData.inBattle){
      console.log("Not in battle, monster vitality restore skipped.");
      return;
    }

    if(userData.selectedMonster){
      if (userData.selectedMonster.baseStats.health + userData.selectedMonster.baseStats.healthRegen >= userData.selectedMonster.baseStats.maxHealth) {
        userData.selectedMonster.baseStats.health = userData.selectedMonster.baseStats.maxHealth;
      } else {
          userData.selectedMonster.baseStats.health += userData.selectedMonster.baseStats.healthRegen;
      }
      console.log("Monster Vitality restored to", userData.selectedMonster.baseStats.health);

      setTimeout(monsterVitalityRestore, userData.selectedMonster.baseStats.healthRegenInterval);
    }
  }

  async function monsterSkills() {
    if (!userData.selectedMonster?.skills) return;

    for (const skill of userData.selectedMonster?.skills) {
      if (skill.enabled && skill.type === 'damage') {
        // Start casting *after* cooldown delay for the first hit
        setTimeout(() => castDamageSkill(skill), skill.cooldown);
      }
    }
  }

  async function castDamageSkill(skill: DamageSkill) {
    if (!userData.inBattle || !userData.selectedMonster || userData.selectedMonster.baseStats.health <= 0) return;

    console.log(`Damage skill casted: ${skill.name}`);

    if(userStore.selectedClass && userStore.selectedMonster)
    {
      const dmg = userStore.getRandomInt(skill.minDamage, skill.maxDamage);
      userStore.selectedClass.baseStats.health -= dmg;

      if ( userStore.selectedClass.baseStats.health < 0) { //fallback to 0 if health goes below 0
        userStore.selectedClass.baseStats.health = 0;
      }

      console.log(`Monster: ${skill.name} hit for ${dmg}, hero HP: ${ userStore.selectedClass.baseStats.health}`);

      if (userStore.selectedClass.baseStats.health === 0) {
        userStore.loseBattleFinishedModal(userStore.selectedMonster);
        userData.inBattle = false;
        return;
      }
    }

    setTimeout(() => castDamageSkill(skill), skill.cooldown);
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

  return {monsterVitalityRestore,addMonster, setMonster, clearMonster, monsterSkills}
})
