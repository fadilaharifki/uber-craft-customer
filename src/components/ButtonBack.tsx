"use client";

import { useRouter } from "next/navigation";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

interface ButtonBackProps {
  title: string;
  onClick?: () => void;
}

export default function ButtonBack({ title, onClick }: ButtonBackProps) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      <IconButton
        onClick={() => {
          if (typeof onClick === "function") {
            onClick();
          } else {
            router.back();
          }
        }}
        size="small"
        sx={{
          mr: 1,
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "#1d4ed8",
          },
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h6"
        component="h1"
        color="primary"
        sx={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>
    </Box>
  );
}
