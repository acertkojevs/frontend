<script setup lang="ts">
import HeroAmorSection from '@/components/HeroAmorSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import InvetorySection from '@/components/InvetorySection.vue';
</script>

<template>
  <div class="flex justify-between">
    <InvetorySection class="flex-none" />
    <HeroAmorSection class="flex-none" />
    <HeroSection />
  </div>
</template>
