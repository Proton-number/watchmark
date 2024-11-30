import { useMovieStore } from "@/Store/movieStore";
import { Box, Grid, Stack, Typography, Card, CardContent } from "@mui/material";
import Image from "next/image";
import React from "react";
import TheatersIcon from "@mui/icons-material/Theaters";

export default function Watched() {
  const { watchedMovies } = useMovieStore();
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
                        {new Date(movie.release_date).getFullYear()}
                      </Typography>
                      <Typography>
                        Watched: {new Date().toLocaleDateString("en-GB")}
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
    </Box>
  );
}
