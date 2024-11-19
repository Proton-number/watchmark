"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Container,
  Button,
} from "@mui/material";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function page() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetch movie data from API
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        loading...
      </Box>
    );
  }

  if (!movieData) {
    return <div>Movie not found.</div>;
  }

  const posterUrl = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : "/placeholder.png";

  // Extract genres as a comma-separated string
  const genres = movieData.genres
    ? movieData.genres.map((genre) => genre.name).join(", ")
    : "Unknown";

  return (
    <Container
      sx={{
        padding: "80px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ padding: "50px" }} elevation={4}>
        <Stack spacing={{ lg: 5 }} direction={{ sm: "row" }}>
          <Image
            src={posterUrl}
            alt={movieData.title || "No title"}
            width={400}
            height={600}
          />

          <Stack spacing={{ lg: 2 }}>
            <Typography variant="h3">
              <strong>{movieData?.title || "Untitled"}</strong>
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                <StarBorderIcon sx={{ color: "gold" }} />
                <Typography>
                  {movieData.vote_average.toFixed(1)} ({movieData.vote_count}{" "}
                  votes)
                </Typography>
              </Stack>
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                <CalendarMonthIcon />
                <Typography>
                  {new Date(movieData.release_date).getFullYear()}
                </Typography>
              </Stack>
            </Stack>
            <Typography>
              <strong>Genre: </strong>
              {genres}
            </Typography>
            <Typography>{movieData.overview}</Typography>

            <Stack>
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  textTransform: "none",
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "hsl(219, 20%, 20%)" },
                }}
                disableElevation
              >
                Add to Watchlist
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

export default page;
