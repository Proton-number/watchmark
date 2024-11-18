"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

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

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {movieData?.title || "Untitled"}
      </Typography>
    </div>
  );
}

export default page;
