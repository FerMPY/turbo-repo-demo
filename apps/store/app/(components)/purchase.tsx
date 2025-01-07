"use client";
import { purchaseAction } from "@/lib/actions";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useActionState } from "react";

export function PurchaseSection({ productId }: { productId: string }) {
  const purchaseActionWithId = (state: unknown, formData: FormData) =>
    purchaseAction(state, { productId, formData });

  const [state, formAction, pending] = useActionState(
    purchaseActionWithId,
    null
  );

  return (
    <form
      action={async (formData: FormData) => {
        formAction(formData);
      }}
      className="flex gap-2 flex-col items-end w-full"
    >
      <div className="flex gap-2">
        <Input
          className="w-20"
          type="number"
          name="quantity"
          required
          id="quantity"
          defaultValue={1}
        />
        <Button disabled={pending}>Purchase</Button>
      </div>
      {state?.error && (
        <p aria-live="polite" className="text-red-600">
          {state?.error}
        </p>
      )}
      {state?.success && (
        <p aria-live="polite" className="text-green-600">
          Purchased successfully
        </p>
      )}
    </form>
  );
}
