"use client";

import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";

interface OTPComponentProps {
  value: string;
  onChange: (otp: string) => void;
  length?: number;
  onComplete?: (otp: string) => void;
}

export default function OTPComponent({
  value,
  onChange,
  length = 4,
  onComplete,
}: OTPComponentProps) {
  return (
    <MuiOtpInput
      value={value}
      onComplete={onComplete}
      onChange={onChange}
      length={length}
    />
  );
}
