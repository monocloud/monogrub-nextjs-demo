import { protectApi } from "@monocloud/auth-nextjs";
import { NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";

export const POST = protectApi(
  async (req: Request) => {
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
  },
  {
    groups: ["admin"],
  },
);
