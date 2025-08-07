import type { Skill } from './SkillType'; // Ensure Skill is imported from the correct path

interface MonsterStats {
  health: number;
  maxHealth: number;
  healthRegenInterval: number;
  healthRegen: number;
}

export interface GameMonster {
  id: number;
  name: string;
  level: number;
  baseStats: MonsterStats;
  xp: number;
  location: string;
  skills?: Skill[]; // Make sure Skill is imported or defined
}
