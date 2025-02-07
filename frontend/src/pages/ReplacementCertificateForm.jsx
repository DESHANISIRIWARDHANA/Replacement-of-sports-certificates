import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";

const schema = z.object({
  eventName: z.string().min(2, "Event Name is required"),
  certificateType: z.string().min(2, "Certificate Type is required"),
  dateOfIssue: z.string().min(1, "Date of Issue is required"),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
});

export default function ReplacementCertificateForm() {
  const [activeTab, setActiveTab] = useState("requestCertificate");
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
      
      
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0" 
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 text-left mt-12">Request a Replacement Certificate</h1>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <div className="flex flex-col items-start">
              <label className="block text-sm font-medium">Event Name</label>
              <input
                {...register("eventName")}
                className="w-full p-2 rounded mt-1 bg-[#B9D8DB]"
              />
              <p className="text-red-500 text-sm">{errors.eventName?.message}</p>
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-sm font-medium">Type of Certificate</label>
              <input
                {...register("certificateType")}
                className="w-full p-2 rounded mt-1 bg-[#B9D8DB]"
              />
              <p className="text-red-500 text-sm">{errors.certificateType?.message}</p>
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-sm font-medium">Date of Issue</label>
              <input
                type="date"
                {...register("dateOfIssue")}
                className="w-1/2 p-2 rounded mt-1 bg-[#B9D8DB]"
              />
              <p className="text-red-500 text-sm">{errors.dateOfIssue?.message}</p>
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-sm font-medium">Reason</label>
              <textarea
                {...register("reason")}
                className="w-full p-2 rounded mt-1 bg-[#B9D8DB]"
              />
              <p className="text-red-500 text-sm">{errors.reason?.message}</p>
            </div>
          </form>
        </div>
        <div className="mt-4 text-right">
          <button className="bg-[#3C9C5121] text-black px-4 py-2 rounded mr-2">Back</button>
          <button className="bg-[#3C9C5154] text-black px-4 py-2 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
