import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  
    const currentTheme = ref('light');
    const themeLink = ref(null);
    
    const isDark = ref(false);
  
  // Инициализация темы из localStorage или системных настроек
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDark.value = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    
    applyTheme();
  }

  // Переключение темы
  function toggleTheme() {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    applyTheme();
  }

  // Применение темы к DOM
  function applyTheme() {
    if(localStorage.getItem('theme') == 'dark') {
        document.body.classList.remove('light'); 
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark'); 
        document.body.classList.add('light');
    }
  }
  initTheme();

  return { isDark, toggleTheme };
});
