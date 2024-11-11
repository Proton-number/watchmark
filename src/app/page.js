"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Typography, Stack, Tab, Box } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack className={styles.page} alignItems="center" spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Movie Tracker
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <TabContext value={value}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <TabList onChange={handleChange} aria-label="Movie Tracker Tabs">
              <Tab
                label="Search Movies"
                value="1"
                sx={{
                  fontWeight: "bold",
                  color: value === "1" ? "primary.main" : "text.secondary",
                  padding: "12px 16px",
                  borderBottom: value === "1" ? "2px solid #1976d2" : "none",
                }}
              />
              <Tab
                label="Watched Movies"
                value="2"
                sx={{
                  fontWeight: "bold",
                  color: value === "2" ? "primary.main" : "text.secondary",
                  padding: "12px 16px",
                  borderBottom: value === "2" ? "2px solid #1976d2" : "none",
                }}
              />
              <Tab
                label="Watch List"
                value="3"
                sx={{
                  fontWeight: "bold",
                  color: value === "3" ? "primary.main" : "text.secondary",
                  padding: "12px 16px",
                  borderBottom: value === "3" ? "2px solid #1976d2" : "none",
                }}
              />
            </TabList>
          </Box>
          <Box
            sx={{
              padding: "24px",
              border: "1px solid #ddd",
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              backgroundColor: "white",
            }}
          >
            <TabPanel value="1">Search for a movie...</TabPanel>
            <TabPanel value="2">List of watched movies...</TabPanel>
            <TabPanel value="3">Your watch list...</TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Stack>
  );
}
