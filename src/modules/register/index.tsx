/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button, Container, Step, StepLabel, Stepper } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "@/components/form/CustomFormField";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ButtonBack from "@/components/ButtonBack";

const formSchema = z.object({
  first_name: z.string().min(1, "First Name cannot be empty"),
  last_name: z.string().min(1, "Last Name cannot be empty"),
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .email("Invalid email format"),
  address: z.string().min(1, "Address cannot be empty"),
  phone_number: z.string().min(1, "Address cannot be empty"),
});

const bankInfoSchema = z.object({
  avatar: z.string(),
  bank_code: z.string().min(1, "Bank Code cannot be empty"),
  account_number: z.string().min(1, "Accoun Number cannot be empty"),
  name_account: z.string().min(1, "Name Account cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;
type FormValuesBankInfo = z.infer<typeof bankInfoSchema>;

const bankCodes = [
  { value: "BNI", label: "Bank Negara Indonesia" },
  { value: "BCA", label: "Bank Central Asia" },
  { value: "Mandiri", label: "Bank Mandiri" },
  { value: "BRI", label: "Bank Rakyat Indonesia" },
  { value: "Danamon", label: "Bank Danamon" },
  { value: "CIMB", label: "CIMB Niaga" },
  { value: "Permata", label: "Bank Permata" },
  { value: "BNI Syariah", label: "Bank Negara Indonesia Syariah" },
  { value: "Mandiri Syariah", label: "Bank Syariah Mandiri" },
  { value: "BTN", label: "Bank Tabungan Negara" },
];

const RegisterPageModules = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone_number: "+62",
    },
  });

  const {
    handleSubmit: handleSubmitBankIndo,
    control: controlBankInfo,
    watch,
  } = useForm<FormValuesBankInfo>({
    resolver: zodResolver(bankInfoSchema),
    defaultValues: {
      avatar: "",
      bank_code: "",
      account_number: "",
      name_account: "",
    },
  });

  const onSubmit = (e: FormValues) => {
    console.log(e);
  };

  const steps = ["Personal Info", "Bank Info"];

  const Step1 = () => {
    return (
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <CustomFormField
          name="first_name"
          control={control}
          label="First Name"
          labelRequired
          placeholder="Input your first name"
          size="medium"
        />
        <CustomFormField
          name="last_name"
          control={control}
          label="Last Name"
          labelRequired
          placeholder="Input your last name"
          size="medium"
        />
        <CustomFormField
          name="email"
          control={control}
          label="Email"
          labelRequired
          type="email"
          placeholder="Input your email"
          size="medium"
        />
        <CustomFormField
          name="address"
          control={control}
          label="Address"
          labelRequired
          placeholder="Input your address"
          size="medium"
        />
        <CustomFormField
          name="phone_number"
          control={control}
          label="Phone Number"
          labelRequired
          type="phone_number"
          placeholder="Input your phone number"
          size="medium"
        />
      </Container>
    );
  };

  const Step2 = () => {
    return (
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <CustomFormField
          name="bank_code"
          control={controlBankInfo}
          label="Bank"
          type="select"
          options={bankCodes}
          labelRequired
          placeholder="Select your bank"
          size="medium"
        />
        <CustomFormField
          name="account_number"
          control={controlBankInfo}
          label="Account Number"
          labelRequired
          placeholder="Input your account number"
          size="medium"
        />
        <CustomFormField
          name="name_account"
          control={controlBankInfo}
          label="Name Account"
          labelRequired
          placeholder="Input your name account"
          size="medium"
        />
      </Container>
    );
  };

  const StepperScreen = (active: number) => {
    switch (active) {
      case 1:
        return <Step2 />;

      default:
        return <Step1 />;
    }
  };

  return (
    <Container className="flex flex-col py-5">
      <ButtonBack title="Register" />

      <div className="flex flex-col w-full">
        <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <Container className="flex justify-center py-5">
          <CustomFormField
            name="avatar"
            labelOutside={false}
            control={controlBankInfo}
            label="Avatar"
            type="avatar"
            labelRequired
            size="small"
          />
        </Container>
        {StepperScreen(activeStep)}
      </div>
      <Container className="md:fixed bottom-2 md:bottom-0 w-full flex justify-between pb-10 md:py-10">
        <div>
          <AnimatePresence mode="wait">
            {activeStep > 0 && (
              <motion.div
                key="back-button"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Button
                  onClick={() => setActiveStep(activeStep - 1)}
                  fullWidth
                  variant="contained"
                  size="large"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                  sx={{ borderRadius: 2 }}
                >
                  Back
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <Button
            onClick={() => {
              if (activeStep === steps.length - 1) {
                // Logic Register
              } else {
                setActiveStep(activeStep + 1);
              }
            }}
            fullWidth
            variant="contained"
            size="large"
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
            sx={{ borderRadius: 2 }}
          >
            {activeStep === steps.length - 1 ? "Register" : "Next"}
          </Button>
        </div>
      </Container>
    </Container>
  );
};

export default RegisterPageModules;
