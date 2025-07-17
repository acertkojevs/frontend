<script setup lang="ts">

function deleteData() {
  localStorage.removeItem("data")
}

</script>

<template>
  <section class="flex items-center justify-between ">

    <button @click="deleteData">
      Delete Data
    </button>
  </section>
</template>
