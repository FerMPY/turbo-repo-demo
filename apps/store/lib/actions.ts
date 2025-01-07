"use server";

import { revalidatePath } from "next/cache";

async function purchaseProduct(
  productId: string,
  quantity: FormDataEntryValue | null
) {
  const res = await fetch(
    "http://localhost:3002/api/inventory/update-inventory",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    }
  );

  return res.json() as Promise<{
    error?: string;
    name?: string;
    id?: string;
    inventory_count?: number;
    success?: boolean;
  }>;
}

export async function purchaseAction(
  state: any,
  { productId, formData }: { productId: string; formData: FormData }
) {
  const quantity = formData.get("quantity");
  const res = await purchaseProduct(productId, quantity);
  revalidatePath("/");
  return res;
}
