"use client";

import {
  TextField,
  Stack,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useMovieStore } from "@/Store/movieStore";
import CloseIcon from "@mui/icons-material/Close";

function Search() {
  const { searchedMovie, setSearchedMovie, fetchSearchedMovie, fetchMovies } =
    useMovieStore();

  const searchHandler = async () => {
    try {
      await fetchSearchedMovie(searchedMovie);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  const closeHandler = async () => {
    setSearchedMovie("");
    await fetchMovies(1);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ marginBottom: "20px", alignItems: "Center" }}
    >
      <TextField
        placeholder="Search for a movie..."
        size="small"
        sx={{ width: { xs: "100%", sm: "80%", lg: "45%" } }}
        value={searchedMovie || ""}
        onChange={(e) => setSearchedMovie(e.target.value)}
        onKeyDown={handleKeyPress}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                {searchedMovie && (
                  <IconButton onClick={closeHandler}>
                    <CloseIcon sx={{ color: "black" }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
      />
      <Box sx={{ backgroundColor: "#282f3c", borderRadius: "4px" }}>
        <IconButton onClick={searchHandler}>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Stack>
  );
}

export default Search;
