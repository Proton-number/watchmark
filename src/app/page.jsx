"use client";

import styles from "./page.module.css";
import { Typography, Stack, Tab, Box } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useState } from "react";
import Movies from "@/Components/Movies";
import Watched from "@/Components/Watched";
import WatchList from "@/Components/WatchList";
import Search from "@/Components/Search";

export default function Home() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        padding: "30px",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        WatchMark
      </Typography>
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
                label="Search Movies"
                value="1"
                sx={{
                  fontWeight: "bold",
                  color: value === "1" ? "black" : "secondary",
                  backgroundColor: value === "1" ? "#ffffff" : "transparent",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  textTransform: "none",
                  width: "33.33%", // Evenly space the tabs
                }}
                disableRipple
              />
              <Tab
                label="Watched Movies (0)"
                value="2"
                sx={{
                  fontWeight: "bold",
                  color: value === "2" ? "black" : "text.secondary",
                  backgroundColor: value === "2" ? "#ffffff" : "transparent",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  textTransform: "none",
                  width: "33.33%",
                }}
                disableRipple
              />

              <Tab
                label="Watch List (0)"
                value="3"
                sx={{
                  fontWeight: "bold",
                  color: value === "3" ? "black" : "text.secondary",
                  backgroundColor: value === "3" ? "#ffffff" : "transparent",
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
    </Stack>
  );
}
