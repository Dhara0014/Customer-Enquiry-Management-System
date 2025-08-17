// "use client";
// import { useState, useCallback } from "react";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// export const useEnquiries = () => {
//   const supabase = createClientComponentClient();
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ✅ Get all enquiries (with optional filters)
//   const fetchEnquiries = useCallback(async (filters = {}) => {
//     try {
//       setLoading(true);
//       setError(null);

//       let query = supabase
//         .from("enquiries")
//         .select("*") // join with customers table
//         // .order("created_at", { ascending: false });

//       if (filters.status) query = query.eq("status", filters.status);
//       if (filters.priority) query = query.eq("priority", filters.priority);
//       if (filters.customer_id) query = query.eq("customer_id", filters.customer_id);
//       if (filters.date_from && filters.date_to) {
//         query = query.gte("created_at", filters.date_from).lte("created_at", filters.date_to);
//       }

//       const { data, error } = await query;
//       if (error) throw error;
//       setEnquiries(data || []);
//     } catch (err) {
//       console.error("Error fetching enquiries:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [supabase]);

//   // ✅ Add a new enquiry
//   const addEnquiry = useCallback(async (newEnquiry) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { data, error } = await supabase
//         .from("enquiries")
//         .insert([newEnquiry])
//         .select();
//       if (error) throw error;
//       setEnquiries((prev) => [data[0], ...prev]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [supabase]);

//   // ✅ Update an enquiry
//   const updateEnquiry = useCallback(async (id, updates) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { data, error } = await supabase
//         .from("enquiries")
//         .update(updates)
//         .eq("id", id)
//         .select();
//       if (error) throw error;
//       setEnquiries((prev) => prev.map((e) => (e.id === id ? data[0] : e)));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [supabase]);

//   // ✅ Delete an enquiry
//   const deleteEnquiry = useCallback(async (id) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { error } = await supabase.from("enquiries").delete().eq("id", id);
//       if (error) throw error;
//       setEnquiries((prev) => prev.filter((e) => e.id !== id));
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [supabase]);

//   // ✅ Export single enquiry to PDF
//   const exportEnquiryPDF = useCallback((enquiry) => {
//     const content = `
//       Enquiry Title: ${enquiry.title}
//       Customer: ${enquiry.customers?.name} (${enquiry.customers?.email})
//       Priority: ${enquiry.priority}
//       Status: ${enquiry.status}
//       Expected Closure: ${enquiry.expected_closure_date}
//       Created At: ${enquiry.created_at}
//       Description: ${enquiry.description}
//     `;
//     const blob = new Blob([content], { type: "application/pdf" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `${enquiry.title}.pdf`;
//     link.click();
//     URL.revokeObjectURL(url);
//   }, []);

//   return {
//     enquiries,
//     loading,
//     error,
//     fetchEnquiries,
//     addEnquiry,
//     updateEnquiry,
//     deleteEnquiry,
//     exportEnquiryPDF,
//   };
// };


import { useState, useCallback } from "react";
import { supabase } from "../components/dbConnection/supabaseClient";

export const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all enquiries with customer info
  const fetchEnquiries = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("enquiries")
        .select(`
          *,
          customers:customer_id(id, name, email, phone)
        `)
        .order("created_at", { ascending: false });
        
        if (filters.status) query = query.eq("status", filters.status);
        if (filters.priority) query = query.eq("priority", filters.priority);
        
        const { data, error } = await query;
        console.log("query >>", data)
        console.log("error >>", error)
      if (error) throw error;

      setEnquiries(data || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addEnquiry = async (enquiry) => {
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .insert([enquiry])
        .select(`
          *,
          customers:customer_id(id, name, email, phone)
        `);

      if (error) throw error;
      if (data && data.length > 0) {
        setEnquiries((prev) => [data[0], ...prev]);
      }
    } catch (err) {
      console.error("Insert error:", err.message);
      setError(err.message);
    }
  };

  const updateEnquiry = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .update(updates)
        .eq("id", id)
        .select(`
          *,
          customers:customer_id(id, name, email, phone)
        `);

      if (error) throw error;
      if (data && data.length > 0) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? data[0] : item))
        );
      }
    } catch (err) {
      console.error("Update error:", err.message);
      setError(err.message);
    }
  };

  const deleteEnquiry = async (id) => {
    try {
      const { error } = await supabase.from("enquiries").delete().eq("id", id);
      if (error) throw error;
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
      setError(err.message);
    }
  };

  return {
    enquiries,
    loading,
    error,
    fetchEnquiries,
    addEnquiry,
    updateEnquiry,
    deleteEnquiry,
  };
};
