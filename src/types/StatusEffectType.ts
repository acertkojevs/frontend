export type StatusEffectType = 'burning' | 'poison' | 'stunned' | 'frozen' | 'weakened'
export type StatusTarget = 'player' | 'monster'

export interface StatusEffect {
  type: StatusEffectType
  duration: number // total duration in ms
  tickInterval?: number // optional, for periodic effects like poison
  tickDamage?: number // optional, for periodic damage
  stacks?: number // optional, if effect can stack
  elapsed: number // time elapsed since application in ms
  target: StatusTarget
}
