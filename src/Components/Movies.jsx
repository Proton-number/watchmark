"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
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
      <Grid container spacing={4} justifyContent="center">
        {movies.map((movie, index) => {
          const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          return (
            // Use return here to ensure JSX is rendered
            <Grid item key={index} xs={10} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%", // Ensure cards are of equal height
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "150%", // Aspect ratio for images (e.g., 2:3)
                  }}
                >
                  <Image
                    src={posterUrl}
                    alt={movie.title || "No title"}
                    fill
                    style={{
                      objectPosition: "top",
                      objectFit: "cover",
                      borderRadius: "4px 4px 0 0",
                    }} // Cover to maintain aspect ratio
                  />
                </Box>
                <CardContent>
                  <h2>{movie.title || "Untitled"}</h2>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {movie.release_date?.split("-")[0] || "N/A"}
                  </Typography>
                </CardContent>
                {/* Add other movie details */}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Movies;
