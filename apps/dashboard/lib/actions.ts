"use server";

import { revalidatePath } from "next/cache";
import { updateProduct } from "@workspace/api/";

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
