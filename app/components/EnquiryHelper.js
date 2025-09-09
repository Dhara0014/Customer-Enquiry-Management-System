import { FaRegTrashAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdClose } from "react-icons/io";
import { MdDownload } from "react-icons/md";
import { useEffect, useMemo } from "react";
import { EnquirySchema } from "./EnquirySchema";


  
  export function ConfirmDialog({ open, title, description, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button className="rounded-xl border px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={onCancel}>
              {cancelText}
            </button>
            <button className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700" onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export function EnquiryFormModal({ open, onClose, onSubmit, initialValues, customers }) {
    
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm({
      resolver: zodResolver(EnquirySchema),
      defaultValues: initialValues ?? {
        customer_id: "",
        title: "",
        description: "",
        priority: "Low",
        status: "Open",
        expected_closure_date: "",
      },
    });
  
    useEffect(() => {
      reset(initialValues ?? {
        customer_id: "",
        title: "",
        description: "",
        priority: "Low",
        status: "Open",
        expected_closure_date: "",
      });
    }, [initialValues, reset, open]);
  
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl animate-fadeIn">
          
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {initialValues?.id ? "Edit Enquiry" : "Create Enquiry"}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
            >
              <IoMdClose className="text-xl" />
            </button>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <select
                {...register("customer_id")}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.customer_id ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select customer…</option>
                {customers.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.customer_id && (
                <p className="mt-1 text-xs text-red-600">{errors.customer_id.message}</p>
              )}
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g., Website redesign inquiry"
                {...register("title")}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Describe the enquiry…"
                {...register("description")}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
              )}
            </div>
  
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  {...register("priority")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Closure Date</label>
              <input
                type="date"
                {...register("expected_closure_date")}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.expected_closure_date ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
            </div>
  
            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 disabled:opacity-50"
              >
                {initialValues?.id ? "Save Changes" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export function EnquiryFilters({ filters, onChange, customers }) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        <input
          type="text"
          placeholder="Search title…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value }) }
          className="rounded-xl border border-gray-300 px-3 py-2"
        />
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="rounded-xl border border-gray-300 px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value })}
          className="rounded-xl border border-gray-300 px-3 py-2"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={filters.customer_id}
          onChange={(e) => onChange({ ...filters, customer_id: e.target.value })}
          className="rounded-xl border border-gray-300 px-3 py-2"
        >
          <option value="">All Customers</option>
          {customers.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filters.from}
          onChange={(e) => onChange({ ...filters, from: e.target.value })}
          className="rounded-xl border border-gray-300 px-3 py-2"
        />
        <input
          type="date"
          value={filters.to}
          onChange={(e) => onChange({ ...filters, to: e.target.value })}
          className="rounded-xl border border-gray-300 px-3 py-2"
        />
      </div>
    );
  }
  
  export function EnquiryTable({ data, onEdit, onDelete, onExportPDF, loading }) {
    const customStyles = {
        rows: {
          style: {
            minHeight: "48px",
          },
        },
        headCells: {
          style: {
            paddingLeft: "12px",
            paddingRight: "12px",
            backgroundColor: "#f3f4f6",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#374151",
          },
        },
        cells: {
          style: {
            paddingLeft: "12px",
            paddingRight: "12px",
            fontSize: "15px",
          },
        },
      };
    const columns = useMemo(
      () => [
        {
          name: "Title",
          selector: (row) => row.title,
          sortable: true,
          wrap: true,
        },
        {
          name: "Customer",
          selector: (row) =>
          row.customers
            ? `${row.customers.name}${row.customers.email ? ` (${row.customers.email})` : ""}`
            : "—",
        sortable: true,
        wrap: true,
        },
        {
          name: "Priority",
          selector: (row) => row.priority,
          sortable: true,
        },
        {
          name: "Status",
          selector: (row) => row.status,
          sortable: true,
        },
        {
          name: "Expected Closure",
          selector: (row) => row.expected_closure_date ? new Date(row.expected_closure_date).toLocaleDateString() : "—",
          sortable: true,
        },
        {
          name: "Created",
          selector: (row) => new Date(row.created_at).toLocaleDateString(),
          sortable: true,
        },
        {
          name: "Actions",
          cell: (row) => (
            <div className="flex items-center gap-1 py-2">
              <button className="rounded-lg text-green-700 px-2 py-2 text-lg " onClick={() => onEdit(row)}>
              <TbEdit />
              </button>
              
              <button className="rounded-lg px-2 py-2 text-lg text-red-700" onClick={() => onDelete(row)}>
              <FaRegTrashAlt />
              </button>
              <button className="rounded-lg text-gray-700 px-2 py-2 text-lg" onClick={() => onExportPDF(row)}>
                <MdDownload />
              </button>
            </div>
          ),
          ignoreRowClick: true,
        },
      ],
      [onDelete, onEdit, onExportPDF]
    );
  
    return (
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        customStyles={customStyles}
        pagination
        highlightOnHover
      />
    );
  }