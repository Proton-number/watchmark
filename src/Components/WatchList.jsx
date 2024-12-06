"use client";

import { useMovieStore } from "@/Store/movieStore";
import { useEffect, useState } from "react";
import { auth, db } from "@/Config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MovieIcon from "@mui/icons-material/Movie";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FloatingButton from "./FloatingButton";
import Loading from "@/Loaders/Loading";
import Link from "next/link";

function WatchList() {
  const { watchList, setWatchList, addtoWatched, removeFromWatchlist } =
    useMovieStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const open = Boolean(anchorEl);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (event, movie) => {
    setAnchorEl(event.currentTarget);
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMovie(null);
  };

  const handleAddToWatched = () => {
    if (selectedMovie) {
      addtoWatched(selectedMovie);
      handleClose();
    }
  };

  const handleRemoveFromWatchlist = () => {
    if (selectedMovie) {
      removeFromWatchlist(selectedMovie);
      handleClose();
    }
  };
  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not logged in");
          return;
        }
        const watchListCollection = collection(
          db,
          "users",
          user.uid,
          "watchList"
        );
        const querySnapshot = await getDocs(watchListCollection);
        const movies = querySnapshot.docs.map((doc) => doc.data());
        setWatchList(movies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching watched movies:", error);
        setIsLoading(false);
      }
    };
    getWatchlist();
  }, [setWatchList]);

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

  if (!watchList || watchList.length === 0) {
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
          <MovieIcon sx={{ fontSize: 35 }} />
        </Box>
        <Typography variant="h5">Your Watchlist is Empty</Typography>
        <Typography
          sx={{ maxWidth: "400px", textAlign: "Center", opacity: "60%" }}
        >
          {" "}
          Looks like you haven't added any movies to your watchlist yet. Start
          exploring and adding films you want to watch!
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
        {watchList.map((movie, index) => {
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
                {" "}
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
                      {" "}
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
                        onClick={(event) => handleClick(event, movie)}
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
                        <MenuItem onClick={handleAddToWatched}>
                          <ListItemIcon>
                            <AccessTimeIcon sx={{ color: "black" }} />
                          </ListItemIcon>
                          <ListItemText>Add to watched</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleRemoveFromWatchlist}>
                          <ListItemIcon>
                            <RemoveCircleOutlineIcon sx={{ color: "red" }} />
                          </ListItemIcon>
                          <ListItemText>Remove</ListItemText>
                        </MenuItem>
                      </Menu>
                    </Box>
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

export default WatchList;
