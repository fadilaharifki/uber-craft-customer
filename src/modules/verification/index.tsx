"use client";

import {
  Box,
  Card,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAuthStore } from "@/stores/AuthStore";
import { ChevronRight, Email } from "@mui/icons-material";
import ButtonBack from "@/components/ButtonBack";
import { useRouter } from "next/navigation";
import { useState } from "react";
import theme from "@/theme";
import OTPComponent from "@/components/OTPComponent";

const VerificationPageModules = () => {
  const router = useRouter();
  const { email } = useAuthStore();

  const [isOtp, setIsOtp] = useState(false);

  const [otp, setOtp] = useState("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/assets/images/image-aircraft.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scaleX(-1)",
          zIndex: -1,
        },
      }}
    >
      {isOtp ? (
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 4,
            p: 3,
          }}
        >
          <ButtonBack
            onClick={() => {
              if (isOtp) {
                setIsOtp(false);
              } else {
                router.back();
              }
            }}
            title="Verification"
          />
          <Typography
            variant="h6"
            component="p"
            color="primary"
            sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
          >
            OTP Verification
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            The verification code has been sent via e-mail to {email}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", mb: 4, color: "text.secondary" }}
          >
            Please check your inbox and insert the code in form below to verify
            your email.
          </Typography>

          <div className="flex justify-center">
            <div className="md:w-1/2 ">
              <OTPComponent value={otp} onChange={setOtp} />
            </div>
          </div>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", mt: 5, color: "text.secondary" }}
          >
            Didn’t receive OTP code?
          </Typography>
          <Link
            href="#"
            sx={{
              display: "block",
              fontSize: 14,
              textAlign: "center",
              color: theme.palette.primary.main,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Resend Code
          </Link>
        </Card>
      ) : (
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 4,
            p: 3,
          }}
        >
          <ButtonBack title="Verification" />

          <Typography
            variant="h6"
            component="p"
            color="primary"
            sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
          >
            Choose a Verification Method
          </Typography>

          <Typography
            sx={{ textAlign: "center", mb: 4, color: "text.secondary" }}
          >
            Select one of the methods below to receive your verification code.
          </Typography>

          <ListItemButton
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              mb: 3,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
            onClick={() => {
              setIsOtp(true);
            }}
          >
            <ListItemIcon>
              <Email sx={{ color: "#2563eb" }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box
                  className="grid md:flex grid-cols-1 md:grid-cols-none"
                  component="span"
                >
                  <Typography component="span" sx={{ mr: 1 }}>
                    Via E-mail to
                  </Typography>
                  <Typography component="span" sx={{ fontWeight: "medium" }}>
                    {email}
                  </Typography>
                </Box>
              }
            />
            <ChevronRight sx={{ color: "action.active" }} />
          </ListItemButton>

          <Link
            href="#"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#2563eb",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            My e-mail is no longer active
          </Link>
        </Card>
      )}
    </Box>
  );
};

export default VerificationPageModules;
