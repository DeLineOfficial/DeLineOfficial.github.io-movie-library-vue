import { defineStore } from 'pinia';
import omdbApi from '@/core/api/omdb';
import { ref } from 'vue';

export const useMovieStore = defineStore('movies', () => {

    let isLoading = ref(false);
    let errorApi = ref(null);
    let totalResults = ref(0);
    let movies = ref([]);

    async function searchMovies(query: string, page = 1) {
      try {
        isLoading.value = true;
        errorApi.value = null;
        
        const data = await omdbApi.search(query, page);
        
        if (data.Response === 'True') {
          movies.value = data.Search;
          totalResults.value = parseInt(data.totalResults);
        } else {
          throw new Error(data.Error || 'No results found');
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        isLoading.value = false;
      }
    }

    async function fetchAllMovies(query: string) {
        try {
            isLoading.value = true;
            errorApi.value = null;
            movies.value = [];

            const firstPage = await omdbApi.search(query, 1);

            if(firstPage.Response !== 'True') {
                throw new Error(firstPage.Error)
            }
            movies.value = firstPage.Search;

            const totalPages = Math.min(Math.ceil(firstPage.totalResults / 10), 100);
            const requests = [];

            for (let page = 2; page <= totalPages; page++) {
                requests.push(omdbApi.search(query, page));
            }

            const responses = await Promise.all(requests);
            responses.forEach(res => {
            if (res.Response === 'True') {
                movies.value = [...movies.value, ...res.Search];
            }
            });
        }
        catch (error) {
            error = errorApi.value.message;
            console.error('Fetch all failed:', error);
        }
        finally {
            isLoading.value = false;
        }
    }


    return {movies, searchMovies, fetchAllMovies, isLoading}
})
