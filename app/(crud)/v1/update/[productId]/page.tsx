import { db } from "@/lib/db";
import { UpdateProductForm } from "./update-product-form";

export default async function UpdateProductPage({ params: { productId } }: { params: { productId: string } }) {
  const product = await db.product.findUnique({ where: { id: parseInt(productId) } });
  return <UpdateProductForm data={product} />;
}
