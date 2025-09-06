export type Skill = DamageSkill | HealSkill | BuffSkill | DebuffSkill

type BaseSkill = {
  name: string
  cooldown: number
  baseCooldown: number
  enabled: boolean
  progress: number
  requiredLevel: number
}

export type SkillType = 'damage' | 'heal' | 'buff' | 'debuff'

export interface DamageSkill extends BaseSkill {
  type: 'damage'
  minDamage: number
  maxDamage: number
  baseMinDamage: number
  baseMaxDamage: number
}

export interface HealSkill extends BaseSkill {
  type: 'heal'
  effect?: string // e.g., "Regeneration"
  amount: number
  duration?: number // in ms
}

export interface BuffSkill extends BaseSkill {
  type: 'buff'
  effect: string // e.g., "IncreaseStrength"
  duration: number
}

export interface DebuffSkill extends BaseSkill {
  type: 'debuff'
  effect: string // e.g., "Burn" or "WeakenArmor"
  duration: number
}
