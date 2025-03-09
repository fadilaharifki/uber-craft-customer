"use client";

import { toast } from "sonner";
import {
  CheckCircle,
  Error,
  Info,
  Warning,
  Notifications,
} from "@mui/icons-material";
import { JSX } from "react";

type ToastType = "success" | "error" | "info" | "warning" | "custom";
type CustomOptions = Parameters<typeof toast>[1] & { icon?: JSX.Element };

const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType = "success",
    options: CustomOptions = {}
  ) => {
    const defaultIcons = {
      success: <CheckCircle className="text-green-500" />,
      error: <Error className="text-red-500" />,
      info: <Info className="text-blue-500" />,
      warning: <Warning className="text-yellow-500" />,
      custom: <Notifications className="text-purple-500" />,
    };

    toast(message, {
      icon: options.icon || defaultIcons[type],
      position: options.position || "top-center",
      ...options,
    });
  };

  return { showToast };
};

export default useToast;
