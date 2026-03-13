"use server";

import { getDb } from "@/lib/db";

export async function fetchUserHistory(userId: string) {
  const db = getDb();

  const userOrders = db.orders.filter((o) => o.userId === userId);

  const userInvoices = db.invoices.filter((i) =>
    userOrders.some((o) => o.id === i.orderId),
  );

  const ordersWithRestaurants = userOrders.map((order) => {
    const restaurant = db.restaurants.find((r) => r.id === order.restaurantId);
    return {
      ...order,
      restaurantName: restaurant?.name || "Unknown Restaurant",
    };
  });

  return {
    orders: ordersWithRestaurants,
    invoices: userInvoices,
  };
}
