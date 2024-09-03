"use client";

import Modal from "@/components/modal";
import { Product } from "@prisma/client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ModalDelDialogProps {
  item: Product | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalDelDialog({ item, open, setOpen }: ModalDelDialogProps) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const onDelete = () => {
    setPending(true);
    axios
      .delete(`/api/v1/${item?.id}`)
      .then((res) => {
        toast.success(res.data.message);
        router.refresh();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(() => setOpen(false));
  };

  return (
    <Modal title={`Delete ${item?.name}, are you sure?`} open={open} closeModal={() => setOpen(false)}>
      <div className="flex gap-1">
        <Button disabled={pending} variant={"destructive"} onClick={onDelete}>
          {pending ? "Loading.." : "Delete"}
        </Button>
        <Button disabled={pending} variant={"outline"} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
