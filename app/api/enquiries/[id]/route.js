import { supabase } from "@/app/components/dbConnection/supabaseClient";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  const params = await context.params;
  const body = await req.json();
  // const {id, ...rest} = body;
  if (!params?.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const { data, error } = await supabase.from("enquiries").update(body).eq("id", params?.id).select(`*, customers (id, name, email)`).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req, context) {
  const params = await context.params;
  const { error } = await supabase.from("enquiries").delete().eq("id", params?.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
