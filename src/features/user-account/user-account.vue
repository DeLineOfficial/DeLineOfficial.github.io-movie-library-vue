<script setup lang="ts">

import { useAccountLibraryStore } from '@/stores/libraryStore'
import { onMounted } from 'vue';

const libraryStore = useAccountLibraryStore();

</script>

<template>
    <div class="user-account">
        <div class="user-account__header">
            <h1>Личная библиотека</h1>
        </div>
        <div class="user-librarys">
            <div class="user-library__headers">
                <p>Название</p>
                <p>Тип</p>
                <p>Год</p>
            </div>
            <div class="user-library__content">
                <div v-for="item in libraryStore.libraryMovie" class="user-library__element">
                    <p>{{ item.Title }}</p>
                    <p>{{ item.Type }}</p>
                    <p>{{ item.Year }}</p>
                    <a :href="`https://www.imdb.com/title/${item.imdbID}/`" target="_blank" class="to"><font-awesome-icon icon="right-to-bracket"/></a>
                    <div class="delete" @click="libraryStore.removeMovie(item)"><font-awesome-icon icon="trash"/></div>
                </div>
            </div>

        </div>
    </div>
</template>


<style lang="scss">
.user-account {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    flex-direction: column;

    .user-account__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        >h1 {
            color: var(--text-primary);
        }
    }

    .user-librarys {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        margin-top: 24px;
        overflow: hidden;
        .user-library__headers {
            display: flex;
            width: 100%;
            background: var(--background-secondary);
            padding: 20px 0;
            color: var(--text-primary);
            align-items: center;
            border-bottom: 1px solid var(--background-primary);
            > p {
                padding: 0 20px;
                width: 20%;
            }
        }
        .user-library__content {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            overflow: auto;
            
            > .user-library__element {
                display: flex;
                align-items: center;
                width: 100%;
                color: var(--text-primary);
                border-bottom: 1px solid var(--background-primary);
                padding: 20px 20px 20px 0;
                background: var(--background-secondary);
                .to {
                    margin-left: auto;
                    margin-right: 20px;
                    color: var(--text-primary);
                    &:hover {
                        color: var(--text-accent);
                    }
                }
                > p {
                    width: 20%;
                    padding: 0 20px;
                }
                > .delete {
                    cursor: pointer;
                    color: var(--text-primary);
                    &:hover {
                        color: var(--text-accent);
                    }
                }
            }
        }
    }
}
</style>