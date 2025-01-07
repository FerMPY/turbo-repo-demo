"use client";
import { updateAction } from "@/lib/actions";
import { Button } from "@workspace/ui/components/button";
import { CardContent, CardFooter } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useActionState } from "react";

export function UpdateSection({
  productId,
  name,
  inventory_count,
}: {
  productId: string;
  name: string;
  inventory_count: number;
}) {
  const updateActionWithId = (state: unknown, formData: FormData) =>
    updateAction(state, { productId, formData });

  const [state, formAction, pending] = useActionState(updateActionWithId, null);

  return (
    <form
      action={async (formData: FormData) => {
        formAction(formData);
      }}
      className="flex gap-2 flex-col items-end w-full"
    >
      <CardContent className="flex gap-2 flex-col">
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" type="text" name="name" defaultValue={name} />
        <Label htmlFor="inventory_count">Product amount</Label>
        <Input
          id="inventory_count"
          type="number"
          name="inventory_count"
          defaultValue={inventory_count}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-end">
        <Button disabled={pending}>Update</Button>
        {state?.error && (
          <p aria-live="polite" className="text-red-600">
            {state?.error}
          </p>
        )}
        {state?.success && (
          <p aria-live="polite" className="text-green-600">
            Updated successfully
          </p>
        )}
      </CardFooter>
    </form>
  );
}
