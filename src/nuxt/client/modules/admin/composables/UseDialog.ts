import { ref } from 'vue'

export const useDialog = () => {
  const dialog = ref(false)

  const openDialog = () => {
    dialog.value = true
  }

  const closeDialog = () => {
    dialog.value = false
  }
  return {
    dialog,
    openDialog,
    closeDialog,
  }
}
