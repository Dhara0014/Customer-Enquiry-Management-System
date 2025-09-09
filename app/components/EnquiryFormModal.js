import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const enquirySchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["open", "in_progress", "closed"]),
  priority: z.enum(["low", "medium", "high"]),
  customer_id: z.string().min(1, "Customer is required"),
  expected_closure_date: z.string().nullable().optional(),
});

const EnquiryFormModal = ({ show, onClose, onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      status: "open",
      priority: "medium",
      customer_id: "",
      expected_closure_date: null,
    },
  });

  useEffect(() => {
    if (show) {
      reset(initialData || {
        title: "",
        description: "",
        status: "open",
        priority: "medium",
        customer_id: "",
        expected_closure_date: null,
      });
    }
  }, [show, initialData, reset]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Enquiry" : "New Enquiry"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input {...register("title")} className="border p-2 w-full rounded" />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea {...register("description")} className="border p-2 w-full rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Status</label>
              <select {...register("status")} className="border p-2 w-full rounded">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Priority</label>
              <select {...register("priority")} className="border p-2 w-full rounded">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium">Customer ID</label>
            <input {...register("customer_id")} className="border p-2 w-full rounded" />
            {errors.customer_id && (
              <p className="text-red-500">{errors.customer_id.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Expected Closure Date</label>
            <input type="date" {...register("expected_closure_date")} className="border p-2 w-full rounded" />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryFormModal;
