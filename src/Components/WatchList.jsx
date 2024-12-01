"use client";

import { useMovieStore } from "@/Store/movieStore";
import { useEffect } from "react";
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
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function WatchList() {
  const { watchList, setWatchList, addtoWatched, removeFromWatchlist } =
    useMovieStore();

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
      } catch (error) {
        console.error("Error fetching watched movies:", error);
      }
    };
    getWatchlist();
  }, [setWatchList]);

  if (!watchList || watchList.length === 0) {
    return <div>Your watchlist is empty. Search for movies to add!</div>;
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
                  <Typography variant="h5">
                    {" "}
                    <strong>{movie.title}</strong>
                  </Typography>
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
                        width: "fit-content",
                      }}
                      onClick={() => addtoWatched(movie)}
                    >
                      Watched
                    </Button>
                    <Button
                      startIcon={<RemoveCircleOutlineIcon />}
                      onClick={() => removeFromWatchlist(movie)}
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        backgroundColor: "#ffffff",
                        color: "#050708",
                        "&:hover": {
                          backgroundColor: "#f3f4f6",
                        },
                      }}
                    >
                      Remove
                    </Button>
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

export default WatchList;
