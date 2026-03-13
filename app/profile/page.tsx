import { getSession } from "@monocloud/auth-nextjs";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { ProfileForm } from "./profile-form";
import { FileText, ShoppingBag, Clock } from "lucide-react";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const db = getDb();
  const userId = String(session.user.sub || session.user.id || "unknown-user");

  const userOrders = db.orders.filter((o) => o.userId === userId);
  const userInvoices = db.invoices.filter((i) =>
    userOrders.some((o) => o.id === i.orderId),
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Details
            </h2>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base text-gray-900">
                {String(session.user.email || "")}
              </p>
            </div>
            <ProfileForm />
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-indigo-500" />
                Order History
              </h3>
            </div>
            <div className="px-6 py-5">
              {userOrders.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  You haven&apos;t placed any orders yet.
                </p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {userOrders.map((order) => {
                    const restaurant = db.restaurants.find(
                      (r) => r.id === order.restaurantId,
                    );
                    return (
                      <li
                        key={order.id}
                        className="py-4 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {restaurant?.name || "Unknown Restaurant"}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {order.date}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            {order.status}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-500" />
                Invoices
              </h3>
            </div>
            <div className="px-6 py-5">
              {userInvoices.length === 0 ? (
                <p className="text-gray-500 text-sm">No invoices available.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {userInvoices.map((invoice) => (
                    <li
                      key={invoice.id}
                      className="py-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Invoice #{invoice.id}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Order #{invoice.orderId}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          ${invoice.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {invoice.date}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
