import { getDb } from "@/lib/db";
import { Protected } from "@monocloud/auth-nextjs/components/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ArrowLeft } from "lucide-react";
import { PlaceOrderButton } from "./place-order-button";
import { SignIn } from "@monocloud/auth-nextjs/components";

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();
  const restaurant = db.restaurants.find((r) => r.id === id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to restaurants
      </Link>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="relative h-64 w-full">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-2xl leading-6 font-bold text-gray-900">
              {restaurant.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {restaurant.cuisine}
            </p>
          </div>
          <div className="flex items-center bg-green-100 px-3 py-1 rounded-full text-green-800 font-medium">
            <Star className="h-5 w-5 mr-1 fill-current" />
            {restaurant.rating}
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Menu</h4>
          <ul className="divide-y divide-gray-200 mb-8">
            <li className="py-4 flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Signature Dish
                </p>
                <p className="text-sm text-gray-500">
                  The best {restaurant.cuisine} food in town.
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">$15.00</p>
            </li>
            <li className="py-4 flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  House Special
                </p>
                <p className="text-sm text-gray-500">
                  Chef&apos;s recommendation.
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">$20.00</p>
            </li>
          </ul>

          <div className="mt-6">
            <Protected fallback={<div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-3">
                You must be signed in to place an order.
              </p>
              <SignIn
                returnUrl={`/restaurant/${restaurant.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign in to order
              </SignIn>
            </div>
            }>
              <PlaceOrderButton restaurantId={restaurant.id} />
            </Protected>
          </div>
        </div>
      </div>
    </div>
  );
}
