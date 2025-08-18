"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoMdClose } from "react-icons/io";
import { MdDownload } from "react-icons/md";

import React, { useState, useEffect, useMemo } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import { TbEdit } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import useCustomers from "../hooks/useCustomers";
import useEnquiries from "../hooks/useEnquiries";
import Loader from "../components/Loader";


/**
 * Enquiry Schema (zod)
 */
const EnquirySchema = z.object({
  id: z.string().optional(),
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
  expected_closure_date: z.string().optional().nullable(),
});

function ConfirmDialog({ open, title, description, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel }) {
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

// /**
//  * Enquiry Form Modal (Create / Edit) with zod validation
//  */
function EnquiryFormModal({ open, onClose, onSubmit, initialValues, customers }) {
  
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
      priority: "Medium",
      status: "Open",
      expected_closure_date: "",
    },
  });

  useEffect(() => {
    reset(initialValues ?? {
      customer_id: "",
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
      expected_closure_date: "",
    });
  }, [initialValues, reset, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl animate-fadeIn">
        
        {/* Header */}
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

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-5">
          
          {/* Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <select
              {...register("customer_id")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.customer_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select customer…</option>
              {customers.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name} {c.email ? `(${c.email})` : ""}
                </option>
              ))}
            </select>
            {errors.customer_id && (
              <p className="mt-1 text-xs text-red-600">{errors.customer_id.message}</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="e.g., Website redesign inquiry"
              {...register("title")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Describe the enquiry…"
              {...register("description")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                {...register("priority")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Expected Closure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Closure Date</label>
            <input
              type="date"
              {...register("expected_closure_date")}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.expected_closure_date ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Actions */}
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

// /**
//  * Filters panel (reusable)
//  */
function EnquiryFilters({ filters, onChange, customers }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
      <input
        type="text"
        placeholder="Search title…"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
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

// /**
//  * Table wrapper (react-data-table-component)
//  */
function EnquiryTable({ data, onEdit, onDelete, onExportPDF, loading }) {
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
        // allowOverflow: true,
        // button: true,
      },
    ],
    [onDelete, onEdit, onExportPDF]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      highlightOnHover
      dense
      persistTableHead
    />
  );
}





export default function Page() {
  const { customers } = useCustomers();

  const {
    enquiries,
    loading,
    error,
    setAllFilters ,
    create, update, remove
  } = useEnquiries();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    customer_id: "",
    from: "",
    to: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, item: null });

  // ✅ Fetch enquiries whenever filters change
  // useEffect(() => {
  //   fetchEnquiries(filters);
  // }, [filters, fetchEnquiries]);

  // const applyFilters = () => setAllFilters(filters);
  useEffect(() => {
    setAllFilters(filters);
  }, [filters]);

  // ✅ Create handler
  const handleCreate = async (values) => {
    await create({
      ...values,
      expected_closure_date: values.expected_closure_date || null,
    });
    setShowForm(false);
  };

  // ✅ Update handler
  const handleUpdate = async (values) => {
    if (!editItem) return;
    await update(editItem.id, {
      ...values,
      expected_closure_date: values.expected_closure_date || null,
    });
    setShowForm(false);
    setEditItem(null);
  };

  // ✅ Delete handler
  const handleDelete = async (item) => {
    setConfirm({ open: true, item });
  };

  const confirmDelete = async () => {
    if (!confirm.item) return;
    await remove(confirm.item.id);
    setConfirm({ open: false, item: null });
  };

  // ✅ Export to PDF
  const handleExportPDF = (row) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Enquiry Details", 14, 16);

    const lines = [
      ["Title", row.title],
      ["Customer", row.customers?.name || "—"],
      ["Email", row.customers?.email || "—"],
      ["Priority", row.priority],
      ["Status", row.status],
      ["Expected Closure", row.expected_closure_date ? new Date(row.expected_closure_date).toLocaleDateString() : "—"],
      ["Created", new Date(row.created_at).toLocaleString()],
    ];

    doc.autoTable({
      head: [["Field", "Value"]],
      body: lines,
      startY: 22,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [33, 150, 243] },
    });

    const yAfter = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text("Description:", 14, yAfter);
    doc.setFontSize(10);
    const splitDesc = doc.splitTextToSize(row.description || "—", 180);
    doc.text(splitDesc, 14, yAfter + 6);

    doc.save(`enquiry_${row.id}.pdf`);
  };

  return (
    <>
      {
        loading ? <Loader /> : 
        <div className="mx-auto max-w-7xl p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Enquiries</h1>
        <div className="flex gap-2">
          {/* <button
            className="rounded-xl border px-4 py-2 hover:bg-gray-50"
            onClick={applyFilters}
          >
            Apply Filters
          </button> */}
          <button
            className="rounded-xl border px-4 py-2 hover:bg-gray-50"
            onClick={() =>
              setFilters({ search: "", status: "", priority: "", customer_id: "", from: "", to: "" })
            }
          >
            Reset Filters
          </button>
          <button
            className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            New Enquiry
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <EnquiryFilters filters={filters} onChange={setFilters} customers={customers} />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
        <EnquiryTable
          data={enquiries}
          loading={loading}
          onEdit={(row) => {
            setEditItem({
              id: row.id,
              customer_id: String(row.customer_id),
              title: row.title,
              description: row.description,
              priority: row.priority,
              status: row.status,
              expected_closure_date: row.expected_closure_date
                ? row.expected_closure_date.substring(0, 10)
                : "",
            });
            setShowForm(true);
          }}
          onDelete={handleDelete}
          onExportPDF={handleExportPDF}
        />
      </div>

      {/* Create / Edit Modal */}
      <EnquiryFormModal
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditItem(null);
        }}
        onSubmit={(values) => (editItem ? handleUpdate(values) : handleCreate(values))}
        initialValues={editItem}
        customers={customers.filter(c => c.status === "Active")}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={confirm.open}
        title="Delete Enquiry"
        description={`Are you sure you want to delete "${confirm.item?.title ?? ""}"? This action cannot be undone.`}
        onCancel={() => setConfirm({ open: false, item: null })}
        onConfirm={confirmDelete}
        confirmText="Delete"
      />
    </div>
      }
    </>
  );
}
