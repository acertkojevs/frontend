import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ClassData, ClassAttributes } from '@/types/UserType'
import type { DamageSkill } from '@/types/SkillType'
import type { GameMonster } from '@/types/MonsterType'
// import type { StatusEffect } from '@/types/StatusEffectType'
import { useItemStore } from '../stores/Item'
import { useStatusEffectsStore } from './StatusEffects'

export const defaultUserData: ClassData = {
  Items: [
    {
      id: 1001,
      icon: 'icons/wooden_sword.png',
      name: 'Wooden Sword',
      type: 'weapon', // must match WeaponItem type
      slot: 'weapon', // must match WeaponItem slot type
      damage: 5,
      requirements: { level: 1 },
    },
  ],
  selectedClass: null,
  selectedMonster: null,
  inBattle: false,
  classes: [
    {
      name: 'Mage',
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
        statusEffects: [],
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
          legs: null,
        },
        attributes: {
          vitality: 0,
          endurance: 0,
          power: 0,
          agility: 0,
          resilience: 0,
          luck: 0,
        },
        skills: [],
      },
    },
    {
      name: 'Warrior',
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
        statusEffects: [],
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
          legs: null,
        },
        attributes: {
          vitality: 0,
          endurance: 0,
          power: 0,
          agility: 0,
          resilience: 0,
          luck: 0,
        },
        skills: [],
      },
    },
    {
      name: 'Rogue',
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
        statusEffects: [],
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
          legs: null,
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
            name: 'Shadow Strike',
            type: 'damage',
            cooldown: 3000,
            baseCooldown: 3000,
            enabled: true,
            minDamage: 10,
            maxDamage: 15,
            baseMinDamage: 10,
            baseMaxDamage: 15,
            progress: 0,
            requiredLevel: 1,
          },
          {
            name: 'Poison Blade',
            type: 'damage',
            cooldown: 8000,
            baseCooldown: 8000,
            enabled: false,
            minDamage: 10,
            maxDamage: 15,
            baseMinDamage: 10,
            baseMaxDamage: 15,
            progress: 0,
            requiredLevel: 2,
            debuff: {
              type: 'poison',
              duration: 5000,
              tickInterval: 1000,
              tickDamage: 3,
              target: 'monster',
              elapsed: 0,
            },
          },
          {
            name: 'Fireball',
            type: 'damage',
            cooldown: 4000,
            baseCooldown: 4000,
            enabled: false,
            minDamage: 5,
            maxDamage: 6,
            baseMinDamage: 5,
            baseMaxDamage: 6,
            progress: 0,
            requiredLevel: 2,
            debuff: {
              type: 'burning',
              duration: 4000,
              tickInterval: 1000,
              tickDamage: 5,
              baseTickDamage: 5,
              target: 'monster',
              elapsed: 0,
            },
          },
        ],
      },
    },
  ],
}
const userData = ref<ClassData>({ ...defaultUserData })

