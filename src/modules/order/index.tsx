"use client";

import LayoutComponent from "@/components/Layout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import "leaflet/dist/leaflet.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import CustomFormField from "@/components/form/CustomFormField";
import { FlightLandRounded, FlightTakeoffRounded } from "@mui/icons-material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { airports } from "./dummy";
import MapComponent from "@/components/Maps";

const formSchema = z.object({
  departure: z.string().min(1, "Departure cannot be empty"),
  arrival: z.string().min(1, "Arrival cannot be empty"),
  date_flight: z.string().min(1, "Date cannot be empty"),
  passengers: z.string().min(1, "Passengers cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;

const OrderPageModules = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [zoom, setZoom] = useState(10);
  const [initialDeparture, setInitialDeparture] = useState({
    lng: 106.6559,
    lat: -6.1256,
  });

  const [initialArrival, setInitialArrival] = useState({ lng: 0, lat: 0 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { handleSubmit, control, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: "",
      arrival: "",
      date_flight: "",
      passengers: "",
    },
  });

  const departureValue = watch("departure");
  const arrivalValue = watch("arrival");

  useEffect(() => {
    const depAirport = airports.find((e) => e.value === departureValue);
    const arrAirport = airports.find((e) => e.value === arrivalValue);

    if (depAirport && arrAirport) {
      const latDiff = depAirport.latitude - arrAirport.latitude;
      const lngDiff = depAirport.longitude - arrAirport.longitude;
      const distance = Math.sqrt(latDiff ** 2 + lngDiff ** 2);

      const calculatedZoom = Math.min(
        10,
        Math.max(5, 8 - Math.log2(distance + 0.01))
      );

      setZoom(calculatedZoom);
      setInitialDeparture({
        lng: depAirport.longitude,
        lat: depAirport.latitude,
      });
      setInitialArrival({
        lng: arrAirport.longitude,
        lat: arrAirport.latitude,
      });
    } else {
      setInitialDeparture({ lng: 106.6559, lat: -6.1256 });
      setInitialArrival({ lng: 0, lat: 0 });
    }
  }, [departureValue, arrivalValue]);

  return (
    <LayoutComponent>
      <Box>
        <MapComponent
          zoom={zoom}
          coordinates={[initialDeparture, initialArrival]}
        />
      </Box>

      {/* UI Form */}
      <div className="absolute flex gap-5 flex-col px-10 w-screen -mt-40 justify-center items-center z-[1000]">
        <section className="flex justify-evenly bg-white shadow-2xl rounded-lg w-2/3 p-1 border border-gray-200 overflow-hidden">
          {["Single Flight", "Round Flight", "Multiple Destinations"].map(
            (label, i) => (
              <div
                key={i}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setActiveTab(i)}
              >
                <Typography
                  variant="button"
                  className={twMerge(
                    i === activeTab &&
                      "text-blue-500 border-b-2 border-blue-500"
                  )}
                >
                  {label}
                </Typography>
              </div>
            )
          )}
        </section>

        <section className="flex justify-evenly gap-5 w-full bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden p-10">
          <CustomFormField
            name="departure"
            control={control}
            options={
              airports.map((e) => {
                return { label: e.label, value: e.value };
              }) ?? []
            }
            label={() => {
              return (
                <div className="flex gap-2">
                  <FlightTakeoffRounded className="text-black" />
                  <p className="text-black font-medium">Departure</p>
                </div>
              );
            }}
            labelRequired={false}
            placeholder="Select departure"
            size="medium"
            type="select"
          />
          <div className="flex items-center cursor-pointer">
            <Image
              src={"/assets/svg/cycle.svg"}
              height={29}
              width={20}
              alt={"cycle icon"}
              className="bg-gray-100 rounded-xl p-1 w-7 h-7 hover:bg-gray-200"
            />
          </div>
          <CustomFormField
            name="arrival"
            options={
              airports.map((e) => {
                return { label: e.label, value: e.value };
              }) ?? []
            }
            control={control}
            label={() => {
              return (
                <div className="flex gap-2">
                  <FlightLandRounded className="text-black" />
                  <p className="text-black font-medium">Arrival</p>
                </div>
              );
            }}
            labelRequired={false}
            placeholder="Select arrival"
            size="medium"
            type="select"
          />
          <CustomFormField
            name="date_flight"
            control={control}
            label={() => {
              return (
                <div className="flex gap-2">
                  <CalendarMonthRoundedIcon className="text-black" />
                  <p className="text-black font-medium">Flight Date</p>
                </div>
              );
            }}
            labelRequired={false}
            placeholder="Select flight date"
            size="medium"
            type="date"
          />
          <CustomFormField
            name="passengers"
            control={control}
            label=""
            labelRequired={false}
            isHeighLable
            placeholder="Select flight date"
            size="medium"
            type="number"
          />
        </section>
      </div>
    </LayoutComponent>
  );
};

export default OrderPageModules;
