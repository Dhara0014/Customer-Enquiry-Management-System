
"use client";
import React, { useState, useEffect } from "react";
import TableComponent from "../components/TableComponent";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import useCustomers from "../hooks/useCustomers";
import Loader from '../components/Loader';

const page = () => {
  const { customers, loading, create, update, remove, error } = useCustomers();


  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    status: "Active",
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Company", selector: (row) => row.company },
    { name: "Address", selector: (row) => row.address },
    { name: "Status", selector: (row) => row.status },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-lg text-blue-700 rounded"
            onClick={() => handleEdit(row)}
          >
            <TbEdit />
          </button>
          <button
            className="px-3 py-1 text-lg text-red-700 rounded"
            onClick={() => setDeleteConfirm(row.id)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setFormData(customer);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditCustomer(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }

    if (editCustomer) {
      await update(editCustomer.id, formData);
    } else {
      await create(formData);
    }

    setShowModal(false);
    setEditCustomer(null);
  };

  const confirmDelete = async () => {
    await remove(deleteConfirm);
    setDeleteConfirm(null);
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") {
      setFilteredCustomers(customers);
    } else {
      setFilteredCustomers(
        customers.filter(
          (c) =>
            c.name.toLowerCase().includes(value.toLowerCase()) ||
            c.email.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  // if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error.message || error}</p>;

  return (
    <>
      {
      loading ? <Loader /> : <div className="p-6">
      {/* Search & Add */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl shadow-md p-2 w-full">
        <TableComponent columns={columns} filteredCustomers={filteredCustomers} />
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {editCustomer ? "Edit Customer" : "Add New Customer"}
            </h2>
            {["name", "email", "phone", "company", "address"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="border p-2 rounded w-full mb-3"
              />
            ))}
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border p-2 rounded w-full mb-3"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this customer?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    }
    </>
  );
};

export default page;
