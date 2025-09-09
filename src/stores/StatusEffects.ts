import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/User'
import type { StatusEffect } from '@/types/StatusEffectType'

export const useStatusEffectsStore = defineStore('statuseffects', () => {
  const userStore = useUserStore()

  function applyStatusEffect(effect: StatusEffect) {
    console.log('Applying status effect:', effect)
    effect.elapsed = 0
    if (effect.target === 'monster') {
      userStore.selectedMonster?.baseStats.statusEffects.push(effect)
      console.log(`Applying status effect: ${effect.duration} for ${effect.duration}ms`)
      const target = effect.target
      runStatusEffect(effect, target)
    }
  }

  function runStatusEffect(effect: StatusEffect, targetType: 'player' | 'monster') {
    // Pick the correct target object
    const target =
      targetType === 'player'
        ? userStore.userData.selectedClass
        : userStore.userData.selectedMonster

    if (!target) return // no valid target

    if (effect.type === 'poison') {
      function tick() {
        if (!userStore.userData.inBattle) return

        effect.elapsed += effect.tickInterval ?? 1000

        // Apply damage
        if (effect.tickDamage) {
          userStore.selectedMonster!.baseStats.health -= effect.tickDamage
          if (userStore.selectedMonster!.baseStats.health < 0) {
            userStore.selectedMonster!.baseStats.health = 0
          }
        }

        // Stop if expired
        if (effect.elapsed < effect.duration && userStore.selectedMonster!.baseStats.health > 0) {
          setTimeout(tick, effect.tickInterval ?? 1000)
        } else {
          // Remove effect
          userStore.selectedMonster!.baseStats.statusEffects =
            userStore.selectedMonster!.baseStats.statusEffects.filter((e) => e !== effect)
        }
      }

      tick()
    }
  }

  return { applyStatusEffect }
})
