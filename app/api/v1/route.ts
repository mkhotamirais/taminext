import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  try {
    await db.product.create({ data });
    return NextResponse.json({ message: `Create ${data.name} success` }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || "something went wrong" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const result = await db.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || "something went wrong" }, { status: 500 });
  }
};
