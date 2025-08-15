import type { Skill } from "./SkillType";
import type { GameMonster } from "./MonsterType";
import type { GameItem, Inventory } from "./ItemType";

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
  attributes: ClassAttributes;
  skills?: Skill[];
  inventory: Inventory;
}

interface GameClass {
  name: string;
  baseStats: ClassStats;
}

export interface ClassData {
  Items: GameItem[];
  selectedClass: number;
  selectedMonster?: GameMonster | null;
  classes: GameClass[];
  inBattle: boolean;
}
