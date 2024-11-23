"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import { UserButton } from "@clerk/nextjs";

function Nav() {
  return (
    <AppBar id="desktopNav" sx={{ backgroundColor: "black", color: "white" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography>Watchmark</Typography>
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonName: {
                color: "pink", // Text color of the name
              },
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
