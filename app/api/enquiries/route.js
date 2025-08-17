import { supabase } from "@/app/components/dbConnection/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req) {

  try {
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const customerId = searchParams.get("customerId");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    let query = supabase.from("enquiries").select("*").order("id", { ascending: true });

    if (status && status !== "all") query = query.eq("status", status);
    if (search) query = query.ilike("title", `%${search}%`);
    if (customerId) query = query.eq("customer_id", customerId);
    if (dateFrom && dateTo) {
      query = query.gte("created_at", dateFrom).lte("created_at", dateTo);
    }

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
  const { data, error } = await supabase.from("enquiries").insert(body).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0]);
}
