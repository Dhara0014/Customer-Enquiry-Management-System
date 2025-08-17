

export async function getCustomers() {
    const res = await fetch("/api/customers");
    if (!res.ok) throw new Error("Failed to fetch customers");
    return res.json();
  }
  
  export async function addCustomer(customer) {
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    if (!res.ok) throw new Error("Failed to add customer");
    return res.json();
  }
  
  export async function updateCustomer(id, customer) {
    const res = await fetch(`/api/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    });
    if (!res.ok) throw new Error("Failed to update customer");
    return res.json();
  }
  
  export async function deleteCustomer(id) {
    const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete customer");
    return res.json();
  }
  