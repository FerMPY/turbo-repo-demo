import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@workspace/ui/components/card";
import { PurchaseSection } from "./(components)/purchase";
import { getAllProducts } from "@workspace/api";

export default async function StorePage() {
  const products = await getAllProducts();
  console.log(products);
  return (
    <div className="container mx-auto p-4 space-y-10">
      <h1 className="text-2xl font-bold">E-Commerce Store</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                Current inventory: {product.inventory_count}
              </p>
            </CardContent>
            <CardFooter>
              <PurchaseSection productId={product.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
