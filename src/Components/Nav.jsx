"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import { UserButton } from "@clerk/nextjs";

function Nav() {
  return (
    <AppBar
      id="desktopNav"
      sx={{
        backgroundColor: "black",
        color: "white",
        p: "4px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Watchmark
        </Typography>
        <UserButton showName />
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
