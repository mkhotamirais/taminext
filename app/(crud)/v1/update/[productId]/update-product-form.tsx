"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Product } from "@prisma/client";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProductSchama = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.union([
    z.number().min(1, { message: "Price must be greater than 0" }),
    z.string().min(1, { message: "Price must be greater than 0" }),
  ]),
});

type FormSchama = z.infer<typeof ProductSchama>;

export function UpdateProductForm({ data }: { data: Product | null }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchama>({
    resolver: zodResolver(ProductSchama),
    defaultValues: { name: data?.name, price: data?.price },
  });

  const onSubmit = async (values: FormSchama) => {
    setPending(true);
    await axios
      .patch(`/api/v1/${data?.id}`, values)
      .then((res) => {
        toast.success(res.data.message);
        router.push(`/v1`);
        router.refresh();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <h2 className="my-4 font-bold text-lg">Update Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="product name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} placeholder="product price" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={pending} type="submit">
            {pending ? "Loading.." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
