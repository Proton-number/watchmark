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
import FloatingButton from "./FloatingButton";
import Loading from "@/Loaders/Loading";

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
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <Loading />
      </Box>
    );
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
                <Link
                  href={`/Movies/${movie.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
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
                      priority
                      alt={movie.title || "No title"}
                      fill // Fills the container
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" // Responsive sizing
                      style={{
                        objectFit: "cover",
                        borderRadius: "4px 4px 0 0", // Rounded corners for the image
                      }}
                    />
                    <Box
                      position="absolute"
                      sx={{
                        backgroundColor: "black",
                        padding: "4px",
                        top: "18px",
                        right: "18px",
                        color: "white",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="body2">
                        {new Date(movie.release_date).getFullYear()}
                      </Typography>
                    </Box>
                  </Box>
                </Link>

                <CardContent
                  sx={{
                    flexGrow: 1, // Fills the vertical space
                  }}
                >
                  <Typography variant="h5">
                    <strong> {movie.title || "Untitled"}</strong>
                  </Typography>
                  <Stack spacing={3}>
                    {" "}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Language: {movie.original_language}
                    </Typography>
                  </Stack>
                </CardContent>
                <Stack
                  direction={{ sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                  sx={{
                    p: { xs: 2, sm: 2 },
                    justifyContent: "center",
                  }}
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
      <FloatingButton />
    </Box>
  );
}

export default Movies;
