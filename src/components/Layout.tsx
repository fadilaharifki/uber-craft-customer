import { ReactNode } from "react";
import Navbar from "./NavBar";
import { Box } from "@mui/material";

interface LayoutComponentProps {
  children: ReactNode;
}

const LayoutComponent = ({ children }: LayoutComponentProps) => {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
};

export default LayoutComponent;
