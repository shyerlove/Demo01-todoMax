import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWinStore = defineStore('windowState', () => {
  let more_isopen = ref(false);
  let sort_isopen = ref(false);
  let grid_isopen = ref(false);
  let Dels_isopen = ref(false);

  function change_More_isopen() {
    more_isopen.value = !more_isopen.value;
  }
  function change_Sort_isopen() {
    sort_isopen.value = !sort_isopen.value;
  }
  function change_Grid_isopen() {
    grid_isopen.value = !grid_isopen.value;
  }
  function change_Dels_isopen() {
    Dels_isopen.value = !Dels_isopen.value;
  }

  return {
    more_isopen, sort_isopen, grid_isopen, Dels_isopen,
    change_More_isopen, change_Sort_isopen, change_Grid_isopen, change_Dels_isopen
  }
})
