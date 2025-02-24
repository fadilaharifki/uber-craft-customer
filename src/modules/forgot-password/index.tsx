"use client";

import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/form/CustomFormField";
import { motion } from "framer-motion";
import PatternRoundedIcon from "@mui/icons-material/PatternRounded";
import ButtonBack from "@/components/ButtonBack";
const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Invalid email format"),
  password: z.string().min(1, "Password cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordPageModules = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (e: FormValues) => {
    console.log(e);
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
            <ButtonBack title="Forgot Password" />

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
                Forgot Your Password?
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-4 text-center"
              >
                Enter you e-mail and we’ll help reset your password
              </Typography>
              <div className="flex w-full flex-col pt-10 ">
                <CustomFormField
                  labelOutside={false}
                  name="email"
                  control={control}
                  label="Email"
                  labelRequired
                  type="email"
                  placeholder="Input your email"
                  size="medium"
                />
              </div>

              <Button
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant="contained"
                size="large"
                className="bg-gradient-to-r from-cyan-500 to-blue-500"
                sx={{ borderRadius: 2 }}
              >
                Submit
              </Button>
            </div>
          </Paper>
        </div>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPageModules;
