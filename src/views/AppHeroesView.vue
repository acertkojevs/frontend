<script setup lang="ts">
import { useUserStore } from '@/stores/User.ts'

const userStore = useUserStore()

function selectClass(classIndex: number) {
  userStore.userData.selectedClass = classIndex;
  console.log(`Selected class: ${userStore.userData.classes[classIndex]}`);
}
</script>

<template>
  <section class="flex items-center justify-between">
    <h1 class="text-3xl font-bold  p-4">
      Heroes Page
    </h1>
    <div v-for="(hero, index) in userStore.userData?.classes" :key="index" class="flex flex-col items-center">
      {{ index }}. {{ hero.name }}
      <button @click="selectClass(index)" class="bg-blue-500 text-white px-4 py-2 rounded">
        Select {{ hero.name }}
      </button>
    </div>
  </section>
</template>
