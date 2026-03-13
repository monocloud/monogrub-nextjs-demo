import { getDb } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Home() {
  const db = getDb();
  const restaurants = db.restaurants;

  return (
    <div>
      <div className="mb-8">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-indigo-700">
                This is a dummy dashboard showcasing{" "}
                <a
                  href="https://monocloud.com"
                  className="font-bold underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  MonoCloud
                </a>{" "}
                authentication features. It demonstrates protected routes,
                role-based access control (RBAC), and user profile management.
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to MonoFood
        </h1>
        <p className="mt-2 text-gray-600">
          Discover and order from the best restaurants around you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white overflow-hidden shadow rounded-lg flex flex-col"
          >
            <div className="relative h-48 w-full">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center bg-green-100 px-2 py-1 rounded text-green-800 text-sm font-medium">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {restaurant.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {restaurant.cuisine}
                </p>
              </div>
              <Link
                href={`/restaurant/${restaurant.id}`}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Menu & Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
