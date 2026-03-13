import { ShieldAlert } from "lucide-react";

export default function AccessDeniedPage() {
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <ShieldAlert className="mx-auto h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
      <p className="text-gray-500">
        You do not have permission to view this page. This area is restricted to
        administrators.
      </p>
    </div>
  );
}
