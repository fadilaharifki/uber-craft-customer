"use client";

import Image from "next/image";
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/form/CustomFormField";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Invalid email format"),
  password: z.string().min(1, "Password cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPageModules = () => {
  const router = useRouter();

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
          backgroundImage: "url('/assets/images/image-aircraft.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scaleX(-1)",
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="xl" className="grid grid-cols-2">
        <Container className="flex flex-col w-full justify-end py-20 gap-4">
          <motion.p
            className="text-5xl font-extrabold text-white bg-clip-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Fly Beyond Limits
          </motion.p>

          <motion.p
            className="text-2xl font-medium text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            Exclusive Private Jet Charter for Your Ultimate Freedom.
          </motion.p>
        </Container>
        <Container className="flex justify-end w-full">
          <Paper
            className="p-10 w-3/4 h-[80vh]"
            sx={{ borderRadius: 5 }}
            elevation={6}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              className="mb-2 text-center"
            >
              Hello!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="mb-4 text-center"
            >
              Sign in to your account
            </Typography>
            <div className="flex flex-col py-10 ">
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

              <CustomFormField
                labelOutside={false}
                name="password"
                control={control}
                label="Password"
                labelRequired
                type="password"
                size="medium"
                placeholder="Input your password"
              />
            </div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className="my-2"
            >
              <Box display="flex" alignItems="center">
                <Checkbox color="primary" />
                <Typography variant="body2">Remember me</Typography>
              </Box>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              onClick={handleSubmit(onSubmit)}
              fullWidth
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-cyan-500 to-blue-500"
              sx={{ borderRadius: 2 }}
            >
              Sign in
            </Button>

            <Box display="flex" justifyContent="center" mt={3} gap={2}>
              <IconButton>
                <Image
                  src="/assets/images/google.png"
                  alt="Google login"
                  width={40}
                  height={40}
                  className="cursor-pointer"
                />
              </IconButton>
            </Box>

            <Typography textAlign="center" mt={2} variant="body2">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  router.push("/register");
                }}
                className="text-blue-500 font-bold cursor-pointer"
              >
                Create
              </span>
            </Typography>
          </Paper>
        </Container>
      </Container>
    </Box>
  );
};

export default LoginPageModules;
