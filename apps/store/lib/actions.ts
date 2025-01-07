"use server";

import { purchaseProduct } from "@workspace/api";
import { revalidatePath } from "next/cache";

export async function purchaseAction(
  state: unknown,
  { productId, formData }: { productId: string; formData: FormData }
) {
  const quantity = formData.get("quantity");
  const res = await purchaseProduct(productId, quantity);
  revalidatePath("/");
  return res;
}
