// // import React from 'react'

// // const page = () => {
// //   return (
// //     <div>page</div>
// //   )
// // }

// // export default page

// "use client";
// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { supabase } from "../components/dbConnection/supabaseClient";
// // import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// export default function page() {
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([{
//     id:1,
//     name: "user1",
//     email: "user1@gmail.com",
//     phone: "",
//     company: "",
//     address: "",
//     status: "Active",
//   }]);
//   const [searchText, setSearchText] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editCustomer, setEditCustomer] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     address: "",
//     status: "Active",
//   });
//   console.log("formData >", filteredCustomers)

//   // const supabase = createClientComponentClient();

//   // Fetch customers from Supabase
//   const fetchCustomers = async () => {
//     const { data, error } = await supabase.from("Customers").select("*").order("id", { ascending: false });
//     console.log("data >>", data)
//     if (!error) {
//       setCustomers(data);
//       // setFilteredCustomers(data);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   // Search filter
//   useEffect(() => {
//     const result = customers.filter(
//       (c) =>
//         c.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         c.email.toLowerCase().includes(searchText.toLowerCase()) ||
//         (c.company && c.company.toLowerCase().includes(searchText.toLowerCase()))
//     );
//     setFilteredCustomers(result);
//   }, [searchText, customers]);

//   // Handle form input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle save (Add / Edit)
//   const handleSave = async () => {
//     if (!formData.name || !formData.email) {
//       alert("Name and Email are required.");
//       return;
//     }
//     console.log("editCustomer >>", editCustomer);

//     if (editCustomer) {
//       // Update
//       const { error } = await supabase
//         .from("Customers")
//         .update(formData)
//         .eq("id", editCustomer.id);

//       if (!error) {
//         alert("Customer updated successfully!");
//         fetchCustomers();
//         setModalOpen(false);
//       }
//     } else {
//       // Insert
//       const { error } = await supabase.from("Customers").insert([formData]);

//       if (!error) {
//         alert("Customer added successfully!");
//         fetchCustomers();
//         setModalOpen(false);
//       }
//     }
//   };

//   // Open modal for add
//   const openAddModal = () => {
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       company: "",
//       address: "",
//       status: "Active",
//     });
//     setEditCustomer(null);
//     setModalOpen(true);
//   };

//   // Open modal for edit
//   const openEditModal = (row) => {
//     setFormData(row);
//     setEditCustomer(row);
//     setModalOpen(true);
//   };

//   // Table columns
//   const columns = [
//     { name: "Name", selector: (row) => row.name, sortable: true },
//     { name: "Email", selector: (row) => row.email, sortable: true },
//     { name: "Phone", selector: (row) => row.phone || "-", sortable: true },
//     { name: "Company", selector: (row) => row.company || "-", sortable: true },
//     { name: "Status", selector: (row) => row.status, sortable: true },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <button
//           onClick={() => openEditModal(row)}
//           className="text-blue-500 hover:underline"
//         >
//           Edit
//         </button>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border rounded px-3 py-2 w-1/3"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <button
//           onClick={openAddModal}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Customer
//         </button>
//       </div>

//       {/* Table */}
//       <DataTable
//         columns={columns}
//         data={filteredCustomers}
//         pagination
//         highlightOnHover
//         striped
//       />

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
//             <h2 className="text-xl font-bold mb-4">
//               {editCustomer ? "Edit Customer" : "Add Customer"}
//             </h2>

//             <div className="flex flex-col gap-3">
//               <input name="name" placeholder="Name*" className="border p-2 rounded" value={formData.name} onChange={handleChange} />
//               <input name="email" type="email" placeholder="Email*" className="border p-2 rounded" value={formData.email} onChange={handleChange} />
//               <input name="phone" placeholder="Phone" className="border p-2 rounded" value={formData.phone} onChange={handleChange} />
//               <input name="company" placeholder="Company" className="border p-2 rounded" value={formData.company} onChange={handleChange} />
//               <textarea name="address" placeholder="Address" className="border p-2 rounded" value={formData.address} onChange={handleChange} />
//               <select name="status" className="border p-2 rounded" value={formData.status} onChange={handleChange}>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
//             </div>

//             <div className="flex justify-end gap-3 mt-4">
//               <button onClick={() => setModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
//                 Cancel
//               </button>
//               <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import { useState } from 'react';
// // import { Plus, Search, Edit, Trash2, User, Mail, Phone, Building, MapPin, Eye, EyeOff } from 'lucide-react';
// import { FiPlus } from "react-icons/fi";
// import { IoSearchOutline } from "react-icons/io5";
// import { TbEdit } from "react-icons/tb";
// import { FaRegTrashAlt } from "react-icons/fa";


// const page = () => {
//   const [customers, setCustomers] = useState([
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+1234567890',
//       company: 'Tech Corp',
//       address: '123 Main St, City, State',
//       status: 'Active',
//       createdAt: '2024-01-15'
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       email: 'jane@company.com',
//       phone: '+0987654321',
//       company: 'Business Solutions',
//       address: '456 Oak Ave, Town, State',
//       status: 'Inactive',
//       createdAt: '2024-01-20'
//     }
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company: '',
//     address: '',
//     status: 'Active'
//   });
//   const [errors, setErrors] = useState({});

//   const filteredCustomers = customers.filter(customer =>
//     customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Customer name is required';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email address is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     } else {
//       // Check for duplicate email (excluding current customer if editing)
//       const isDuplicate = customers.some(customer => 
//         customer.email.toLowerCase() === formData.email.toLowerCase() && 
//         customer.id !== editingCustomer?.id
//       );
//       if (isDuplicate) {
//         newErrors.email = 'Email address already exists';
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     if (editingCustomer) {
//       // Update existing customer
//       setCustomers(customers.map(customer =>
//         customer.id === editingCustomer.id
//           ? { ...customer, ...formData }
//           : customer
//       ));
//     } else {
//       // Add new customer
//       const newCustomer = {
//         id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
//         ...formData,
//         createdAt: new Date().toISOString().split('T')[0]
//       };
//       setCustomers([...customers, newCustomer]);
//     }

//     resetForm();
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       company: '',
//       address: '',
//       status: 'Active'
//     });
//     setErrors({});
//     setShowModal(false);
//     setEditingCustomer(null);
//   };

//   const handleEdit = (customer) => {
//     setEditingCustomer(customer);
//     setFormData({
//       name: customer.name,
//       email: customer.email,
//       phone: customer.phone,
//       company: customer.company,
//       address: customer.address,
//       status: customer.status
//     });
//     setShowModal(true);
//   };

//   const handleDelete = (customerId) => {
//     setCustomers(customers.filter(customer => customer.id !== customerId));
//     setDeleteConfirm(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
//               <p className="text-gray-600 mt-1">Manage your customer database efficiently</p>
//             </div>
//             <button
//               onClick={() => setShowModal(true)}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//             >
//               <FiPlus className="w-4 h-4 mr-2" />
//               Add Customer
//             </button>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
//           <div className="relative">
//             <IoSearchOutline className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search customers by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Customer List */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Customers ({filteredCustomers.length})
//             </h2>
//           </div>
          
//           {filteredCustomers.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredCustomers.map((customer) => (
//                     <tr key={customer.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                             {/* <User className="w-4 h-4 text-blue-600" /> */}
//                           </div>
//                           <div className="ml-3">
//                             <div className="text-sm font-medium text-gray-900">{customer.name}</div>
//                             <div className="text-sm text-gray-500 flex items-center mt-1">
//                               {/* <Mail className="w-3 h-3 mr-1" /> */}
//                               {customer.email}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 flex items-center">
//                           {/* <Phone className="w-3 h-3 mr-1 text-gray-400" /> */}
//                           {customer.phone || 'N/A'}
//                         </div>
//                         {customer.address && (
//                           <div className="text-sm text-gray-500 flex items-center mt-1">
//                             {/* <MapPin className="w-3 h-3 mr-1" /> */}
//                             {customer.address}
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 flex items-center">
//                           {/* <Building className="w-3 h-3 mr-1 text-gray-400" /> */}
//                           {customer.company || 'N/A'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                           customer.status === 'Active'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {customer.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(customer.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => handleEdit(customer)}
//                             className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
//                             title="Edit Customer"
//                           >
//                             <TbEdit className="w-4 h-4" />
//                           </button>
//                           <button
//                             

//                             className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
//                             title="Delete Customer"
//                           >
//                             <FaRegTrashAlt className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               {/* <User className="w-12 h-12 text-gray-400 mx-auto mb-4" /> */}
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
//               <p className="text-gray-600 mb-4">
//                 {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first customer'}
//               </p>
//               {!searchTerm && (
//                 <button
//                   onClick={() => setShowModal(true)}
//                   className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <FiPlus className="w-4 h-4 mr-2" />
//                   Add Customer
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add/Edit Customer Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
//         {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 "> */}

        
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
//               </h3>
//             </div>
            
//             <div className="px-6 py-4 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Customer Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.name ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter customer name"
//                 />
//                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                     errors.email ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter email address"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
//                 <input
//                   type="text"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter company name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   rows="2"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter address"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 {editingCustomer ? 'Update Customer' : 'Add Customer'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
//             <div className="px-6 py-4">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Delete</h3>
//               <p className="text-gray-600 mb-4">
//                 Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.
//               </p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setDeleteConfirm(null)}
//                   className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleDelete(deleteConfirm.id)}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default page;

// "use client";
// import React, { useState } from "react";
// import DataTable from "react-data-table-component";
// import TableComponent from "../components/TableComponent";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { TbEdit } from "react-icons/tb";


// const page = () => {
//   const [customers, setCustomers] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "1234567890",
//       company: "Example Inc",
//       address: "123 Main St",
//       status: "Active",
//     },
//   ]);

//   const [search, setSearch] = useState("");
//   const [filteredCustomers, setFilteredCustomers] = useState(customers);
//   const [showModal, setShowModal] = useState(false);
//   const [editCustomer, setEditCustomer] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     address: "",
//     status: "Active",
//   });

//   const columns = [
//     { name: "Name", selector: row => row.name, sortable: true },
//     { name: "Email", selector: row => row.email, sortable: true },
//     { name: "Phone", selector: row => row.phone },
//     { name: "Company", selector: row => row.company },
//     { name: "Address", selector: row => row.address },
//     { name: "Status", selector: row => row.status },
//     {
//       name: "Actions",
//       cell: row => (
//         <div>
//         <button
//           className="px-3 py-1 text-lg text-blue-700 rounded"
//           onClick={() => handleEdit(row)}
//         >
//           <TbEdit />
//         </button>

//        <button
//           className="px-3 py-1 text-lg  text-red-700 rounded"
//           onClick={() => handleEdit(row)}
//         >
//           <FaRegTrashAlt onClick={() => handleDelete(row)} />
//         </button>

//         </div>
//       ),
//     },
//   ];

//   const handleEdit = (customer) => {
//     setEditCustomer(customer);
//     setFormData(customer);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setEditCustomer(null);
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       company: "",
//       address: "",
//       status: "Active",
//     });
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     if (!formData.name || !formData.email) {
//       alert("Name and Email are required");
//       return;
//     }

//     if (editCustomer) {
//       setCustomers(
//         customers.map(c => (c.id === editCustomer.id ? { ...formData, id: c.id } : c))
//       );
//     } else {
//       setCustomers([...customers, { ...formData, id: Date.now() }]);
//     }

//     setShowModal(false);
//     setEditCustomer(null);
//   };

//   const handleSearch = (value) => {
//     setSearch(value);
//     if (value === "") {
//       setFilteredCustomers(customers);
//     } else {
//       setFilteredCustomers(
//         customers.filter(c =>
//           c.name.toLowerCase().includes(value.toLowerCase()) ||
//           c.email.toLowerCase().includes(value.toLowerCase())
//         )
//       );
//     }
//   };

//   React.useEffect(() => {
//     setFilteredCustomers(customers);
//   }, [customers]);

//     const handleDelete = (customerId) => {
//     setCustomers(customers.filter(customer => customer.id !== customerId));
//     setDeleteConfirm(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={search}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="border p-2 rounded w-1/3"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add Customer
//         </button>
//       </div>

// <div className="rounded-xl shadow-md p-2 w-full">
//   <TableComponent columns={columns} filteredCustomers={filteredCustomers} />
// </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">
//               {editCustomer ? "Edit Customer" : "Add New Customer"}
//             </h2>
//             <input
//               type="text"
//               placeholder="Name *"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="email"
//               placeholder="Email *"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="text"
//               placeholder="Company"
//               value={formData.company}
//               onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               value={formData.address}
//               onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//               className="border p-2 rounded w-full mb-3"
//             />
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//               className="border p-2 rounded w-full mb-3"
//             >
//               <option>Active</option>
//               <option>Inactive</option>
//             </select>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default page;


//2 -->>
// "use client";
// import React, { useState, useEffect } from "react";
// import TableComponent from "../components/TableComponent";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { TbEdit } from "react-icons/tb";
// import { useCustomers } from "../hooks/useCustomers";

// const page = () => {
//   const { customers, loading, error } = useCustomers();
//   const [customer, setCustomers] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "1234567890",
//       company: "Example Inc",
//       address: "123 Main St",
//       status: "Active",
//     },
//   ]);

//   const [search, setSearch] = useState("");
//   const [filteredCustomers, setFilteredCustomers] = useState(customers);
//   const [showModal, setShowModal] = useState(false);
//   const [editCustomer, setEditCustomer] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     company: "",
//     address: "",
//     status: "Active",
//   });

//   // State for delete confirmation
//   const [deleteConfirm, setDeleteConfirm] = useState(null);

//   const columns = [
//     { name: "Name", selector: (row) => row.name, sortable: true },
//     { name: "Email", selector: (row) => row.email, sortable: true },
//     { name: "Phone", selector: (row) => row.phone },
//     { name: "Company", selector: (row) => row.company },
//     { name: "Address", selector: (row) => row.address },
//     { name: "Status", selector: (row) => row.status },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="flex gap-2">
//           <button
//             className="px-3 py-1 text-lg text-blue-700 rounded"
//             onClick={() => handleEdit(row)}
//           >
//             <TbEdit />
//           </button>
//           <button
//             className="px-3 py-1 text-lg text-red-700 rounded"
//             onClick={() => setDeleteConfirm(row.id)}
//           >
//             <FaRegTrashAlt />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const handleEdit = (customer) => {
//     setEditCustomer(customer);
//     setFormData(customer);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setEditCustomer(null);
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       company: "",
//       address: "",
//       status: "Active",
//     });
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     if (!formData.name || !formData.email) {
//       alert("Name and Email are required");
//       return;
//     }

//     if (editCustomer) {
//       setCustomers(
//         customers.map((c) =>
//           c.id === editCustomer.id ? { ...formData, id: c.id } : c
//         )
//       );
//     } else {
//       setCustomers([...customers, { ...formData, id: Date.now() }]);
//     }

//     setShowModal(false);
//     setEditCustomer(null);
//   };

//   const handleSearch = (value) => {
//     setSearch(value);
//     if (value === "") {
//       setFilteredCustomers(customers);
//     } else {
//       setFilteredCustomers(
//         customers.filter(
//           (c) =>
//             c.name.toLowerCase().includes(value.toLowerCase()) ||
//             c.email.toLowerCase().includes(value.toLowerCase())
//         )
//       );
//     }
//   };

//   useEffect(() => {
//     setFilteredCustomers(customers);
//   }, [customers]);

//   const confirmDelete = () => {
//     setCustomers(customers.filter((c) => c.id !== deleteConfirm));
//     setDeleteConfirm(null);
//   };

//   return (
//     <div className="p-6">
//       {/* Search & Add */}
//       <div className="flex justify-between items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={search}
//           onChange={(e) => handleSearch(e.target.value)}
//           className="border p-2 rounded w-1/3"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add Customer
//         </button>
//       </div>

//       {/* Table */}
//       <div className="rounded-xl shadow-md p-2 w-full">
//         <TableComponent
//           columns={columns}
//           filteredCustomers={filteredCustomers}
//         />
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">
//               {editCustomer ? "Edit Customer" : "Add New Customer"}
//             </h2>
//             <input
//               type="text"
//               placeholder="Name *"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="email"
//               placeholder="Email *"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="text"
//               placeholder="Company"
//               value={formData.company}
//               onChange={(e) =>
//                 setFormData({ ...formData, company: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-3"
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               value={formData.address}
//               onChange={(e) =>
//                 setFormData({ ...formData, address: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-3"
//             />
//             <select
//               value={formData.status}
//               onChange={(e) =>
//                 setFormData({ ...formData, status: e.target.value })
//               }
//               className="border p-2 rounded w-full mb-3"
//             >
//               <option>Active</option>
//               <option>Inactive</option>
//             </select>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteConfirm !== null && (
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
//             <h2 className="text-lg font-semibold mb-4">
//               Are you sure you want to delete this customer?
//             </h2>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setDeleteConfirm(null)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default page;


"use client";
import React, { useState, useEffect } from "react";
import TableComponent from "../components/TableComponent";
import { FaRegTrashAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { useCustomers } from "../hooks/useCustomers";

const page = () => {
  const {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();


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
      await updateCustomer(editCustomer.id, formData);
    } else {
      await addCustomer(formData);
    }

    setShowModal(false);
    setEditCustomer(null);
  };

  const confirmDelete = async () => {
    await deleteCustomer(deleteConfirm);
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

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error.message || error}</p>;

  return (
    <div className="p-6">
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
  );
};

export default page;
