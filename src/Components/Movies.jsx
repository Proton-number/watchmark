"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useMovieStore } from "@/Store/movieStore";
import Image from "next/image";
import Link from "next/link";

function Movies() {
  const { fetchMovies, movies, page, hasMore, addtoWatched, addToWatchList } =
    useMovieStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  const loadMoreMovies = async () => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      try {
        await fetchMovies(page + 1); // Fetch the next page
      } catch (error) {
        console.error("Error loading more movies:", error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

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
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png";
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
                    fill // Fill the entire container
                    priority // Prioritize image loading by pre loading
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" // Responsive image sizing
                    style={{
                      objectPosition: "top", // Position the image
                      objectFit: "cover",
                      borderRadius: "4px 4px 0 0",
                    }} // Cover to maintain aspect ratio
                  />
                </Box>
                <Link href={`/Movies/${movie.id}`}>
                  <CardContent>
                    <h2>{movie.title || "Untitled"}</h2>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {movie.release_date?.split("-")[0] || "N/A"}
                      {/* Display release year */}
                    </Typography>
                    <Typography>
                      Lang(uage: {movie.original_language}
                    </Typography>
                  </CardContent>
                </Link>
                {/* Add other movie details */}
                <Button onClick={() => addtoWatched(movie)}>
                  Add to watched
                </Button>
                <Button onClick={() => addToWatchList(movie)}>
                  Add to watch list
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {hasMore && (
        <Button
          variant="contained"
          onClick={loadMoreMovies}
          disabled={isLoadingMore}
          sx={{
            mt: 4,
            textTransform: "none",
            fontSize: "14px",
            fontWeight: "bold",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {isLoadingMore ? "Loading..." : "Load More"}
        </Button>
      )}
    </Box>
  );
}

export default Movies;
