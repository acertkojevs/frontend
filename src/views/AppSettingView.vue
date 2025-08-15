<script setup lang="ts">
import router from '@/router';
import { defaultUserData } from "@/stores/User";

function deleteData() {
  // localStorage.removeItem("data");
  localStorage.setItem("data", JSON.stringify(defaultUserData));
  router.push({ name: "landing" });
}

</script>

<template>
  <section class="flex items-center justify-between ">
    <button class="btn" onclick="my_modal_1.showModal()">open modal</button>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Cancel</button>
            <button class="btn" @click="deleteData">Delete Data</button>
          </form>
        </div>
      </div>
    </dialog>
  </section>
</template>
