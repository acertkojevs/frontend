import { defineStore } from 'pinia'
import type { GameItem } from '@/types/ItemType'
import type { GameMonster } from '@/types/MonsterType'
import { useUserStore } from './User'
import { ref } from 'vue'

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
  const userStore = useUserStore()

  const getItemById = (id: number) => items.find((item) => item.id === id)
  const calculateDrop = (dropChance: number) => Math.random() < dropChance
  const gainedItems = ref<GameItem[]>([])

  function addItemDrops(monster: GameMonster) {
    gainedItems.value = []
    monster.dropTable.forEach((item) => {
      console.log('Processing drop for itemId:', item.itemId, 'with dropChance:', item.dropChance)
      const droppedItem = getItemById(item.itemId)
      if (droppedItem) {
        if (calculateDrop(item.dropChance)) {
          userStore.userData.Items.push(droppedItem)
          gainedItems.value.push(droppedItem)
          console.log('added drop:', item.itemId)
        } else {
          console.log('No drop for itemId:', item.itemId)
        }
      }
    })
  }

  return { getItemById, addItemDrops, gainedItems }
})
