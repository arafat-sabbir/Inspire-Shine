import { Input } from "@/components/ui/input";
import useAxiosSecure from "@/hooks/AxiosSecure";
import { selectCurrentUser, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface ProfileFormValues {
  name: string;
  address: string;
  phone: string;
}

const Profile = () => {
  const axios = useAxiosSecure();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch()

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize React Hook Form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user?.name || "",
      address: user?.address || "",
      phone: user?.phone || "",
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/auth/update-user/${user?._id}`, data);
      dispatch(setUser({ user:response?.data?.data }));
      toast.success(response?.data?.message);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600">Name</label>
          <Input
            type="text"
            {...register("name", { required: "Name is required" })}
            disabled={!isEditing}
            className={`p-3 border rounded-lg ${isEditing ? "border-blue-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        {/* Email (non-editable) */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600">Email</label>
          <Input
            type="email"
            defaultValue={user?.email || ""}
            disabled
            className="p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600">Phone</label>
          <Input
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            disabled={!isEditing}
            className={`p-3 border rounded-lg ${isEditing ? "border-blue-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600">Address</label>
          <Input
            type="text"
            {...register("address", { required: "Address is required" })}
            disabled={!isEditing}
            className={`p-3 border rounded-lg ${isEditing ? "border-blue-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}
        </div>

        {/* User Since */}
        <div className="flex flex-col">
          <label className="font-semibold text-gray-600">User Since</label>
          <Input
            type="text"
            defaultValue={new Date(user?.createdAt).toLocaleDateString() || ""}
            disabled
            className="p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Edit Button */}
        {isEditing ? (
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        ) : (
          <div
            onClick={handleEditClick}
            className="py-2 px-6 mt-4 text-center bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Edit
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
