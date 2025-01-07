import {
  Card,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { UpdateSection } from "./(components)/update";

async function getAllProducts() {
  const res = await fetch("http://localhost:3002/api/inventory", {});

  if (!res.ok) {
    throw new Error("Failed to fetch inventory");
  }

  return res.json() as Promise<
    {
      name: string;
      id: string;
      inventory_count: number;
    }[]
  >;
}

export default async function StorePage() {
  const products = await getAllProducts();
  return (
    <div className="container mx-auto p-4 space-y-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>Product ID: {product.id}</CardTitle>
            </CardHeader>
            <UpdateSection
              productId={product.id}
              name={product.name}
              inventory_count={product.inventory_count}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
