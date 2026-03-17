"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChefHat,
  ImageIcon,
  Loader2,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import { toast } from "sonner";

type CreateRestaurantResponse = {
  success?: boolean;
  message?: string;
  restaurant?: {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    image: string;
  };
};

export function AdminForm() {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("4.0");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const normalizedName = name.trim();
  const normalizedCuisine = cuisine.trim();
  const normalizedImage = image.trim();
  const parsedRating = Number.parseFloat(rating);
  const ratingIsValid =
    Number.isFinite(parsedRating) && parsedRating >= 1 && parsedRating <= 5;

  const previewName = normalizedName || "Your next restaurant";
  const previewCuisine = normalizedCuisine || "Cuisine category";
  const previewRating = ratingIsValid ? parsedRating.toFixed(1) : "4.0";
  const previewImage = (normalizedImage || "").replace(
    /["\\]/g,
    "\\$&",
  );

  const canSubmit =
    !isLoading &&
    Boolean(normalizedName) &&
    Boolean(normalizedCuisine) &&
    Boolean(normalizedImage) &&
    ratingIsValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: normalizedName,
          cuisine: normalizedCuisine,
          rating: parsedRating,
          image: normalizedImage,
        }),
      });

      const payload: CreateRestaurantResponse | null = await res.json().catch(() => null);

      if (res.ok && payload?.restaurant?.id) {
        toast.success("Restaurant registered successfully!");
        setName("");
        setCuisine("");
        setRating("4.0");
        setImage("");
        router.push(`/restaurant/${payload.restaurant.id}`);
      } else {
        toast.error(payload?.message || "Failed to register restaurant.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error registering restaurant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Restaurant details
              </h3>
              <p className="text-sm text-slate-600">
                Add the public information customers will see first.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Restaurant name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="e.g. The Spicy Taco"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="cuisine"
                className="block text-sm font-medium text-slate-700"
              >
                Cuisine type
              </label>
              <input
                type="text"
                name="cuisine"
                id="cuisine"
                required
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="e.g. Mexican"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Launch settings
              </h3>
              <p className="text-sm text-slate-600">
                Set the initial score and cover image before publishing.
              </p>
            </div>
          </div>

          <div className="grid gap-5">
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-slate-700"
              >
                Initial rating
              </label>
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
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
              <p className="mt-2 text-xs text-slate-500">
                Use a value from 1.0 to 5.0.
              </p>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-slate-700"
              >
                Hero image URL
              </label>
              <input
                type="url"
                name="image"
                id="image"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="https://example.com/restaurant.jpg"
              />
              <p className="mt-2 text-xs text-slate-500">
                A strong landscape image makes the new listing feel complete.
              </p>
            </div>
          </div>
        </section>

        <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-950">
                Publish and review instantly
              </p>
              <p className="text-sm text-indigo-800">
                After creation you&apos;ll be taken directly to the restaurant
                page.
              </p>
            </div>
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Store className="mr-2 h-5 w-5" />
              )}
              {isLoading ? "Publishing..." : "Publish restaurant"}
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-5">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div
            className="h-56 bg-slate-200 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.05), rgba(15, 23, 42, 0.55)), url("${previewImage}")`,
            }}
          />
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                Live preview
              </span>
              <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                <Star className="mr-1 h-4 w-4 fill-current" />
                {previewRating}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {previewName}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{previewCuisine}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              The newly created listing will open in the same restaurant detail
              page customers use to browse and order.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Publishing checklist
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-3">
              <ChefHat className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              Use a recognizable name and a cuisine customers can scan quickly.
            </li>
            <li className="flex items-start gap-3">
              <Star className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              Start with a realistic rating between 1.0 and 5.0.
            </li>
            <li className="flex items-start gap-3">
              <ImageIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
              Pick a clean image URL that loads publicly without authentication.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
