<script setup lang="ts">
import { defineProps } from 'vue';
import type { PropType } from 'vue';

interface RouterType {
    icon: string,
    link: string
}

const props = defineProps({
    items: Array as PropType<RouterType[]> 
})
</script>

<template>
    <div class="sidebar__items">
        <RouterLink v-for="item in props.items" :to="`${item.path}`" class="sidebar__item">
           <font-awesome-icon :icon="item.name" class="sidebar__icon"/>
        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.sidebar__items {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 8px;

  > .sidebar__item {
    display: flex;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-radius: 50%;
    font-size: 20px;
    background: var(--background-secondary);
    border: 1px solid var(--background-accent);
    
    .sidebar__icon {
        color: var(--text-accent);
        transition: 0s;
    }
    &.router-link-active {
      background: var(--background-accent);

      .sidebar__icon {
        color: var(--text-secondary);
      }
    }

  }
}
</style>