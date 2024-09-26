/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CustomFormField from "../CustomFormField";
import { RegisterFormValidation } from "@/lib/validation";
import Container from "@/layout/Container/Container";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import BackToHome from "../BackToHome";
import useAxiosPublic from "@/hooks/AxiosPublic";
import { useDropzone } from "react-dropzone";
import { useState } from "react"; // Import useState to manage the image file
import { Loader } from "lucide-react";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "text_area",
  PHONE_INPUT = "phone_input",
  SELECT = "select",
}

const RegisterForm = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const [photo, setPhoto] = useState<File | null>(null); // State to store the selected photo
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // State for photo preview

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPhoto(acceptedFiles[0]); // Set the first accepted file as the photo
      setPhotoPreview(URL.createObjectURL(acceptedFiles[0])); // Create a preview URL
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof RegisterFormValidation>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (photo) {
      formData.append("image", photo); // Append the photo to FormData
    }

    try {
      const response = await axios.post("/user/register", formData);
      toast.success("Register Successful");
      console.log(response);
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1, // Limit to a single file
  });

  return (
    <Container className="flex justify-center items-center h-screen relative">
      <BackToHome />
      <div className="mx-auto w-full max-w-xl space-y-8 rounded-lg border bg-white p-10 shadow-lg sm:p-20 dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-6 flex-1", className)}
          >
            <CustomFormField
              label="Name"
              control={form.control}
              className="rounded-none"
              fieldType={FormFieldType.INPUT}
              name="name"
              placeholder="Enter Your Name"
              iconAlt="user"
            />
            <CustomFormField
              label="Email"
              control={form.control}
              className="rounded-none"
              fieldType={FormFieldType.INPUT}
              name="email"
              placeholder="Enter Your Email"
              iconAlt="email"
            />
            <CustomFormField
              label="Password"
              control={form.control}
              className="rounded-none"
              fieldType={FormFieldType.INPUT}
              name="password"
              placeholder="Enter Your Password"
              iconAlt="password"
            />
            {/* Dropzone for image upload */}
            <div>
              <label htmlFor="photo" className="font-medium">
                Photo
              </label>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-300 p-4 rounded"
              >
                <input {...getInputProps()} />
                {photo && (
                  <div className="flex justify-center">
                    <img
                      src={photoPreview!}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded mt-2"
                    />
                  </div>
                )}
                <p className="text-center">
                  Drag 'n' drop your photo here, or click to select one
                </p>
              </div>
            </div>
            <Button
              disabled={loading}
              className="mt-4 bg-primary mx-auto lg:mx-0 w-full"
            >
              Register {loading && <Loader className="ml-2 animate-spin" />}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
          Don&apos;t have an account?
          <Link to="/login" className="font-semibold underline">
            Sign In
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default RegisterForm;
