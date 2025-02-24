"use client";

import { useRouter } from "next/navigation";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

interface ButtonBackProps {
  title: string;
  onClick?: () => void;
  hideArrow?: boolean;
}

export default function ButtonBack({
  title,
  onClick,
  hideArrow = false,
}: ButtonBackProps) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      {!hideArrow && (
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
      )}
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
