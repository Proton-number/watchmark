import { create } from "zustand";

export const useMovieStore = create((set) => ({
  movies: [],
  page: 1, // keep track of current page
  hasMore: true, // flag to indicate if there are more movies to fetch

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
       movies: page === 1 ? data.results : [...state.movies, ...data.results], // Use the current state for appending
       page,
       hasMore,
     }));
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  },
}));
