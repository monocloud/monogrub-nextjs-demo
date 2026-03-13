import { NextResponse } from "next/server";
import { getSession, isUserInGroup } from "@monocloud/auth-nextjs";
import { getDb, saveDb } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = await isUserInGroup(["admin"]);

  if (!isAdmin) {
    return NextResponse.json(
      { error: "Forbidden: Admins only" },
      { status: 403 },
    );
  }

  try {
    const { name, cuisine, rating, image } = await req.json();
    const db = getDb();

    const newRestaurant = {
      id: `REST-${Math.floor(Math.random() * 10000)}`,
      name,
      cuisine,
      rating,
      image,
    };

    db.restaurants.push(newRestaurant);
    saveDb(db);

    return NextResponse.json({ success: true, restaurant: newRestaurant });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
