<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import themeSwitcher from './components/themeSwitcher/themeSwitcher.vue';
import sidebarRouter from './components/sidebarRouter/sidebar-router.vue';

const routerItems = ref([
  {
    link: '/',
    icon: 'house',
  },
  {
    link: '/test',
    icon: 'calculator',
  },
])
</script>

<template>
  <main>
    <header class="header">
      <themeSwitcher class="theme"/>
    </header>
    <aside class="sidebar">
      <sidebarRouter :items="routerItems"/>
    </aside>
    <div class="main-container">
      <RouterView class="router-view"/>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  position: relative;
  background: var(--background-primary);
}
aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transition: .3s;
  padding: 20px;
  padding-top: 80px;
  min-width: 86px;
  width: 86px;
  background: var(--background-secondary);
}
.header {
  display: flex;
  width: 100%;
  right: 0;
  position: absolute;
  top: 0;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background: var(--background-secondary);
  > .theme {
    margin-left: auto;
  }
}
.main-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  flex: 1 1 auto;
  box-shadow: inset 3px 3px 5px rgba($color: #000000, $alpha: 0.2);
  transition: .3s;
  padding: 20px;
  padding-top: 80px;

  > .router-view {
    animation: fadeIn .3s;
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
}
</style>
