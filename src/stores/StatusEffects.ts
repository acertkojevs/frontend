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

  return { applyStatusEffect }
})
