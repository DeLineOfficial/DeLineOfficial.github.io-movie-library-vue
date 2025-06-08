<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieStore'


const movieStore = useMovieStore();
const queryMovie = ref('')

const search = () => {
    movieStore.searchMovies(queryMovie.value);
};
const fetchAll = () => {
  movieStore.fetchAllMovies(queryMovie.value);
};

onMounted(() => {
})
</script>

<template>
    <div class="omdb__container">
        <div class="omdb__header">
            <h1>Библиотеке IMDB</h1>
            
            <div class="omdb__control">
                <input v-model="queryMovie" type="text" placeholder="Поиск фильма"/>
                <button @click="search()">Найти</button>
                <button @click="fetchAll()">Загрузить все</button>
            </div>
        </div>

        <div class="omdb__content" v-if="movieStore.movies.length">
            <div v-for="item in movieStore.movies" :key="item.id" class="omdb__item">
                <img :src="item.Poster" alt="img" @click="console.log(item)">
                
                <div class="item__description">
                    <p class="title">{{ item.Title }}</p>
                    <p class="year">{{ item.Year }}</p>
    
                    <a :href="`https://www.imdb.com/title/${item.imdbID}/`" target="_blank" class="to">Перейти</a>
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

            * {
                height: 32px;
                padding: 0 16px;
                display: flex;
                align-items: center;
                border-radius: 20px;
                outline: none;
                border: none;
            }
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
        
        &.not-found {
            align-items: center;
            color: var(--text-primary);
            justify-content: center;
        }
        > .omdb__item {
            display: flex;
            flex-direction: column;
            height: 600px;
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
                height: 160px;

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
                > .to {
                    display: flex;
                    margin-top: auto;
                }
            }
        }
    }
}

</style>