<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import { useAccountLibraryStore } from '@/stores/libraryStore';
import loader from '@/components/loader/loader.vue';

const movieStore = useMovieStore();
const libraryStore = useAccountLibraryStore();
const queryMovie = ref('')

const search = () => {
    movieStore.searchMovies(queryMovie.value);
};
const fetchAll = () => {
    movieStore.fetchAllMovies(queryMovie.value);
};


onMounted(() => {
    console.log(libraryStore.libraryMovie)
    console.log(movieStore.movies)
})
</script>

<template>
    <div class="omdb__container">
        <div class="omdb__header">
            <h1>Библиотека IMDB</h1>
            
            <div class="omdb__control">
                <input v-model="queryMovie" type="text" placeholder="Поиск фильма"/>
                <button @click="search()">Найти</button>
                <button @click="fetchAll()">Загрузить все</button>
            </div>
        </div>
        <div class="omdb__content loading" v-if="movieStore.isLoading">
            <loader :size="'large'">Подождите немного</loader>
        </div>
        <div class="omdb__content" v-else-if="movieStore.movies.length">
            <div v-for="item in movieStore.movies" :key="item.id" class="omdb__item">
                <img :src="item.Poster" alt="img" @click="console.log(item)">
                
                <div class="item__description">
                    <p class="title">{{ item.Title }}</p>
                    <p class="year">{{ item.Year }}</p>
                    
                    <div class="item__actions">
                        <a :href="`https://www.imdb.com/title/${item.imdbID}/`" target="_blank" class="to">Перейти <font-awesome-icon :icon="'arrow-right'" class="icon"/></a>
                        <div @click="libraryStore.appendMovie(item)" class="item__append" :class="{'append' : libraryStore.recentlyAdded[item.imdbID]}"><font-awesome-icon :icon="libraryStore.recentlyAdded[item.imdbID] ? 'check' : 'plus'"/></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="omdb__content not-found" v-else>
            В данный момент ничего не найдено.
        </div>
    </div>
</template>

<style lang="scss" scoped>

.omdb__container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    animation: fadeIn .3s;
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    > .omdb__header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        > h1 {
            color: var(--text-primary);
        }
        > .omdb__control {
            display: flex;
            align-items: center;
            gap: 8px;
            input {
                border: 1px solid var(--background-primary);
                background: var(--background-secondary);
                color: var(--text-primary);
                &::placeholder {
                    color: var(--text-disable);
                }
            }
            button {
                border: 1px solid var(--background-primary);
                background: var(--background-secondary);
                color: var(--text-primary);
            }
            * {
                height: 32px;
                padding: 0 16px;
                display: flex;
                align-items: center;
                border-radius: 20px;
                outline: none;
                border: none;
            }
            @media screen and (max-width: 576px) {
                flex-direction: column;
                width: 100%;
                > * {
                    width: 100%;
                    text-align: center;
                }
                > button {
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
        @media screen and (max-width: 880px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
        }
    }
    > .omdb__content {
        display: flex;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
        overflow-y: auto;
        overflow-x: hidden;
        gap: 20px;
        padding-right: 16px;
        justify-content: space-between;
        &.loading {
            align-items: center;
            justify-content: center;
        }
        &.not-found {
            align-items: center;
            color: var(--text-primary);
            justify-content: center;
        }
        @media screen and (max-width: 576px) {
            padding: 0;
        }
        > .omdb__item {
            display: flex;
            flex-direction: column;
            height: auto;
            width: calc(20% - 20px);
            background: var(--background-secondary);

            > img {
                width: 100%;
                height: 440px;
                object-fit: cover;
                object-position: center;
            }

            > .item__description {
                padding: 20px;
                display: flex;
                flex-direction: column;
                height: 100%;

                > .title {
                    font-size: 24px;
                    color: var(--text-primary);
                }
                > .year {
                    margin-top: 4px;
                    font-size: 12px;
                    color: var(--text-disable);
                    margin-bottom: 20px;
                }
                .item__actions {
                    display: flex;
                    justify-content: space-between;
                    margin-top: auto;
                    align-items: center;
                    > .item__append {
                        display: flex;
                        width: 32px;
                        height: 32px;
                        border-radius: 30px;
                        background: var(--background-primary);
                        color: #fff;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: .3s;
                        &:hover {
                            background: var(--background-accent);
                        }
                        &.append {
                            background: #008000;
                            transform: scale(1.1);
                        }
                    }
                    > .to {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: var(--text-primary);
                        text-decoration: none;
                        > .icon {
                            opacity: 0;
                            transition: .3s;
                            transform: translateX(-8px);
                        }
                        &:hover {
                            color: var(--text-accent);
                            > .icon {
                                opacity: 1;
                                transform: translateX(0px);
                            }
                        }
                    }
                }
            }
            @media screen and (max-width: 1660px) {
                width: calc(25% - 15px);
                height: auto;
                > img {
                    min-height: 440px;
                    height: 440px;
                }
            }
            @media screen and (max-width: 1224px) {
                width: calc(33% - 11px);
                > img {
                    height: 350px;
                    min-height: 350px;
                }
            }
            @media screen and (max-width: 880px) {
                width: calc(50% - 10px);
                
            }
            @media screen and (max-width: 576px) {
                width: 100%;
                > img {
                    height: 400px;
                    min-height: 400px;
                }
            }
        }
    }
}



</style>