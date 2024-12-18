"use client";

import styles from "./page.module.css";
import { Typography, Stack, Tab, Box } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useState, useEffect } from "react";
import Movies from "@/Components/Movies";
import Watched from "@/Components/Watched";
import WatchList from "@/Components/WatchList";
import Search from "@/Components/Search";
import { useMovieStore } from "@/Store/movieStore";
import SearchIcon from "@mui/icons-material/Search";
import FirebaseAuthHandler from "@/Config/FirebaseAuthHandler";
import { auth, db } from "@/Config/Firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Home() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { watchedCount, watchListCount, setWatchedCount, setWatchListCount } =
    useMovieStore();
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          onSnapshot(userDocRef, (doc) => {
            const userData = doc.data() || {};
            setWatchedCount(userData.watchedCount || 0);
            setWatchListCount(userData.watchListCount || 0);
          });
        }
      });
      return () => unsubscribe();
    }

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      const userData = doc.data() || {};
      setWatchedCount(userData.watchedCount || 0);
      setWatchListCount(userData.watchListCount || 0);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          padding: { xs: "14px", sm: "30px" },
        }}
      >
        <Box sx={{ paddingTop: { xs: "70px", sm: "80px" } }}>
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  maxWidth: 600,
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="Movie Tracker Tabs"
                  sx={{
                    width: "100%",
                    "& .MuiTabs-indicator": {
                      display: "none", // Hide default indicator
                    },

                    padding: "5px",
                  }}
                  textColor="#04768b"
                >
                  <Tab
                    label={
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <SearchIcon />
                        <strong style={{ opacity: "78%" }}>
                          {" "}
                          Search Movies
                        </strong>
                      </Stack>
                    }
                    value="1"
                    sx={{
                      fontWeight: "bold",
                      color: value === "1" ? "black" : "secondary",
                      backgroundColor:
                        value === "1" ? "#ffffff" : "transparent",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      textTransform: "none",
                      width: "33.33%", // Evenly space the tabs
                    }}
                    disableRipple
                  />
                  <Tab
                    label={`Watched Movies (${watchedCount})`}
                    value="2"
                    sx={{
                      fontWeight: "bold",
                      color: value === "2" ? "black" : "text.secondary",
                      backgroundColor:
                        value === "2" ? "#ffffff" : "transparent",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      textTransform: "none",
                      width: "33.33%",
                    }}
                    disableRipple
                  />

                  <Tab
                    label={`Watch List (${watchListCount})`}
                    value="3"
                    sx={{
                      fontWeight: "bold",
                      color: value === "3" ? "black" : "text.secondary",
                      backgroundColor:
                        value === "3" ? "#ffffff" : "transparent",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      textTransform: "none",
                      width: "33.33%",
                    }}
                    disableRipple
                  />
                </TabList>
              </Box>
              <Box
                sx={{
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <TabPanel value="1">
                  <Search />
                  <Movies />
                </TabPanel>
                <TabPanel value="2">
                  <Watched />
                </TabPanel>
                <TabPanel value="3">
                  <WatchList />
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Box>
      </Stack>
      <FirebaseAuthHandler />
    </>
  );
}
