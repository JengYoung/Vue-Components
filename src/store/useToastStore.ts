import { ToastInterface } from '@/components/Base/Toast/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ToastItemInterface extends ToastInterface {
  timerId: number | NodeJS.Timeout;
}

// stores/counter.js
export const useToastStore = defineStore('store:toast', () => {
  const items = ref<ToastItemInterface[]>([]);

  const removeToast = (toast: ToastInterface) => {
    items.value = items.value.filter((item) => {
      if (item.id === toast.id) {
        clearTimeout(item.timerId);
      }
      return item.id !== toast.id;
    });
  };

  const addToast = (toast: ToastInterface) => {
    const timerId = setTimeout(() => {
      items.value = items.value.filter((item) => item.id !== toast.id);
    }, toast.showTime * 1000);

    items.value = items.value.concat({ ...toast, timerId });
  };

  return { items, addToast, removeToast };
});
