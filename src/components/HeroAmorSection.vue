<script setup lang="ts">
import type { SlotName } from '@/types/ItemType';
import { useUserStore } from '@/stores/User';
import items from '../types/ItemType';
import { Icon } from "@iconify/vue";

const userStore = useUserStore();

const slotLayout: (SlotName | null)[] = [
  null, 'helmet', null,
  'cape', 'amulet', 'trinket',
  'weapon', 'chest', 'offhand',
  'gloves', 'legs', 'ring',
  null, 'boots', null
];

const placeholderIcons: Record<SlotName, string> = {
  helmet: "game-icons:horned-helm",
  chest: "game-icons:abdominal-armor",
  gloves: "game-icons:gloves",
  boots: "game-icons:steeltoe-boots",
  weapon: "streamline-sharp:sword-attack",
  ring: "streamline-sharp:ring-solid",
  amulet: "icon-park-twotone:diamond-necklace",
  cape: "game-icons:cape",
  trinket: "hugeicons:gem",
  offhand: "material-symbols:shield-outline-rounded",
  legs: "game-icons:armored-pants",
};

function getSlotIcon(slot: SlotName) {

  if (userStore.selectedClass) {
    const itemId = userStore.selectedClass.baseStats.inventory[slot];
    if (!itemId) {
      return placeholderIcons[slot] ?? "/placeholders/default.png";
    }
    return items[itemId]?.icon ?? placeholderIcons[slot] ?? "/placeholders/default.png";
  }

  // fallback if no selected class
  return placeholderIcons[slot] ?? "/placeholders/default.png";

}

</script>

<template>

  <section class="grid grid-cols-3 gap-4 w-[200px] justify-items-center">
    <div v-for="(slot, i) in slotLayout" :key="i">
      <div v-if="slot" class="bg-gray-700 p-2 shadow">
        <icon :icon="getSlotIcon(slot)" class="w-10 h-10 justify-items-center" :alt="slot" />
      </div>
      <template v-else>
        <!-- Empty placeholder -->
      </template>
    </div>
  </section>
</template>
