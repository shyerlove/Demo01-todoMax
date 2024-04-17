import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWinStore = defineStore('windowState', () => {
  let more_isopen = ref(false);
  let sort_isopen = ref(false);

  function change_More_isopen() {
    more_isopen.value = !more_isopen.value;
  }
  function change_Sort_isopen() {
    sort_isopen.value = !sort_isopen.value;
  }

  return { more_isopen, sort_isopen, change_More_isopen, change_Sort_isopen }
})
