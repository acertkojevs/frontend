<script setup lang="ts">
import router from '@/router';


function deleteData() {
  localStorage.removeItem("data")
  router.push({ name: 'landing' });
}

</script>

<template>
  <section class="flex items-center justify-between ">

    <button @click="deleteData">
      Delete Data
    </button>
  </section>
</template>
