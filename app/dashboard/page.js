"use client";
import { useEffect } from "react";
import { useCustomers } from "../hooks/useCustomers";
import {useEnquiries} from "../hooks/useEnquiries"

export default function DashboardPage() {

  const {customers, error} = useCustomers();
  const {enquiries, fetchEnquiries} = useEnquiries();

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-800 rounded-3xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-white">Total Customers</h2>
          <p className="text-4xl font-bold text-gray-300 mt-2">{customers?.length}</p>
        </div>
        <div className="bg-green-700 rounded-3xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-white">Total Queries</h2>
          <p className="text-4xl font-bold text-gray-300 mt-2">{enquiries?.length}</p>
        </div>
      </div>
    </div>
  );
}
