import { create } from "zustand";

export const useMovieStore = create((set) => ({
  movies: [],

  fetchMovies: async () => {
    try {
      console.log("Fetching movies...");
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=080f0c4a5368b224d7e7170975a17847`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ movies: data.results });
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },
}));
