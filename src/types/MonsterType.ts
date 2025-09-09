import type { Skill } from './SkillType' // Ensure Skill is imported from the correct path
import type { StatusEffect } from './StatusEffectType'

interface MonsterStats {
  health: number
  maxHealth: number
  healthRegenInterval: number
  healthRegen: number
  statusEffects: StatusEffect[]
}

export interface Drop {
  itemId: number
  dropChance: number // e.g. 0.25 for 25% chance
}

export interface GameMonster {
  id: number
  name: string
  level: number
  baseStats: MonsterStats
  xp: number
  location: string
  skills?: Skill[] // Make sure Skill is imported or defined
  dropTable: Drop[]
}
