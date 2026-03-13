import { NextResponse } from "next/server";
import { getSession } from "@monocloud/auth-nextjs";
import { getDb, saveDb } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { restaurantId, total } = await req.json();
    const db = getDb();

    const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
    const invoiceId = `INV-${Math.floor(Math.random() * 10000)}`;
    const date = new Date().toISOString().split("T")[0];

    const newOrder = {
      id: orderId,
      userId: String(session.user.sub || session.user.id || "unknown-user"),
      restaurantId,
      total,
      status: "Processing",
      date,
    };

    const newInvoice = {
      id: invoiceId,
      orderId,
      amount: total,
      date,
    };

    db.orders.push(newOrder);
    db.invoices.push(newInvoice);
    saveDb(db);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
