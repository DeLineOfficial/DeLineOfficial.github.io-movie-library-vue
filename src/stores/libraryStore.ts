import { defineStore } from "pinia";
import { ref } from "vue";
import type { Movie } from '@/core/types/movieTypes'

export const useAccountLibraryStore = defineStore("library", () => {
  const libraryMovie = ref([]);
  const recentlyAdded = ref({});

  function initLibrary() {
    if (!localStorage.getItem("library")) {
      libraryMovie.value = [];
    } else {
      libraryMovie.value = JSON.parse(localStorage.getItem("library"));
    }
  }

  function appendMovie(item: Movie) {
    try {
      const checkDublicate = libraryMovie.value.find((el: Movie) => el.imdbID === item.imdbID);
      if (!checkDublicate) {
        libraryMovie.value.push(item);
        recentlyAdded.value[item.imdbID] = true;
        localStorage.setItem("library", JSON.stringify(libraryMovie.value));

        setTimeout(() => {
            delete recentlyAdded.value[item.imdbID];
        }, 2000);
      } else {
        alert("Элемент уже существует");
      }
    } catch (error) {
      return error;
    }
  }

  function removeMovie(item: Movie) {
    try {
        const newArr = libraryMovie.value.filter((el: Movie) => el !== item);
        libraryMovie.value = newArr;
        localStorage.setItem("library", JSON.stringify(libraryMovie.value));
        
    } catch (error) {
        return error
    }
  }

  initLibrary();

  return { libraryMovie, appendMovie, recentlyAdded, removeMovie };
});
