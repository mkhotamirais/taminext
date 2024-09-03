import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import ProductActionBtn from "./product-action-btn";

export default async function V1Page() {
  const data = await db.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="py-4">
      <div className="flex justify-between py-2 items-center">
        <h2 className="text-lg font-bold">V1</h2>
        <div>
          <Button asChild>
            <Link href="/v1/create">Create Product</Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 p-2 bg-gray-100 font-bold mb-2">
        <div>name</div>
        <div>price</div>
        <div className="w-12"></div>
      </div>
      {data.map((item) => (
        <div key={item.id} className="grid grid-cols-[1fr_1fr_auto] gap-2 p-2 odd:bg-blue-100">
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div className="w-12">
            <ProductActionBtn item={item} />
          </div>
        </div>
      ))}
    </div>
  );
}
