"use client";

import { useMovieStore } from "@/Store/movieStore";
import { Box, Grid, Stack, Typography, Card, CardContent } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import TheatersIcon from "@mui/icons-material/Theaters";
import { auth, db } from "@/Config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import FloatingButton from "./FloatingButton";

export default function Watched() {
  const { watchedMovies, setWatchedMovies } = useMovieStore();

  useEffect(() => {
    const getWatchedMovies = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not logged in");
          return;
        }

        const watchedMoviesCollection = collection(
          db,
          "users",
          user.uid,
          "watchedMovies"
        );

        // const watchedMoviesQuery = query(
        //   watchedMoviesCollection,
        //   orderBy("id", "desc")
        // );

        const querySnapshot = await getDocs(watchedMoviesCollection);
        const movies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWatchedMovies(movies);
      } catch (error) {
        console.error("Error fetching watched movies:", error);
      }
    };
    getWatchedMovies();
  }, [setWatchedMovies]);

  if (!watchedMovies || watchedMovies.length === 0) {
    return (
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
        spacing={2}
      >
        <Box
          sx={{
            backgroundColor: "#f3f4f6",
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <TheatersIcon sx={{ fontSize: 35 }} />
        </Box>
        <Typography variant="h5">No watched movies yet!</Typography>
        <Typography
          sx={{ maxWidth: "400px", textAlign: "Center", opacity: "60%" }}
        >
          {" "}
          Start marking movies as watched! Your watched movies will appear here.
        </Typography>
      </Stack>
    );
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
        {watchedMovies.map((movie, index) => {
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png";
          return (
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
                    priority
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
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack>
                      <Typography>
                        <strong>{movie.title}</strong>
                      </Typography>
                      <Typography>
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "Unknown Year"}
                      </Typography>
                      <Typography>
                        Watched:{" "}
                        {movie.watchedDate
                          ? new Date(movie.watchedDate).toLocaleDateString(
                              "en-GB"
                            )
                          : new Date().toLocaleDateString("en-GB")}
                      </Typography>
                    </Stack>
                    <Typography>{movie.original_language}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <FloatingButton />
    </Box>
  );
}
