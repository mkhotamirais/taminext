"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import ModalDelDialog from "./modal-del-dialog";
import { useRouter } from "next/navigation";

export default function ProductActionBtn({ item }: { item: Product | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <ModalDelDialog item={item} open={open} setOpen={setOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-16" align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <FaTrashCan className="mr-2" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/v1/update/${item?.id}`)}>
            <FaPenToSquare className="mr-2" /> Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
