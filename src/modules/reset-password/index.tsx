"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/form/CustomFormField";
import { motion } from "framer-motion";
import PatternRoundedIcon from "@mui/icons-material/PatternRounded";
import ButtonBack from "@/components/ButtonBack";

const formSchema = z
  .object({
    password: z
      .string()

      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
      })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password cannot be empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const ResetPasswordPageModules = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
  };

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
      <Container maxWidth="xl" className="grid grid-cols-1 md:grid-cols-2">
        <Container className="hidden md:flex flex-col w-full justify-end py-20 gap-4">
          <motion.p className="text-5xl font-extrabold text-white bg-clip-text">
            Fly Beyond Limits
          </motion.p>

          <motion.p className="text-2xl font-medium text-white">
            Exclusive Private Jet Charter for Your Ultimate Freedom.
          </motion.p>
        </Container>
        <div className="flex md:justify-end w-full">
          <Paper
            className="py-5 px-5 md:w-3/4 w-full h-[90vh] md:h-[80vh]"
            sx={{ borderRadius: 5 }}
            elevation={6}
          >
            <ButtonBack hideArrow title="Reset Password" />

            <div className="items-center flex flex-col h-full">
              <PatternRoundedIcon
                sx={{ width: 150, height: 150 }}
                color="primary"
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                color="primary"
                className="mb-2 text-center"
              >
                Create New Password
              </Typography>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full pt-10"
              >
                <CustomFormField
                  labelOutside={false}
                  name="password"
                  control={control}
                  label="New Password"
                  labelRequired
                  type="password"
                  placeholder="Input your password"
                  size="medium"
                />
                <CustomFormField
                  labelOutside={false}
                  name="confirmPassword"
                  control={control}
                  label="Confirm Password"
                  labelRequired
                  type="password"
                  placeholder="Input your confirm password"
                  size="medium"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-4"
                  sx={{ borderRadius: 2 }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </Paper>
        </div>
      </Container>
    </Box>
  );
};

export default ResetPasswordPageModules;
