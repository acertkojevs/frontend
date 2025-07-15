<script setup lang="ts">

function deleteData() {
  localStorage.removeItem("data")
  // console.log('Data deleted')
}

</script>

<template>
  <section class="flex items-center justify-between ">

    <button :onclick="deleteData">
      Delete Data
    </button>
  </section>
</template>
