import type { GameMonster } from '@/types/MonsterType';

export const monstersData: GameMonster[] = [
  {
    id: 0,
    name: "Slime",
    level: 1,
    xp: 5,
    location: "Forest",
    baseStats: {
      health: 30,
      maxHealth: 30,
      healthRegenInterval: 1000,
      healthRegen: 1
    },
    skills: [
      {
        name: "Slash",
        type: "damage",
        cooldown: 1000,
        minDamage: 1,
        maxDamage: 3,
        enabled: true,
        baseMinDamage: 1,
        baseMaxDamage: 3,
        baseCooldown: 1000
      }
    ]
  },
  {
    id: 1,
    name: "Knight",
    level: 3,
    xp: 15,
    location: "Castle",
    baseStats: {
      health: 100,
      maxHealth: 100,
      healthRegenInterval: 1000,
      healthRegen: 1
    },
    skills: [
      {
        name: "Smash",
        type: "damage" as const,
        cooldown: 2000,
        minDamage: 10,
        maxDamage: 15,
        enabled: true,
        baseMinDamage: 10,
        baseMaxDamage: 15,
        baseCooldown: 2000
      }
    ]
  },
  {
    id: 2,
    name: "Red Golem",
    level: 5,
    xp: 40,
    location: "Castle",
    baseStats: {
      health: 200,
      maxHealth: 200,
      healthRegenInterval: 2000,
      healthRegen: 1
    },
    skills: [
      {
        name: "Smash",
        type: "damage" as const,
        cooldown: 2000,
        minDamage: 10,
        maxDamage: 15,
        enabled: true,
        baseMinDamage: 10,
        baseMaxDamage: 15,
        baseCooldown: 2000
      }
    ]
  }
];

export default monstersData;
