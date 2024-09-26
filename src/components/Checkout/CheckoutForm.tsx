"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { SelectItem } from "../ui/select";
import { CheckoutFormValidation } from "@/lib/validation";
import CustomFormField from "../CustomFormField";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "text_area",
  PHONE_INPUT = "phone_input",
  SELECT = "select",
}
const CheckoutForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: any;
  loading: boolean;
}) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [city, setSelectedCity] = useState("");
  const form = useForm<z.infer<typeof CheckoutFormValidation>>({
    resolver: zodResolver(CheckoutFormValidation),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      region: "",
      city: "",
      area: "",
      address: "",
      buildingNo: "",
    },
  });

  const regions = [
    {
      name: "chattogram",
      city: ["bandarban", "comilla"],
    },
    {
      name: "dhaka",
      city: ["faridpur", "gazipur"],
    },
    {
      name: "khulna",
      city: ["bagerhat", "jashore"],
    },
    {
      name: "mymensingh",
      city: ["jamalpur", "madaripur"],
    },
  ];
  const areas = [
    {
      name: "comilla",
      area: ["debidwar", "homna"],
    },
    {
      name: "faridpur",
      area: ["jamalpur", "tamalpur"],
    },
  ];

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    form.setValue("city", "");
    form.setValue("area", "");
  };
  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    form.setValue("area", "");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <h1 className="text-center text-xl font-bai">
          Add New Shipping Address
        </h1>
        <div className="grid grid-cols-2 justify-center items-center gap-4">
          <CustomFormField
            className="placeholder:text-[15px]"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="fullName"
            required={true}
            label="Full Name"
            placeholder="Enter Full Name"
            iconAlt="user"
          />
          <CustomFormField
            className="placeholder:text-[15px]"
            control={form.control}
            required={true}
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="Enter Your Email"
          />
          <CustomFormField
            className="placeholder:text-[15px]"
            control={form.control}
            required={true}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone"
            placeholder="Enter Your Email"
            iconAlt="email"
          />
          <CustomFormField
            className="placeholder:text-[15px]"
            onChange={handleRegionChange}
            fieldType={FormFieldType.SELECT}
            control={form.control}
            required={true}
            name="region"
            label="Region"
            placeholder="Select a Region"
          >
            {regions.map((region, i) => (
              <SelectItem key={region.name + i} value={region.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p className="capitalize">{region.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            className="placeholder:text-[15px]"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            required={true}
            label="Address"
            placeholder="Example: House# 39, Street# 432 ,CDA Road"
            iconAlt="user"
          />
          <CustomFormField
            className="placeholder:text-[15px]"
            fieldType={FormFieldType.SELECT}
            onChange={handleCityChange}
            control={form.control}
            required={true}
            name="city"
            label="City"
            disabled={!selectedRegion}
            placeholder="Select a City"
          >
            {regions
              .find((r) => r.name === selectedRegion)
              ?.city?.map((city, i) => (
                <SelectItem key={city + i} value={city}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p className="capitalize">{city}</p>
                  </div>
                </SelectItem>
              ))}
          </CustomFormField>
          <CustomFormField
            className="placeholder:text-[15px]"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="buildingNo"
            required={true}
            label="Building / House No / Floor / Street"
            placeholder="Example: Building# 25, Floor# 2Fa"
            iconAlt="user"
          />
          <CustomFormField
            className="placeholder:text-[15px]"
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="area"
            required={true}
            label="Area"
            disabled={!city}
            placeholder="Select Your Area"
          >
            {areas
              .find((r) => r.name === city)
              ?.area?.map((area, i) => (
                <SelectItem key={area + i} value={area}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p className="capitalize">{area}</p>
                  </div>
                </SelectItem>
              ))}
          </CustomFormField>
        </div>
        <Button
          disabled={loading}
          className="mt-4 bg-primary mx-auto lg:mx-0 w-full"
        >
          {loading ? (
            <>
              Adding <Loader className="animate-spin ml-2 " />
            </>
          ) : (
            <>Add New Address</>
          )}
        </Button>
      </form>
    </Form>
  );
};
export default CheckoutForm;
