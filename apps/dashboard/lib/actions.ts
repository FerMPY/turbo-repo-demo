"use server";

import { revalidatePath } from "next/cache";

async function updateProduct(
  productId: string,
  name: FormDataEntryValue | null,
  inventory_count: FormDataEntryValue | null
) {
  const res = await fetch(
    "http://localhost:3002/api/inventory/update-product",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        name: name,
        inventory_count: inventory_count,
      }),
    }
  );
  console.log({
    productId: productId,
    name: name,
    inventory_count: inventory_count,
  });

  return res.json() as Promise<{
    error?: string;
    name?: string;
    id?: string;
    inventory_count?: number;
    success?: boolean;
  }>;
}

export async function updateAction(
  state: any,
  { productId, formData }: { productId: string; formData: FormData }
) {
  const name = formData.get("name");
  const inventoryCount = formData.get("inventory_count");
  const res = await updateProduct(productId, name, inventoryCount);
  revalidatePath("/");
  return res;
}
