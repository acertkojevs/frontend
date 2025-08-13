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

interface Item {
  id: string;
  icon: string;
}

const items: Record<string, Item> = {
  sword001: { id: 'sword001', icon: '/icons/sword.png' },
  sword002: { id: 'sword001', icon: '/icons/sword.png' },
  sword003: { id: 'sword001', icon: '/icons/sword.png' },
  sword004: { id: 'sword001', icon: '/icons/sword.png' },
  sword021: { id: 'sword001', icon: '/icons/sword.png' },
  sword12: { id: 'sword001', icon: '/icons/sword.png' },
  sword0324: { id: 'sword001', icon: '/icons/sword.png' },
  sword0012: { id: 'sword001', icon: '/icons/sword.png' },
  sword02: { id: 'sword001', icon: '/icons/sword.png' },
  sword0312: { id: 'sword001', icon: '/icons/sword.png' },
  sword00231: { id: 'sword001', icon: '/icons/sword.png' },
  sword0023423: { id: 'sword001', icon: '/icons/sword.png' },
  sword034: { id: 'sword001', icon: '/icons/sword.png' },
  sword012: { id: 'sword001', icon: '/icons/sword.png' },
  sword011: { id: 'sword001', icon: '/icons/sword.png' },
  sword0112: { id: 'sword001', icon: '/icons/sword.png' },
};

export default items;