export const useUserStore = defineStore('user', () => {
  const itemStore = useItemStore()
  const statusEffectsStore = useStatusEffectsStore()

  // const selectedclass = userData.classes[userData.selectedClass];
  const selectedClass = computed(() => userData.value.selectedClass)
  const selectedMonster = computed(() => userData.value.selectedMonster)
  // const inBattle = ref(userData.value.inBattle);
  const battleResult = ref('')

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function saveUser() {
    localStorage.setItem('data', JSON.stringify(userData.value))
  }

  function loadUser() {
    const storedData = localStorage.getItem('data')

    if (storedData) {
      userData.value = JSON.parse(storedData)
    } else {
      saveUser() // save the default value
    }
  }

  function gainXP(xp: number) {
    // const selectedClass = userData.value.classes[userData.value.selectedClass];

    if (
      selectedClass.value &&
      selectedClass.value.baseStats.level <= selectedClass.value.baseStats.maxLevel
    ) {
      selectedClass.value.baseStats.xp += xp
    }

    if (
      selectedClass.value &&
      selectedClass.value.baseStats.xp >= selectedClass.value.baseStats.xpToNextLevel
    ) {
      //level up
      const baseXP = 25
      const exponent = 1.2
      selectedClass.value.baseStats.level++
      selectedClass.value.baseStats.maxHealth += 10 // Increase max health on level up
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth // Restore health on level up
      selectedClass.value.baseStats.xp -= selectedClass.value.baseStats.xpToNextLevel
      selectedClass.value.baseStats.xpToNextLevel = Math.floor(
        baseXP * Math.pow(selectedClass.value.baseStats.level, exponent),
      ) // Increase the XP needed for the next level
      selectedClass.value.baseStats.unspentSkillPoints++

      // unlock skill if available
      selectedClass.value.baseStats.skills?.forEach((skill) => {
        if (skill.requiredLevel === selectedClass.value?.baseStats.level) {
          skill.enabled = true
          console.log(`Skill unlocked: ${skill.name}`)
        }
      })
    }
  }

  function levelUpStat(stat: keyof ClassAttributes) {
    if (selectedClass.value && selectedClass.value.baseStats.unspentSkillPoints > 0) {
      selectedClass.value.baseStats.attributes[stat] += 1
      selectedClass.value.baseStats.unspentSkillPoints -= 1
      recalculateStats()
    }
  }

  function recalculateStats() {
    const stats = selectedClass.value?.baseStats
    const attrs = selectedClass.value?.baseStats.attributes

    if (attrs && stats) {
      // Vitality → HP
      stats.maxHealth = stats.baseMaxHealth + attrs.vitality * 15
      stats.healthRegen = stats.baseHealthRegen + Math.floor(attrs.vitality / 2) // Regen based on vitality

      // endurance → cooldown reduction
      if (selectedClass.value.baseStats.skills) {
        for (const skill of selectedClass.value.baseStats.skills) {
          skill.cooldown =
            skill.baseCooldown * (1 - selectedClass.value.baseStats.attributes.endurance * 0.005)

          // power → damage
          if (skill.type === 'damage') {
            skill.minDamage = skill.baseMinDamage + Math.floor(attrs.power * 1)
            skill.maxDamage = skill.baseMaxDamage + Math.floor(attrs.power * 1)
          }
        }
      }

      // Agility → dodge chance
      stats.dodge = attrs.agility * 0.2 // % chance to dodge

      // critChance → critical hit chance
      stats.critChance = attrs.luck * 0.5 // % chance to

      // // resilience (need to implement)
    }
  }

  function userVitalityRestore() {
    if (!selectedClass.value || !userData.value.inBattle) return

    if (
      selectedClass.value.baseStats.health + selectedClass.value.baseStats.healthRegen >=
      selectedClass.value.baseStats.maxHealth
    ) {
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth
    } else {
      selectedClass.value.baseStats.health += selectedClass.value.baseStats.healthRegen
    }
    console.log('Hero Vitality restored to', selectedClass.value.baseStats.health)

    setTimeout(userVitalityRestore, selectedClass.value.baseStats.healthRegenInterval)
  }

  function userSkills() {
    if (!selectedClass.value || !selectedClass.value.baseStats.skills) return

    for (const skill of selectedClass.value.baseStats.skills) {
      if (skill.enabled && skill.type === 'damage') {
        skill.progress = 0 // start at 0
        const cooldown = skill.cooldown
        const intervalTime = 20 // update every 50ms
        let elapsed = 0

        function tick() {
          if (!userData.value.inBattle) {
            skill.progress = 0
            return // stop ticking if battle ends
          }

          elapsed += intervalTime
          skill.progress = Math.min((elapsed / cooldown) * 100, 100)

          if (elapsed >= cooldown) {
            castDamageSkill(skill as DamageSkill)
            elapsed = 0 // restart cooldown
            skill.progress = 0 // reset progress visually
          }

          setTimeout(tick, intervalTime)
        }

        tick() // start ticking
      }
    }
  }

  function castDamageSkill(skill: DamageSkill) {
    if (!userData.value.inBattle || !selectedMonster.value) return

    const dmg = getRandomInt(skill.minDamage, skill.maxDamage)
    selectedMonster.value.baseStats.health -= dmg
    if (selectedMonster.value.baseStats.health < 0) {
      selectedMonster.value.baseStats.health = 0
    }

    console.log(
      `${skill.name} hit for ${dmg}, monster HP: ${selectedMonster.value.baseStats.health}`,
    )

    if (skill.debuff) {
      statusEffectsStore.applyStatusEffect(skill.debuff)
    }

    if (selectedMonster.value.baseStats.health === 0) {
      winBattleFinishedModal(selectedMonster.value)
      userData.value.inBattle = false
    }
  }

  function winBattleFinishedModal(monster: GameMonster) {
    console.log('Show modal for battle win')
    ;(document.getElementById('battleVictory') as HTMLDialogElement)?.showModal()
    gainXP(monster.xp)
    itemStore.addItemDrops(monster)
    if (selectedClass.value) {
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth // Reset hero health
    }
    userData.value.inBattle = false // Set inBattle to false when the battle is won
  }

  function loseBattleFinishedModal(monster: GameMonster) {
    console.log('Show modal for battle lose')
    ;(document.getElementById('battleDefeat') as HTMLDialogElement)?.showModal()
    // gainXP(monster.xp);
    if (selectedClass.value) {
      selectedClass.value.baseStats.health = selectedClass.value.baseStats.maxHealth // Reset hero health
    }
    userData.value.inBattle = false // Set inBattle to false when the battle is won
  }

  watch(
    userData,
    (newValue) => {
      localStorage.setItem('data', JSON.stringify(newValue))
    },
    { deep: true },
  )

  return {
    userData,
    loadUser,
    gainXP,
    levelUpStat,
    userVitalityRestore,
    userSkills,
    selectedClass,
    selectedMonster,
    battleResult,
    saveUser,
    getRandomInt,
    loseBattleFinishedModal,
  }
})
