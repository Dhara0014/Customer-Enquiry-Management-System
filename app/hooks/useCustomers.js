import { useEffect, useState } from "react";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "../components/services/customerService";

export default function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (err) {
        setError(err.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const create = async (customer) => {
    try {
      const newCustomer = await addCustomer(customer);
      setCustomers((prev) => [...prev, newCustomer]);
    } catch (err) {
      setError(err.message || "Failed to add customer");
    }
  };

  const update = async (id, customer) => {
    try {
      const updated = await updateCustomer(id, customer);
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
    } catch (err) {
      setError(err.message || "Failed to update customer");
    }
  };

  const remove = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete customer");
    }
  };

  return { customers, loading, error, create, update, remove };
}
