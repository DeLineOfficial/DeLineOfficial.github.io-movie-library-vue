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

        <div class="omdb__content">
            <div v-for="item in movieStore.movies">{{ item }}</div>
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
        flex-direction: column;
        overflow: auto;
    }
}

</style>