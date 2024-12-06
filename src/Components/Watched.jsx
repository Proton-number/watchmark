"use client";

import { useMovieStore } from "@/Store/movieStore";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import TheatersIcon from "@mui/icons-material/Theaters";
import { auth, db } from "@/Config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import FloatingButton from "./FloatingButton";
import Loading from "@/Loaders/Loading";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Link from "next/link";

export default function Watched() {
  const { watchedMovies, setWatchedMovies, removeFromWatched } =
    useMovieStore();
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, movie) => {
    setAnchorEl(event.currentTarget);
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMovie(null);
  };

  const handleRemoveFromWatched = () => {
    if (selectedMovie) {
      removeFromWatched(selectedMovie);
      handleClose();
    }
  };

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

        const querySnapshot = await getDocs(watchedMoviesCollection);
        const movies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWatchedMovies(movies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching watched movies:", error);
        setIsLoading(false);
      }
    };
    getWatchedMovies();
  }, [setWatchedMovies]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Loading />
      </Box>
    );
  }

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
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h5">
                      <strong>{movie.title}</strong>
                    </Typography>
                    <Box>
                      <IconButton
                        id="demo-positioned-button"
                        aria-controls={
                          open ? "demo-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, movie)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        elevation={2}
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <MenuItem onClick={handleRemoveFromWatched}>
                          <ListItemIcon>
                            <RemoveCircleOutlineIcon sx={{ color: "red" }} />
                          </ListItemIcon>
                          <ListItemText>Remove</ListItemText>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Stack>
                  <Typography>
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "Unknown Year"}
                  </Typography>
                  <Typography>
                    Watched:{" "}
                    {movie.watchedDate
                      ? new Date(movie.watchedDate).toLocaleDateString("en-GB")
                      : new Date().toLocaleDateString("en-GB")}
                  </Typography>
                  <Typography> Language: {movie.original_language}</Typography>
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
