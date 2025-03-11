"use client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider, IconButton } from "@mui/material";
import {
  LocationOnRounded,
  PeopleAltRounded,
  SmokingRooms,
  WcRounded,
  Wifi,
} from "@mui/icons-material";
import useScreenSize from "@/hooks/useScreenSize";
import ImageDialog from "./ImageDialog";
import { useState } from "react";
import { images } from "@/modules/order/dummy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useToast from "@/hooks/useToast";
export interface AircraftInterface {
  id: string;
  name: string;
  image: string;
  airport: string;
  price: number;
  passenger_capacity: number;
  model: string;
  brand: string;
}

const CardComponent = ({ data }: { data: AircraftInterface }) => {
  const { showToast } = useToast();
  const { breakpoint } = useScreenSize();
  const [openDialog, setOpenDialog] = useState(false);
  const [hover, setHover] = useState(false);

  const isMobile = breakpoint === "sm";

  return (
    <>
      <Card
        onClick={() => showToast("Order Under Development", "info")}
        className={`transition-all duration-300 cursor-pointer ease-in-out hover:brightness-90 hover:shadow-lg flex ${
          isMobile ? "flex-row" : "flex-col"
        }`}
        sx={{
          width: isMobile ? "100%" : 250,
          borderRadius: 5,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: isMobile ? "40%" : "100%",
            height: isMobile ? "100%" : 140,
          }}
          onMouseEnter={() => !isMobile && setHover(true)}
          onMouseLeave={() => !isMobile && setHover(false)}
        >
          <CardMedia
            component="img"
            alt={data.name}
            image={data.image}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: isMobile ? 10 : 0,
              borderTopRightRadius: isMobile ? 0 : 10,
            }}
          />

          {(isMobile || hover) && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpenDialog(true);
              }}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                transition: "opacity 0.3s ease-in-out",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <VisibilityIcon />
            </IconButton>
          )}
        </Box>

        <CardContent
          className={`flex flex-col gap-2 ${isMobile ? "p-4" : ""}`}
          sx={{
            width: isMobile ? "60%" : "100%",
          }}
        >
          <Typography
            gutterBottom
            variant={isMobile ? "subtitle1" : "h6"}
            component="div"
            sx={{
              fontWeight: 600,
              whiteSpace: isMobile ? "wrap" : "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.name}
          </Typography>

          <div className="flex gap-2 items-center">
            <LocationOnRounded fontSize="small" color="primary" />
            <Typography
              variant="body2"
              sx={{
                width: isMobile ? "95%" : "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "text.secondary",
              }}
            >
              {data.airport}
            </Typography>
          </div>

          <div className="flex gap-2 items-center">
            <PeopleAltRounded fontSize="small" color="primary" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {data.passenger_capacity} passenger
            </Typography>
          </div>
          <div className="flex gap-2 pt-5 items-center">
            <Wifi fontSize="small" color="primary" />
            <SmokingRooms fontSize="small" color="primary" />
            <WcRounded fontSize="small" color="primary" />
          </div>
          <Divider />
        </CardContent>
        {!isMobile && (
          <CardActions className="flex justify-center pb-3">
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "999px" }}
            >
              Book Now
            </Button>
          </CardActions>
        )}
      </Card>
      <ImageDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        images={images}
      />
    </>
  );
};

export default CardComponent;
