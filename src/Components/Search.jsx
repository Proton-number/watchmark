import { TextField, Stack, Box, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ marginBottom: "20px", alignItems: "Center" }}
    >
      <TextField
        placeholder="Search for a movie..."
        size="small"
        sx={{ width: { sm: "80%", lg: "45%" } }}
      />
      <Box sx={{ backgroundColor: "#282f3c", borderRadius: "4px" }}>
        <IconButton>
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Stack>
  );
}

export default Search;
