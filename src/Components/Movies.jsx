"use client";
import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useMovieStore } from "@/Store/movieStore";
import Image from "next/image";


function Movies() {
  const { fetchMovies, movies } = useMovieStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMovies();
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fetchMovies]);

  if (isLoading) {
    return <div>Loading movies...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div>No movies found.</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {movies.map((movie, index) => (
        <div key={index}>
          <Image
            src={movie.poster_path}
            alt={movie.title}
            width={500}
            height={750}
            className="w-full h-auto"
          />
          <h2>{movie.title}</h2>
          {/* Add other movie details */}
        </div>
      ))}
    </Box>
  );
}

export default Movies;
