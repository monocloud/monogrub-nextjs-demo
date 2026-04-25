import { getSession } from "@monocloud/auth-nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Store } from "lucide-react";
import { getDb } from "@/lib/db";
import { AdminForm } from "./admin-form";

export default async function AdminPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  const db = getDb();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="relative overflow-hidden rounded-4xl bg-linear-to-br from-slate-950 via-slate-900 to-indigo-800 px-6 py-8 text-white shadow-2xl sm:px-8 sm:py-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.35),transparent_60%)] lg:block" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
              Admin workspace
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Launch a new restaurant listing
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                View customer storefront
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <Store className="h-5 w-5 text-indigo-100" />
              <p className="mt-3 text-2xl font-semibold">{db.restaurants.length}</p>
              <p className="text-sm text-slate-200">Published restaurants</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-900">
            Register a restaurant
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Fill in the essential listing details below. The preview updates as
            you type so you can validate the page before publishing.
          </p>
        </div>
        <AdminForm />
      </section>
    </div>
  );
}
