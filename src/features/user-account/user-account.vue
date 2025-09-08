<script setup lang="ts">
</script>

<template>
    <div class="user-account">
        <div class="user-account__header">
            <h1>Личный кабинет</h1>
        </div>
    </div>
</template>


<style lang="scss">
.user-account {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .user-account__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        > h1 {
            color: var(--text-primary);
        }
    }
}
</style>