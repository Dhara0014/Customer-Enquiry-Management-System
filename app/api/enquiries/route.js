import { supabase } from "@/app/components/dbConnection/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req) {

  try {
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const priority = searchParams.get("priority");
    const customerId = searchParams.get("customer_id");
    const dateFrom = searchParams.get("from");
    const dateTo = searchParams.get("to");

    let query = supabase.from("enquiries").select("*, customers(id, name, email)").order("id", { ascending: true });

    if (status) query = query.eq("status", status);
    if (priority) query = query.eq("priority", priority);
    if (search) query = query.ilike("title", `%${search}%`);
    if (customerId) query = query.eq("customer_id", customerId);

    if (dateFrom) query = query.gte("created_at", dateFrom);
    if (dateTo) query = query.lte("created_at", dateTo + "T23:59:59"); 

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST add enquiry
export async function POST(req) {
  const body = await req.json();
  const { data, error } = await supabase.from("enquiries").insert(body).select(`*, customers (id, name, email)`)
  .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
