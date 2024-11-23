"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import { useMovieStore } from "@/Store/movieStore";
import Image from "next/image";
import Link from "next/link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";

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
                  display: "flex", // Flex layout
                  flexDirection: "column", // Arrange children vertically
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "150%", // Maintain aspect ratio for images
                  }}
                >
                  <Image
                    src={posterUrl}
                    alt={movie.title || "No title"}
                    fill // Fills the container
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" // Responsive sizing
                    style={{
                      objectFit: "cover",
                      borderRadius: "4px 4px 0 0", // Rounded corners for the image
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1, // Fills the vertical space
                  }}
                >
                  <Link
                    href={`/Movies/${movie.id}`}
                  >
                    <Typography variant="h5">
                      {movie.title || "Untitled"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Language: {movie.original_language}
                    </Typography>
                  </Link>
                </CardContent>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ p: 2, justifyContent: "center" }}
                >
                  <Button
                    startIcon={<AccessTimeIcon />}
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#050708",
                      "&:hover": {
                        backgroundColor: "#282f3c",
                      },
                    }}
                    onClick={() => addtoWatched(movie)}
                  >
                    Watched
                  </Button>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#ffffff",
                      color: "#050708",
                      "&:hover": {
                        backgroundColor: "#f3f4f6",
                      },
                    }}
                    onClick={() => addToWatchList(movie)}
                  >
                    Watchlist
                  </Button>
                </Stack>
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
