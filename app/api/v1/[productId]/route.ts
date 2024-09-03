import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params: { productId } }: { params: { productId: string } }) => {
  try {
    const result = await db.product.findUnique({ where: { id: parseInt(productId) } });
    if (!result) return NextResponse.json({ error: `Data not found` }, { status: 404 });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || "something went wrong" }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params: { productId } }: { params: { productId: string } }) => {
  const data = await req.json();
  try {
    const result = await db.product.findUnique({ where: { id: parseInt(productId) } });
    if (!result) return NextResponse.json({ error: `Data not found` }, { status: 404 });
    await db.product.update({ where: { id: parseInt(productId) }, data });
    return NextResponse.json({ message: `Update ${result.name} success` }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || "something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params: { productId } }: { params: { productId: string } }) => {
  try {
    const result = await db.product.findUnique({ where: { id: parseInt(productId) } });
    if (!result) return NextResponse.json({ error: `Data not found` }, { status: 404 });
    await db.product.delete({ where: { id: parseInt(productId) } });
    return NextResponse.json({ message: `Delete ${result.name} success` }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || "something went wrong" }, { status: 500 });
  }
};
