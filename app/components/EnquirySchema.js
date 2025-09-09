import z from "zod";


export const EnquirySchema = z.object({
    id: z.number().optional(),
    customer_id: z.string({ required_error: "Customer is required" }).min(1, "Customer is required"),
    title: z
      .string({ required_error: "Title is required" })
      .min(3, "Title must be at least 3 characters")
      .max(120, "Title must be under 120 characters"),
    description: z
      .string({ required_error: "Description is required" })
      .min(3, "Description must be at least 3 characters"),
    priority: z.enum(["Low", "Medium", "High"], { required_error: "Priority is required" }),
    status: z.enum(["Open", "In Progress", "Closed"], { required_error: "Status is required" }),
    expected_closure_date: z.string().optional(),
  });