import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar"; 

const schema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  facultyName: z.string().min(2, "Faculty Name is required"),
  studentId: z.string().min(1, "Student ID is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

export default function StudentDetailsForm() {

  const [activeTab, setActiveTab] = useState("personalDetails");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex h-screen">
      {isSidebarOpen && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
        
     
      <div className="flex-1 p-6 ">

      <h1 className="text-2xl font-bold mb-4 text-left mt-12">Student Details</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-start">
          <label className="block text-sm font-medium text-left">Full Name</label>
          <input
            {...register("fullName")}
            className="w-full border p-2 rounded mt-1 text-left bg-blue-100"
          />
          <p className="text-red-500 text-sm text-left">{errors.fullName?.message}</p>
        </div>
        <div className="flex flex-col items-start">
          <label className="block text-sm  font-medium text-left">Faculty Name</label>
          <input
            {...register("facultyName")}
            className="w-full border p-2 rounded mt-1 text-left bg-blue-100"
          />
          <p className="text-red-500 text-sm text-left">{errors.facultyName?.message}</p>
        </div>
        <div className="flex flex-col items-start">
          <label className="block text-sm font-medium font-left">Student ID</label>
          <input {...register("studentId")} className="w-full border p-2 rounded mt-1 bg-blue-100" />
          <p className="text-red-500 text-sm text-left">{errors.studentId?.message}</p>
        </div>
        <div className="flex flex-col items-start">
          <label className="block text-sm font-medium font-left">Date of Birth</label>
          <input type="date" {...register("dateOfBirth")} className="w-full border p-2 rounded mt-1 text-left bg-blue-100"
          max={new Date().toISOString().split("T")[0]}  />
          <p className="text-red-500 text-left">{errors.dateOfBirth?.message}</p>
        </div>
        <div className="col-span-2 flex flex-col items-start">
          <label className="block text-sm font-medium font-left">Address</label>
          <textarea {...register("address")} className="w-full border p-2 rounded mt-1 text-left bg-blue-100" />
          <p className="text-red-500 text-sm text-left">{errors.address?.message}</p>
        </div>
        <div className="flex flex-col items-start">
          <label className="block text-sm font-medium text-left">Email</label>
          <input type="email" {...register("email")} className="w-full border p-2 rounded mt-1 text-left bg-blue-100" />
          <p className="text-red-500 text-sm text-left">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col items-start">
          <label className="block text-sm font-medium text-left">Phone Number</label>
          <input {...register("phoneNumber")} className="w-full border p-2 rounded mt-1 text-left bg-blue-100" />
          <p className="text-red-500 text-sm text-left">{errors.phoneNumber?.message}</p>
        </div>
      </form>
    </div>
    <div className="mt-4 text-right">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded">Save</button>
        </div>
    </div>
    </div>
  );
}
