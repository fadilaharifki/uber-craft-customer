import { ReactNode } from "react";
import Navbar from "./NavBar";
import { Box } from "@mui/material";

interface LayoutComponentProps {
  children: ReactNode;
  classNameChildren?: string;
}

const LayoutComponent = ({
  children,
  classNameChildren,
}: LayoutComponentProps) => {
  return (
    <Box>
      <Navbar />
      <div className={classNameChildren}>{children}</div>
    </Box>
  );
};

export default LayoutComponent;
