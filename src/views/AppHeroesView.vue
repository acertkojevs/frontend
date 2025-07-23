<script setup lang="ts">
import { useUserStore } from '@/stores/User.ts'
import { computed } from 'vue';
import HeroSection from '@/components/HeroSection.vue';

const userStore = useUserStore()
const selectedclass = computed(() => {
  const index = userStore.userData.selectedClass;
  return index >= 0 ? userStore.userData.classes[index] : null;
});

function selectClass(classIndex: number) {
  userStore.userData.selectedClass = classIndex;
  console.log(`Selected class: ${userStore.userData.classes[classIndex]}`);
}
</script>

<template>
  <section class="flex flex-row items-center justify-between">
    <div v-for="(hero, index) in userStore.userData?.classes" :key="index" class="flex flex-col items-center">
      <div>{{ index }}. {{ hero.name }}</div>
      <div>Level: {{ hero.baseStats.level }}/{{ hero.baseStats.maxLevel }}</div>
      <button @click="selectClass(index)" class="bg-blue-500 text-white px-4 py-2 rounded">
        Select {{ hero.name }}
      </button>

    </div>
    <HeroSection />
  </section>
</template>
