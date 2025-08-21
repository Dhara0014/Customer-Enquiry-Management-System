"use client";

import React, { useState, useEffect } from "react";
import jsPDF  from "jspdf";
import autoTable from "jspdf-autotable";
import useCustomers from "../hooks/useCustomers";
import useEnquiries from "../hooks/useEnquiries";
import Loader from "../components/Loader";
import { ConfirmDialog, EnquiryFilters, EnquiryFormModal, EnquiryTable } from "../components/EnquiryHelper";


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
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearch(filters.search);
  }, 500); // 0.5s delay only for typing search

  return () => clearTimeout(handler);
}, [filters.search]);


  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, item: null });

  // useEffect(() => {
  //   setAllFilters(filters);
  // }, [filters]);

  useEffect(() => {
    setAllFilters({
      ...filters,
      search: debouncedSearch, // only search is delayed
    });
  }, [debouncedSearch, filters.status, filters.priority, filters.customer_id, filters.from, filters.to]);

  const handleCreate = async (values) => {
    try {
      await create({
        ...values,
        expected_closure_date: values?.expected_closure_date || null,
      });
      setShowForm(false);
    } catch (error) {
      alert(error)
    }
  };

  const handleUpdate = async (values) => {
    if (!editItem) return;
    try {
      await update(editItem.id, {
        ...values,
        expected_closure_date: values?.expected_closure_date || null,
      });
      setShowForm(false);
      setEditItem(null);
    } catch (error) {
      alert(error)
    }
  };

  const handleDelete = async (item) => {
    setConfirm({ open: true, item });
  };

  const confirmDelete = async () => {
    if (!confirm.item) return;
    await remove(confirm.item.id);
    setConfirm({ open: false, item: null });
  };

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

    autoTable(doc, {
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

        <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold">Enquiries</h1>
        <div className="flex gap-2">
          <button
            className="rounded-xl border px-4 py-2 hover:bg-gray-50"
            onClick={() =>
              setFilters({ search: "", status: "", priority: "", customer_id: "", from: "", to: "" })
            }
          >
            Reset Filters
          </button>
          <button
            className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 "
            onClick={() => setShowForm(true)}
          >
            + New Enquiry
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <EnquiryFilters filters={filters} onChange={setFilters} customers={customers} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
      {
        loading ? <Loader /> : <EnquiryTable
          data={enquiries}
          loading={loading}
          onEdit={(row) => {
            setEditItem({
              id: row.id,
              customer_id: String(row.customer_id),
              customers: row.customers,
              title: row.title,
              description: row.description,
              priority: row.priority,
              status: row.status,
              expected_closure_date: row.expected_closure_date
                ? row.expected_closure_date.substring(0, 10)
                : "",
            });
            // handleUpdate(row)
            setShowForm(true);
          }}
          onDelete={handleDelete}
          onExportPDF={handleExportPDF}
        />
      }
        
      </div>

      <EnquiryFormModal
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditItem(null);
        }}
        onSubmit={async (values) => {
            if (editItem) {
              await handleUpdate(values);
            } else {
              await handleCreate(values);
            }
          }}
        initialValues={editItem}
        customers={customers.filter(c => c.status === "Active")}
      />

      <ConfirmDialog
        open={confirm.open}
        title="Delete Enquiry"
        description={`Are you sure you want to delete "${confirm.item?.title ?? ""}"? This action cannot be undone.`}
        onCancel={() => setConfirm({ open: false, item: null })}
        onConfirm={confirmDelete}
        confirmText="Delete"
      />
    </div>
    
  );
}
