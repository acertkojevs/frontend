import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ClassData, ClassAttributes } from '@/types/UserType';
import type { DamageSkill } from '@/types/SkillType';
import type { GameMonster } from '@/types/MonsterType';

export const defaultUserData: ClassData  = {
  Items: [
     {
      id: 1001,
      icon: "icons/wooden_sword.png",
      name: "Wooden Sword",
      type: "weapon", // must match WeaponItem type
      slot: "weapon", // must match WeaponItem slot type
      damage: 5,
      requirements: { level: 1 }
    },
  ],
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
        health: 100,
        maxHealth: 100,
        baseMaxHealth: 100,
        healthRegen: 1,
        baseHealthRegen: 1,
        healthRegenInterval: 2000,
        dodge: 0,
        critChance: 0,
        inventory: {
          helmet: null,
          chest: null,
          gloves: null,
          boots: null,
          weapon: null,
          ring: null,
          amulet: null,
          cape: null,
          offhand: null,
          trinket: null,
          legs: null
        },
        attributes: {
          vitality: 0,
          endurance: 0,
          power: 0,
          agility: 0,
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
        health: 100,
        maxHealth: 100,
        baseMaxHealth: 100,
        healthRegen: 1,
        baseHealthRegen: 1,
        healthRegenInterval: 2000,
        dodge: 0,
        critChance: 0,
        inventory: {
          helmet: null,
          chest: null,
          gloves: null,
          boots: null,
          weapon: null,
          ring: null,
          amulet: null,
          cape: null,
          offhand: null,
          trinket: null,
          legs: null
        },
        attributes: {
          vitality: 0,
          endurance: 0,
          power: 0,
          agility: 0,
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
        health: 100,
        maxHealth: 100,
        baseMaxHealth: 100,
        healthRegen: 1,
        baseHealthRegen: 1,
        healthRegenInterval: 2000,
        dodge: 0,
        critChance: 0,
        inventory: {
          helmet: null,
          chest: null,
          gloves: null,
          boots: null,
          weapon: null,
          ring: null,
          amulet: null,
          cape: null,
          offhand: null,
          trinket: null,
          legs: null
        },
        attributes: {
          vitality: 0,
          endurance: 0,
          power: 0,
          agility: 0,
          resilience: 0,
          luck: 0,
        },
        skills: [
          {
            name: "Power Slash",
            type: "damage",
            cooldown: 2000,
            baseCooldown: 2000,
            enabled: true,
            minDamage: 10,
            maxDamage: 20,
            baseMinDamage: 10,
            baseMaxDamage: 20
          },
          {
            name: "Fireball",
            type: "damage",
            cooldown: 5000,
            baseCooldown: 5000,
            enabled: true,
            minDamage: 15,
            maxDamage: 30,
            baseMinDamage: 15,
            baseMaxDamage: 30
          },
        ]
      }
    }
  ],
};
const userData = ref<ClassData>({ ...defaultUserData });

export const useUserStore = defineStore('user', () => {

  // const selectedclass = userData.classes[userData.selectedClass];
  const selectedClass = computed(() => {
    const index = userData.value.selectedClass;
    return index >= 0 ? userData.value.classes[index] : null;
  });
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
    // const selectedClass = userData.value.classes[userData.value.selectedClass];

    if (selectedClass.value && selectedClass.value.baseStats.level <= selectedClass.value.baseStats.maxLevel) {
      selectedClass.value.baseStats.xp += xp;
    }

    if (selectedClass.value && selectedClass.value.baseStats.xp >= selectedClass.value.baseStats.xpToNextLevel) { //level up
      const baseXP = 25;
      const exponent = 1.2;
      selectedClass.value.baseStats.level++;
      selectedClass.value.baseStats.maxHealth += 10; // Increase max health on level up
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth; // Restore health on level up
      selectedClass.value.baseStats.xp -= selectedClass.value.baseStats.xpToNextLevel;
      selectedClass.value.baseStats.xpToNextLevel = Math.floor(baseXP * Math.pow(selectedClass.value.baseStats.level, exponent)); // Increase the XP needed for the next level
      selectedClass.value.baseStats.unspentSkillPoints++;
    }
  }

  function levelUpStat(stat: keyof ClassAttributes) {
    if (selectedClass.value && selectedClass.value.baseStats.unspentSkillPoints > 0) {
      selectedClass.value.baseStats.attributes[stat] += 1;
      selectedClass.value.baseStats.unspentSkillPoints -= 1;
      recalculateStats();
    }
  }

  function recalculateStats() {
    const stats = selectedClass.value?.baseStats;
    const attrs = selectedClass.value?.baseStats.attributes;


    if (attrs && stats)
    {
        // Vitality → HP
      stats.maxHealth = stats.baseMaxHealth + attrs.vitality * 15;
      stats.healthRegen = stats.baseHealthRegen + Math.floor(attrs.vitality / 2); // Regen based on vitality

      // endurance → cooldown reduction
      if(selectedClass.value.baseStats.skills) {
        for (const skill of selectedClass.value.baseStats.skills ) {
          skill.cooldown = skill.baseCooldown * (1 - selectedClass.value.baseStats.attributes.endurance * 0.005);

          // power → damage
          if(skill.type === 'damage') {
            skill.minDamage = skill.baseMinDamage + Math.floor(attrs.power * 1);
            skill.maxDamage = skill.baseMaxDamage + Math.floor(attrs.power * 1);
          }
        }
      }

      // Agility → dodge chance
      stats.dodge = attrs.agility * 0.2; // % chance to dodge

      // critChance → critical hit chance
      stats.critChance = attrs.luck * 0.5; // % chance to

      // // resilience (need to implement)
    }

  }

  async function userVitalityRestore() {
    if (!selectedClass.value || !userData.value.inBattle) return;

    if (selectedClass.value.baseStats.health + selectedClass.value.baseStats.healthRegen >= selectedClass.value.baseStats.maxHealth) {
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth;
    } else {
      selectedClass.value.baseStats.health += selectedClass.value.baseStats.healthRegen;
    }
    console.log("Hero Vitality restored to", selectedClass.value.baseStats.health);

    setTimeout(userVitalityRestore, selectedClass.value.baseStats.healthRegenInterval);
  }

  async function userSkills() {
    if (!selectedClass.value || !selectedClass.value.baseStats.skills) return;

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
    (document.getElementById("battleVictory") as HTMLDialogElement)?.showModal();
    gainXP(monster.xp);
    if (selectedClass.value) {
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth;    // Reset hero health
    }
    userData.value.inBattle = false; // Set inBattle to false when the battle is won
  }

  function loseBattleFinishedModal(monster: GameMonster) {
    console.log('Show modal for battle end');
    (document.getElementById("battleDefeat") as HTMLDialogElement)?.showModal();
    // gainXP(monster.xp);
    if (selectedClass.value) {
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth;    // Reset hero health
    }
    userData.value.inBattle = false; // Set inBattle to false when the battle is won
  }

  watch(userData, (newValue) => {
      localStorage.setItem('data', JSON.stringify(newValue));
  }, { deep: true });

  return {userData, loadUser, gainXP, levelUpStat, userVitalityRestore,userSkills, selectedClass, selectedMonster, battleResult, saveUser, getRandomInt, loseBattleFinishedModal}
})
