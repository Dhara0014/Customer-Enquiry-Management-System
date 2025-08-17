 

export async function getEnquiries(filters = {}) {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/enquiries?${queryParams}`);

    if (!res.ok) {
      throw new Error("Failed to fetch enquiries");
    }

    return await res.json();
  } catch (err) {
    console.error("Service Error (getEnquiries):", err.message);
    throw err;
  }
  }
  
  export async function addEnquiry(enquiry) {
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });
    if (!res.ok) throw new Error("Failed to add enquiry");
    return res.json();
  }
  
  export async function updateEnquiry(id, enquiry) {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });
    if (!res.ok) throw new Error("Failed to update enquiry");
    return res.json();
  }
  
  export async function deleteEnquiry(id) {
    const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete enquiry");
    return res.json();
  }
  