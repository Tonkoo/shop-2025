import { ref } from 'vue';
import { api } from '#shared/api/axios.js';

export const useSections = () => {
  const sections = ref([]);

  const fetchSections = async () => {
    try {
      const response = await api.get('/section');
      sections.value = response.data.data;
    } catch (error) {
      console.error('Ошибка при загрузке секций:', error);
    }
  };

  return {
    sections,
    fetchSections,
  };
};
