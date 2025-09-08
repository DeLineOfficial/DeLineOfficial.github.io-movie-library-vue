import { defineStore } from "pinia";
import { ref } from "vue";

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

  function appendMovie(item: any) {
    try {
      const checkDublicate = libraryMovie.value.find((el) => el.imdbID === item.imdbID);
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

  function removeMovie(item: any) {
    try {
        const newArr = libraryMovie.value.filter((el) => el !== item);
        libraryMovie.value = newArr;
        localStorage.setItem("library", JSON.stringify(libraryMovie.value));
        
    } catch (error) {
        return error
    }
  }

  initLibrary();

  return { libraryMovie, appendMovie, recentlyAdded, removeMovie };
});
