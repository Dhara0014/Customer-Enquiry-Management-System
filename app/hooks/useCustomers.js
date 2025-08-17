// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "../components/dbConnection/supabaseClient";

// export const useCustomers = () => {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoading(true);
//       setError(null);

//       // Get current session (to ensure user is logged in)
//       const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//       if (sessionError) {
//         setError(sessionError);
//         setLoading(false);
//         return;
//       }

//       if (!session) {
//         setError("No active session. Please log in.");
//         setLoading(false);
//         return;
//       }

//       // Fetch customers
//       const { data, error } = await supabase
//         .from("customers")
//         .select("*");

//       if (error) setError(error);
//       else setCustomers(data);

//       setLoading(false);
//     };

//     fetchCustomers();
//   }, []);

//   return { customers, loading, error };
// };


"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../components/dbConnection/supabaseClient";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      setError(sessionError);
      setLoading(false);
      return;
    }
    if (!session) {
      setError("No active session. Please log in.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("id", { ascending: true });

    if (error) setError(error);
    else setCustomers(data);

    setLoading(false);
  }, []);

  const addCustomer = async (customer) => {
    const { data, error } = await supabase
      .from("customers")
      .insert([customer])
      .select();

    if (error) {
      setError(error);
      return null;
    }
    setCustomers((prev) => [...prev, ...data]);
    return data[0];
  };

  const updateCustomer = async (id, updatedData) => {
    const { data, error } = await supabase
      .from("customers")
      .update(updatedData)
      .eq("id", id)
      .select();

    if (error) {
      setError(error);
      return null;
    }
    setCustomers((prev) => prev.map((c) => (c.id === id ? data[0] : c)));
    return data[0];
  };

  const deleteCustomer = async (id) => {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) {
      setError(error);
      return false;
    }
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    return true;
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    refresh: fetchCustomers,
  };
};
