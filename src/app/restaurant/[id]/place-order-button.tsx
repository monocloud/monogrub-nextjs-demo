"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Loader2 } from "lucide-react";

export function PlaceOrderButton({ restaurantId }: { restaurantId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOrder = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantId, total: 35.0 }), // Dummy total
      });

      if (res.ok) {
        router.push("/profile");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleOrder}
      disabled={isLoading}
      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="animate-spin h-5 w-5 mr-2" />
      ) : (
        <ShoppingBag className="h-5 w-5 mr-2" />
      )}
      {isLoading ? "Processing..." : "Place Order ($35.00)"}
    </button>
  );
}
