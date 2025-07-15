import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  function loadUser() {
    localStorage.setItem("data", "Tom");
  }

  return { loadUser}
})
