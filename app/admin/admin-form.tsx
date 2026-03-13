"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Store, Loader2 } from "lucide-react";

export function AdminForm() {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("4.0");
  const [image, setImage] = useState(
    "https://picsum.photos/seed/restaurant/400/300",
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          cuisine,
          rating: parseFloat(rating),
          image,
        }),
      });

      if (res.ok) {
        alert("Restaurant registered successfully!");
        setName("");
        setCuisine("");
        setRating("4.0");
        router.refresh();
      } else {
        alert("Failed to register restaurant.");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering restaurant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Restaurant Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            placeholder="e.g. The Spicy Taco"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="cuisine"
          className="block text-sm font-medium text-gray-700"
        >
          Cuisine Type
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="cuisine"
            id="cuisine"
            required
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            placeholder="e.g. Mexican"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700"
        >
          Initial Rating
        </label>
        <div className="mt-1">
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            name="rating"
            id="rating"
            required
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <div className="mt-1">
          <input
            type="url"
            name="image"
            id="image"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
        ) : (
          <Store className="h-5 w-5 mr-2" />
        )}
        {isLoading ? "Registering..." : "Register Restaurant"}
      </button>
    </form>
  );
}
