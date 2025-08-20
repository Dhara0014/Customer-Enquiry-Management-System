import { useEffect, useState } from "react";
import { getEnquiries, addEnquiry, updateEnquiry, deleteEnquiry } from "../components/services/enquiryService";

export default function useEnquiries(initialFilters = {} ) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allFilters, setAllFilters] = useState(initialFilters);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getEnquiries(allFilters);
      setEnquiries(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEnquiries();
        setEnquiries(data);
      } catch (err) {
        setError(err.message || "Failed to fetch enquiries");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // fetchEnquiries();
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [JSON.stringify(allFilters)]);


  const create = async (enquiry) => {
    try {
      const newEnquiry = await addEnquiry(enquiry);
      // await fetchEnquiries();
      setEnquiries((prev) => [...prev, newEnquiry]);
    } catch (err) {
      setError(err.message || "Failed to add enquiry");
    }
  };

  const update = async (id, enquiry) => {
    try {
      const updated = await updateEnquiry(id, enquiry);
      // await fetchEnquiries();
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? updated : e))
      );
    } catch (err) {
      setError(err.message || "Failed to update enquiry");
    }
  };

  const remove = async (id) => {
    try {
      await deleteEnquiry(id);
      await fetchEnquiries();
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete enquiry");
    }
  };

  return { enquiries, loading, error, create, update, remove, allFilters, setAllFilters };
}


