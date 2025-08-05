import type { Skill } from "./SkillType";
import type { GameMonster } from "./MonsterType";

export interface ClassAttributes {
  vitality: number;
  endurance: number;
  power: number;
  dodge: number;
  resilience: number;
  luck: number;
}

interface ClassStats {
  level: number;
  maxLevel: number;
  xp: number;
  xpToNextLevel: number;
  unspentSkillPoints: number;
  health: number;
  maxHealth: number;
  healthRegen: number;
  healthRegenInterval: number;
  stamina: number;
  attributes: ClassAttributes;
  skills?: Skill[];
}

interface GameClass {
  name: string;
  baseStats: ClassStats;
}

export interface ClassData {
  selectedClass: number;
  selectedMonster?: GameMonster | null;
  classes: GameClass[];
  inBattle: boolean;
}
