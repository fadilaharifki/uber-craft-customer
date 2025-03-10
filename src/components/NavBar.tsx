"use client";

import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (state: boolean | ((prevState: boolean) => boolean)) => () => {
      setOpen(state);
    };

  return (
    <header className="fixed w-full py-2 px-6 backdrop-blur-md z-[1000]">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ padding: "8px 16px", borderRadius: "8px" }}>
          <Typography
            variant="h5"
            component="div"
            color="white"
            fontWeight="bold"
          >
            UBERCRAFT
          </Typography>
        </Box>

        {/* Menu untuk desktop */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button
            onClick={() => router.push("/login")}
            variant="outlined"
            sx={{ borderRadius: "999px", color: "white", borderColor: "white" }}
          >
            Log In
          </Button>
          <Button
            onClick={() => router.push("/register")}
            variant="contained"
            color="primary"
            sx={{ borderRadius: "999px" }}
          >
            Register
          </Button>
        </Box>

        {/* Icon menu untuk mobile */}
        <IconButton
          edge="start"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none", color: "white" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer untuk menu mobile */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Log In" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </header>
  );
};

export default Navbar;
