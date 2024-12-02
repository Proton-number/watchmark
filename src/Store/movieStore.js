import { db, auth } from "@/Config/Firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { create } from "zustand";

export const useMovieStore = create((set, get) => {
  return {
    movies: [],
    page: 1, // keep track of current page
    hasMore: true, // flag to indicate if there are more movies to fetch
    searchedMovie: "", //for seraching'
    setSearchedMovie: (searchedMovie) => set(() => ({ searchedMovie })),
    isSearching: false,
    watchedMovies: [],
    setWatchedMovies: (watchedMovies) => set(() => ({ watchedMovies })),
    watchedCount: 0,
    setWatchedCount: (watchedCount) => set(() => ({ watchedCount })),
    watchList: [],
    setWatchList: (watchList) => set(() => ({ watchList })),
    watchListCount: 0,
    setWatchListCount: (watchListCount) => set(() => ({ watchListCount })),
    watchedDate: "",

    fetchMovies: async (page = 1) => {
      try {
        console.log("Fetching movies...");
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check if there are more movies to fetch
        const hasMore = data.page < data.total_pages;

        set((state) => ({
          movies:
            page === 1 ? data.results : [...state.movies, ...data.results], // Use the current state for appending
          page,
          hasMore,
          isSearching: false,
        }));
      } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
      }
    },
    //fetching using the searchbar
    fetchSearchedMovie: async (query) => {
      try {
        if (!query.trim()) {
          // If search is empty, fetch popular movies
          return await set.getState().fetchMovies(1);
        }
        const response = await fetch(
          // encodeURIComponent converts special characters to Url-friendly formats
          `https://api.themoviedb.org/3/search/movie?api_key=${
            process.env.NEXT_PUBLIC_TMDB_API_KEY
          }&query=${encodeURIComponent(query)}&page=1`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        set(() => ({
          movies: data.results,
          page: 1,
          hasMore: false, // Disable load more for search results
          isSearching: true,
        }));
      } catch (error) {
        console.error("Error searching movies:", error);
        throw error;
      }
    },

    addtoWatched: async (movie) => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not logged in");
          return;
        }

        set((state) => {
          // ".some()" checks if watched.id === movie.id, and if it finds a match, it means the movie is already in the watchedMovies list, so it won't be added again.
          if (state.watchedMovies.some((watched) => watched.id === movie.id)) {
            return state; // Return the current state if movie is already watched
          }
          return {
            watchedMovies: [...state.watchedMovies, movie],
            // Add the movie to the watchedMovies list
            watchedCount: state.watchedCount + 1,
          };
        });

        // Reference to the user's watchedMovies collection in Firestore
        const watchedMoviesRef = doc(
          collection(db, "users", user.uid, "watchedMovies"),
          movie.id.toString() // Use movie ID as the document ID
        );
        await setDoc(watchedMoviesRef, movie);

        // Create or update the user document with the new watched count
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(
          userDocRef,
          {
            watchedCount: get().watchedCount,
          },
          { merge: true }
        );
        console.log("Movie added to Firestore watchedMovies collection");
      } catch (error) {
        console.error("Error adding movie to Firestore:", error);
      }
    },

    addToWatchList: async (movie) => {
      const currentState = get();
      set((state) => {
        if (state.watchList.some((list) => list.id === movie.id)) {
          return state;
        }
        return {
          watchList: [...state.watchList, movie],
          watchListCount: state.watchListCount + 1,
        };
      });
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not logged in");
          return;
        }
        // Reference to the user's watchList collection in Firestore
        const watchListRef = doc(
          collection(db, "users", user.uid, "watchList"),
          movie.id.toString()
        );
        await setDoc(watchListRef, movie);
        // Create or update the user document with the new watched count
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(
          userDocRef,
          {
            watchListCount: currentState.watchListCount + 1,
          },
          { merge: true }
        );
        console.log("Movie added to Firestore watchList collection");
      } catch (error) {
        console.error("Error adding movie to Firestore:", error);
      }
    },
  };
});
