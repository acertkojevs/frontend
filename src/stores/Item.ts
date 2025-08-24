import { defineStore } from 'pinia'
import type { GameItem } from '@/types/ItemType'

export const items: GameItem[] = [
  {
    id: 1001,
    icon: 'icons/wooden_sword.png',
    name: 'Wooden Sword',
    type: 'weapon',
    slot: 'weapon',
    damage: 5,
    requirements: { level: 1 },
  },
]

export const useItemStore = defineStore('item', () => {
  // function getItemById(id: number) {
  //   return items.find((item) => item.id === id)
  // }

  const getItemById = (id: number) => items.find((item) => item.id === id)

  return { getItemById }
})
