import { protectPage } from "@monocloud/auth-nextjs";
import { getDb } from "@/lib/db";
import { Password } from "./password";
import { FileText, ShoppingBag, Clock } from "lucide-react";
import { Email } from "./email";
import { NameInformation } from "./name-information";

const ProfilePage = protectPage(async ({ user }) => {
  const db = getDb();

  const userOrders = db.orders.filter((o) => o.userId === user.sub);

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

            <div className='space-y-8'>
              <Email user={user} />
              <NameInformation user={user} />
              <Password />
            </div>
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
})

export default ProfilePage;