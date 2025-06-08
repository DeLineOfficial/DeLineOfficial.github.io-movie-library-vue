<script setup>
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<template>
  <div @click="themeStore.toggleTheme()" class="theme-switcher" :class="{'dark': themeStore.isDark}">
    <div class="toggle">
      <div class="toggle__icon">
        <img v-if="themeStore.isDark" src="../../../public//icons/moon.svg">
        <img v-else src="../../../public//icons/sun.svg">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.theme-switcher {
    display: flex;
    user-select: none;
    align-items: center;
    cursor: pointer;
    height: 38px;
    width: 70px;
    border-radius: 30px;
    align-items: center;
    font-size: 24px;
    background: var(--background-primary);
    box-shadow: inset 0px 0px 10px rgba($color: #000000, $alpha: 0.3);

    > .toggle {
      display: flex;
      height: 32px;
      width: 32px;
      background: var(--background-secondary);
      border-radius: 50%;
      min-width: 32px;
      transition: 0.3s;
      transform: translateX(4px);
      align-items: center;
      justify-content: center;
      max-width: 32px;
      > .toggle__icon {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        justify-content: center;
      }


    }
    &.dark {
      > .toggle {
        transform: translateX(34px);
      }
    }
}
</style>