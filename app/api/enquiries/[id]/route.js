import { supabase } from "@/app/components/dbConnection/supabaseClient";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const body = await req.json();
  const { data, error } = await supabase.from("enquiries").update(body).eq("id", params.id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function DELETE(req, { params }) {
  const { error } = await supabase.from("enquiries").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
