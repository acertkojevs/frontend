import type { Skill } from "./SkillType";
import type { GameMonster } from "./MonsterType";
import type { GameItem, Inventory } from "./ItemType";

export interface ClassAttributes {
  vitality: number;
  endurance: number;
  power: number;
  agility: number;
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
  baseMaxHealth: number;
  healthRegen: number;
  baseHealthRegen: number;
  healthRegenInterval: number;
  attributes: ClassAttributes;
  skills?: Skill[];
  inventory: Inventory;
  dodge: number;
  critChance: number;
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
