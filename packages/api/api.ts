const BASEURL =
  process.env.NODE_ENV === "production" && process.env.VERCEL
    ? `https://${process.env.VERCEL_URL}:3002`
    : "http://localhost:3002";

export async function updateProduct(
  productId: string,
  name: FormDataEntryValue | null,
  inventory_count: FormDataEntryValue | null
) {
  try {
    const res = await fetch(`${BASEURL}/api/inventory/update-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        name: name,
        inventory_count: inventory_count,
      }),
    });

    return res.json() as Promise<{
      error?: string;
      name?: string;
      id?: string;
      inventory_count?: number;
      success?: boolean;
    }>;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllProducts() {
  try {
    const res = await fetch(`${BASEURL}/api/inventory`, {});
    if (!res.ok) {
      throw new Error("Failed to fetch inventory");
    }

    return res.json() as Promise<
      | {
          name: string;
          id: string;
          inventory_count: number;
        }[]
      | undefined
    >;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function purchaseProduct(
  productId: string,
  quantity: FormDataEntryValue | null
) {
  try {
    const res = await fetch(`${BASEURL}/api/inventory/update-inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    });

    return res.json() as Promise<{
      error?: string;
      name?: string;
      id?: string;
      inventory_count?: number;
      success?: boolean;
    }>;
  } catch (error) {
    console.log(error);
    return null;
  }
}
