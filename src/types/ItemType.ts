export type SlotName =
  | "helmet"
  | "chest"
  | "gloves"
  | "boots"
  | "weapon"
  | "ring"
  | "amulet"
  | "cape"
  | "offhand"
  | "legs"
  | "trinket";

export type Inventory = Record<SlotName, string | null>;

export type EquipmentSlot =
  | "helmet"
  | "chest"
  | "gloves"
  | "boots"
  | "weapon"
  | "ring"
  | "amulet"
  | "cape"
  | "offhand"
  | "legs"
  | "trinket";

export interface BaseItem {
  id: number;
  icon: string;
  name: string;
  type: ItemCategory;
  slot?: EquipmentSlot;
}

export type ItemCategory =
  | "armor"
  | "weapon"
  | "consumable"
  | "misc";

export interface ArmorItem extends BaseItem {
  type: "armor";
  slot: Exclude<EquipmentSlot, "weapon">;
  requirements?: {
    level?: number;
  };
}

export interface WeaponItem extends BaseItem {
  type: "weapon";
  slot: "weapon" | "offhand";
  damage: number;
  requirements?: {
    level?: number;
  };
}

export interface ConsumableItem extends BaseItem {
  type: "consumable";
  effect: string;
}

export interface MiscItem extends BaseItem {
  type: "misc";
}

export type GameItem =
  | ArmorItem
  | WeaponItem
  | ConsumableItem
  | MiscItem;


export const items: GameItem [] = [
  {
    id: 1001,
    icon: "icons/wooden_sword.png",
    name: "Wooden Sword",
    type: "weapon",
    slot: "weapon",
    damage: 5,
    requirements: { level: 1 }
  },
]
