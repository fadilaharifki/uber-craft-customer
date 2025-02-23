"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@mui/material";
import CustomFormField from "@/components/form/CustomFormField";

const formSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  price: z.string().min(1, "Harga tidak boleh kosong"),
  category: z.string().min(1, "Pilih kategori"),
  date: z.string().min(1, "Select Date"),
});

type FormValues = z.infer<typeof formSchema>;

const Form = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      price: "",
      category: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto p-4 bg-white shadow-md rounded-lg space-y-4 w-screen"
    >
      {/* Nama */}
      <CustomFormField
        labelOutside={false}
        name="name"
        control={control}
        label="Nama"
        // labelRequired
        placeholder="Masukkan nama"
      />

      {/* Email */}
      <CustomFormField
        name="email"
        control={control}
        label="Email"
        labelRequired
        type="email"
        placeholder="Masukkan email"
      />

      {/* Harga (Currency) */}
      <CustomFormField
        labelOutside={false}
        name="price"
        control={control}
        label="Harga"
        // labelRequired
        type="currency"
        placeholder="Masukkan harga"
      />

      {/* Date */}
      <CustomFormField
        // labelOutside={false}
        name="date"
        control={control}
        label="Harga"
        // labelRequired
        dateIcon={false}
        type="date"
        placeholder="Masukkan harga"
      />

      {/* Kategori (Select) */}
      <CustomFormField
        labelOutside={false}
        name="category"
        control={control}
        label="Kategori"
        labelRequired
        type="select"
        options={[
          { label: "Elektronik", value: "elektronik" },
          { label: "Pakaian", value: "pakaian" },
          { label: "Makanan", value: "makanan" },
        ]}
        placeholder="Pilih kategori"
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default Form;
