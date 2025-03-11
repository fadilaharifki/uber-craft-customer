"use client";

import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  images: string[];
}

const ImageDialog = ({ open, onClose, images }: ImageDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ position: "relative", p: 0 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
            background: "rgba(0,0,0,0.5)",
            "&:hover": { background: "rgba(0,0,0,0.7)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                width={1000}
                height={1000}
                src={img}
                alt={`Image ${index + 1}`}
                className="w-full aspect-square h-auto object-cover max-h-[80vh] mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
