import { getSession } from "@monocloud/auth-nextjs";
import { redirect } from "next/navigation";
import { AdminForm } from "./admin-form";

export default async function AdminPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage restaurants and platform settings.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Register New Restaurant
        </h2>
        <AdminForm />
      </div>
    </div>
  );
}
