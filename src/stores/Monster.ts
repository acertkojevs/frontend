import { defineStore } from 'pinia'
import monstersData from '../../data/monsters'
import type { GameMonster } from '@/types/MonsterType'
import { useUserStore } from './User'
import type { DamageSkill } from '@/types/SkillType'

export const useMonsterStore = defineStore('monster', () => {
  const userStore = useUserStore()
  const userData = useUserStore().userData

  async function monsterVitalityRestore() {
    if (!userData.inBattle) {
      console.log('Not in battle, monster vitality restore skipped.')
      return
    }

    if (userData.selectedMonster) {
      if (
        userData.selectedMonster.baseStats.health +
          userData.selectedMonster.baseStats.healthRegen >=
        userData.selectedMonster.baseStats.maxHealth
      ) {
        userData.selectedMonster.baseStats.health = userData.selectedMonster.baseStats.maxHealth
      } else {
        userData.selectedMonster.baseStats.health += userData.selectedMonster.baseStats.healthRegen
      }
      console.log('Monster Vitality restored to', userData.selectedMonster.baseStats.health)

      setTimeout(monsterVitalityRestore, userData.selectedMonster.baseStats.healthRegenInterval)
    }
  }

  async function monsterSkills() {
    if (!userData.selectedMonster?.skills) return
    for (const skill of userData.selectedMonster.skills) {
      if (skill.enabled && skill.type === 'damage') {
        skill.progress = 0 // start at 0
        const cooldown = skill.cooldown
        const intervalTime = 10 // update every 10ms
        let elapsed = 0

        function tick() {
          if (!userData.inBattle) {
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

  async function castDamageSkill(skill: DamageSkill) {
    if (
      !userData.inBattle ||
      !userData.selectedMonster ||
      userData.selectedMonster.baseStats.health <= 0
    )
      return

    console.log(`Damage skill casted: ${skill.name}`)

    if (userStore.selectedClass && userStore.selectedMonster) {
      const dmg = userStore.getRandomInt(skill.minDamage, skill.maxDamage)
      userStore.selectedClass.baseStats.health -= dmg

      if (userStore.selectedClass.baseStats.health < 0) {
        //fallback to 0 if health goes below 0
        userStore.selectedClass.baseStats.health = 0
      }

      console.log(
        `Monster: ${skill.name} hit for ${dmg}, hero HP: ${userStore.selectedClass.baseStats.health}`,
      )

      if (userStore.selectedClass.baseStats.health === 0) {
        userStore.loseBattleFinishedModal(userStore.selectedMonster)
        userData.inBattle = false
        return
      }
    }

    setTimeout(() => castDamageSkill(skill), skill.cooldown)
  }

  function setMonster(monster: GameMonster) {
    userData.selectedMonster = monster
  }

  function getFreshMonster(monsterId: number): GameMonster {
    console.log(monstersData[monsterId])
    return monstersData[monsterId]
  }

  function addMonster(monsterId: number) {
    console.log('Adding monster with ID:', monsterId)
    setMonster(getFreshMonster(monsterId))
  }

  function clearMonster() {
    userData.selectedMonster = null
  }

  return { monsterVitalityRestore, addMonster, setMonster, clearMonster, monsterSkills }
})
