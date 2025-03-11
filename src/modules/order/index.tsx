"use client";

import LayoutComponent from "@/components/Layout";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import CustomFormField from "@/components/form/CustomFormField";
import {
  DeleteRounded,
  FlightLandRounded,
  FlightTakeoffRounded,
  GroupRounded,
} from "@mui/icons-material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { airports, tabs } from "./dummy";
import useScreenSize from "@/hooks/useScreenSize";
import dynamic from "next/dynamic";
import SwipeableEdgeDrawer from "@/components/SwipeableEdgeDrawer";

const MapComponent = dynamic(() => import("@/components/Maps"), {
  ssr: false,
});

const formSchema = z.object({
  flights: z.array(
    z.object({
      departure: z.string().min(1, "Departure cannot be empty"),
      arrival: z.string().min(1, "Arrival cannot be empty"),
      flight_date: z.string().min(1, "Date cannot be empty"),
      return_date: z.string().min(1, "Date cannot be empty"),
      passengers: z.string().min(1, "Passengers cannot be empty"),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

const OrderPageModules = () => {
  const R = 6371;
  const { breakpoint } = useScreenSize();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const [zoom, setZoom] = useState(12);

  const [open, setOpen] = useState(false);

  const { control, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flights: [
        {
          departure: "",
          arrival: "",
          flight_date: "",
          passengers: "",
          return_date: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "flights",
  });

  const flights = watch("flights");

  const [coordinates, setCoordinates] = useState<
    Array<{ lat: number; lng: number }>
  >([]);

  useEffect(() => {
    const newCoordinates = flights
      .map((flight) => {
        const depAirport = airports.find((e) => e.value === flight.departure);
        const arrAirport = airports.find((e) => e.value === flight.arrival);
        return [
          depAirport
            ? { lat: depAirport.latitude, lng: depAirport.longitude }
            : null,
          arrAirport
            ? { lat: arrAirport.latitude, lng: arrAirport.longitude }
            : null,
        ];
      })
      .flat()
      .filter(
        (coord) => coord !== null && coord.lat !== 0 && coord.lng !== 0
      ) as { lat: number; lng: number }[];

    if (newCoordinates.length >= 2) {
      let maxDistance = 0;

      // Hitung jarak terbesar di antara semua titik (bounding box)
      for (let i = 0; i < newCoordinates.length; i++) {
        for (let j = i + 1; j < newCoordinates.length; j++) {
          const dep = newCoordinates[i];
          const arr = newCoordinates[j];

          const lat1 = (dep.lat * Math.PI) / 180;
          const lat2 = (arr.lat * Math.PI) / 180;
          const dLat = ((arr.lat - dep.lat) * Math.PI) / 180;
          const dLng = ((arr.lng - dep.lng) * Math.PI) / 180;

          // Haversine formula
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) *
              Math.cos(lat2) *
              Math.sin(dLng / 2) *
              Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Jarak dalam km

          maxDistance = Math.max(maxDistance, distance);
        }
      }

      // Menyesuaikan zoom berdasarkan maxDistance
      const calculatedZoom = Math.max(
        1,
        Math.min(10, 10 - Math.log2(maxDistance / 50 + 1))
      );

      setZoom(calculatedZoom);
    }

    setCoordinates(newCoordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(flights)]);

  return (
    <LayoutComponent classNameChildren="max-h-screen">
      <MapComponent zoom={zoom} coordinates={coordinates} />

      {/* UI Form */}

      <div className="absolute flex gap-2 md:gap-5 flex-col px-2 md:px-10 pb-2 w-screen top-72 justify-center items-center z-[1000]">
        <section className="flex justify-evenly bg-white shadow-2xl rounded-lg w-full md:w-2/3 p-2 border border-gray-200 overflow-hidden">
          {tabs.map((e, i) => (
            <div
              key={i}
              className={twMerge(
                "flex justify-center items-center gap-2 cursor-pointer"
              )}
              onClick={() => {
                setActiveTab(i);
                if (i === 0 || i === 1) {
                  setValue("flights", [
                    {
                      departure: flights[0].departure ?? "",
                      arrival: flights[0].arrival ?? "",
                      flight_date: flights[0].flight_date ?? "",
                      passengers: flights[0].passengers ?? "",
                      return_date: "",
                    },
                  ]);
                }
              }}
            >
              <Image
                src={e.icon}
                height={e.height}
                width={e.widht}
                alt={e.label}
              />
              <Typography
                suppressHydrationWarning
                variant="button"
                className={twMerge(
                  i === activeTab && "text-blue-500 border-b-2 border-blue-500"
                )}
              >
                {breakpoint === "sm" ? e.labelMobile : e.label}
              </Typography>
            </div>
          ))}
        </section>

        <section
          style={{
            maxHeight: height - 380,
          }}
          className="flex overflow-auto flex-col justify-evenly gap-5 md:gap-1 w-full bg-white shadow-2xl rounded-xl border border-gray-200 p-6 md:p-10"
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col md:flex-row items-center gap-2 md:gap-5"
            >
              <CustomFormField
                className="w-full"
                name={`flights.${index}.departure`}
                control={control}
                options={airports.map((e) => ({
                  label: e.label,
                  value: e.value,
                }))}
                label={() => (
                  <div className="flex gap-2">
                    <FlightTakeoffRounded className="text-black" />
                    <p className="text-black font-medium">Departure</p>
                  </div>
                )}
                placeholder="Select departure"
                size={breakpoint === "sm" ? "small" : "medium"}
                type="select"
              />
              <div className="flex w-full md:w-auto justify-center items-center cursor-pointer">
                <Image
                  src={"/assets/svg/cycle.svg"}
                  height={29}
                  width={20}
                  alt={"cycle icon"}
                  className={
                    "bg-[#f9f9f9] rounded-xl p-1 w-7 h-7 hover:bg-gray-200"
                  }
                />
              </div>
              <CustomFormField
                className="w-full"
                name={`flights.${index}.arrival`}
                control={control}
                options={airports.map((e) => ({
                  label: e.label,
                  value: e.value,
                }))}
                label={() => (
                  <div className="flex gap-2">
                    <FlightLandRounded className="text-black" />
                    <p className="text-black font-medium">Arrival</p>
                  </div>
                )}
                placeholder="Select arrival"
                size={breakpoint === "sm" ? "small" : "medium"}
                type="select"
              />

              <CustomFormField
                className="w-full"
                name={`flights.${index}.flight_date`}
                control={control}
                label={() => (
                  <div className="flex gap-2">
                    <CalendarMonthRoundedIcon className="text-black" />
                    <p className="text-black font-medium">Flight Date</p>
                  </div>
                )}
                placeholder="Select flight date"
                size={breakpoint === "sm" ? "small" : "medium"}
                type="date"
              />
              {activeTab === 1 && (
                <CustomFormField
                  className="w-full"
                  name={`flights.${index}.return_date`}
                  control={control}
                  label={() => (
                    <div className="flex gap-2">
                      <CalendarMonthRoundedIcon className="text-black" />
                      <p className="text-black font-medium">Flight Date</p>
                    </div>
                  )}
                  placeholder="Select flight date"
                  size={breakpoint === "sm" ? "small" : "medium"}
                  type="date"
                />
              )}
              <div className="w-full md:w-32">
                <CustomFormField
                  className="w-full"
                  name={`flights.${index}.passengers`}
                  control={control}
                  label={() => (
                    <div className="flex gap-2">
                      <p className="text-black font-medium">Passengers</p>
                    </div>
                  )}
                  labelRequired={false}
                  placeholder="0"
                  size={breakpoint === "sm" ? "small" : "medium"}
                  type="number"
                  slotPropsInput={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <GroupRounded htmlColor="#000000" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
              {fields.length > 1 && (
                <div>
                  <IconButton
                    sx={{
                      color: "black",
                    }}
                    onClick={() => remove(index)}
                  >
                    <DeleteRounded color="error" />
                  </IconButton>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-between">
            {activeTab === 2 ? (
              <div>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "999px",
                  }}
                  color="primary"
                  onClick={() =>
                    append({
                      departure: "",
                      arrival: "",
                      flight_date: "",
                      passengers: "",
                      return_date: "",
                    })
                  }
                >
                  Add Flight
                </Button>
              </div>
            ) : null}
            <Button
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
              color="primary"
              sx={{ borderRadius: "999px" }}
            >
              Find My Flight
            </Button>
          </div>
        </section>
      </div>

      <SwipeableEdgeDrawer open={open} setOpen={setOpen}>
        as
      </SwipeableEdgeDrawer>
    </LayoutComponent>
  );
};

export default OrderPageModules;
