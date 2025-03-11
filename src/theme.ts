"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColor?: {
      gray: string;
    };
  }
  interface PaletteOptions {
    customColor?: {
      gray: string;
    };
  }
}

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
            backgroundColor: "#f9f9f9",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#3b82f6",
    },
    customColor: {
      gray: "#f9f9f9",
    },
  },
});

export default theme;
