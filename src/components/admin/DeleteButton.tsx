"use client";

import { Trash2 } from "lucide-react";
import { deletePost } from "@/lib/actions";
import { useTransition } from "react";

export function DeleteButton({ id }: { id: string }) {
  let [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this masterpiece?")) {
          startTransition(() => deletePost(id));
        }
      }}
      className={`text-red-500 hover:bg-red-50 p-2 rounded transition-opacity ${
        isPending ? "opacity-30" : "opacity-100"
      }`}
    >
      <Trash2 size={16} />
    </button>
  );
}