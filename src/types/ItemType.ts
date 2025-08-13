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
  sword001: { id: 'sword001', icon: '/icons/sword.png' }
};

export default items;
