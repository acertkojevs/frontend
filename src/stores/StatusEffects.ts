import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/User'
import type { StatusEffect } from '@/types/StatusEffectType'

export const useStatusEffectsStore = defineStore('statuseffects', () => {
  const userStore = useUserStore()

  function applyStatusEffect(effect: StatusEffect) {
    console.log('Applying status effect:', effect)
    effect.elapsed = 0
    if (effect.target === 'monster') {
      // const target = effect.target
      userStore.selectedMonster?.baseStats.statusEffects.push(effect)
      console.log(`Applying status effect: ${effect.duration} for ${effect.duration}ms`)
      runStatusEffect(effect)
    } else if (effect.target === 'player') {
      // const target = effect.target
      userStore.userData.selectedClass?.baseStats.statusEffects.push(effect)
      console.log(`Applying status effect: ${effect.duration} for ${effect.duration}ms`)
      runStatusEffect(effect)
    }
  }

  function runStatusEffect(effect: StatusEffect) {
    if (effect.type === 'poison') {
      poison(effect)
    }
    if (effect.type === 'burning') {
      burning(effect)
    }
  }

  function poison(effect: StatusEffect) {
    const targetType = effect.target

    const stats =
      targetType === 'monster'
        ? userStore.selectedMonster!.baseStats
        : userStore.userData.selectedClass!.baseStats

    function tick() {
      if (!userStore.userData.inBattle) return

      effect.elapsed += effect.tickInterval ?? 1000

      // Apply damage
      if (effect.tickDamage) {
        stats.health -= effect.tickDamage
        if (stats.health < 0) stats.health = 0
      }

      console.log(`${effect.type} tick: ${effect.tickDamage} damage, target HP: ${stats.health}`)

      // Continue or expire
      if (effect.elapsed < effect.duration && stats.health > 0) {
        setTimeout(tick, effect.tickInterval ?? 1000)
      } else {
        stats.statusEffects = stats.statusEffects.filter((e) => e !== effect)
        console.log(`${effect.type} expired on ${targetType}`)
      }
    }

    tick()
  }

  function burning(effect: StatusEffect) {
    const targetStats =
      effect.target === 'monster'
        ? userStore.selectedMonster!.baseStats
        : userStore.userData.selectedClass!.baseStats

    // Reset tickDamage at the start of effect
    effect.tickDamage = effect.baseTickDamage
    effect.elapsed = 0

    function tick() {
      if (!userStore.userData.inBattle) return

      effect.elapsed += effect.tickInterval ?? 1000

      if (effect.tickDamage && effect.tickDamage > 0) {
        targetStats.health -= effect.tickDamage
        if (targetStats.health < 0) targetStats.health = 0

        console.log(
          `${effect.type} tick: ${effect.tickDamage} damage, target HP: ${targetStats.health}`,
        )

        effect.tickDamage-- // decrease damage for next tick
      }

      // Continue or remove
      if (effect.elapsed < effect.duration && targetStats.health > 0 && effect.tickDamage! > 0) {
        setTimeout(tick, effect.tickInterval ?? 1000)
      } else {
        targetStats.statusEffects = targetStats.statusEffects.filter((e) => e !== effect)
        console.log(`${effect.type} expired on ${effect.target}`)
      }
    }

    tick()
  }

  return { applyStatusEffect }
})
