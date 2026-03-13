"use client";

import { useActionState, useEffect } from "react";
import { User, Lock, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateName, updatePassword } from "./submit-form";
import { useAuth } from "@monocloud/auth-nextjs/client";

// 1. Types remain exactly the same
export type PasswordState = {
  current_password: string;
  new_password: string;
  confirm_password: string;
  errors?: {
    current_password?: string[];
    new_password?: string[];
    confirm_password?: string[];
  };
  message?: string | null;
};

export type NameState = {
  name: string;
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export function ProfileForm() {
  const { user, refetch } = useAuth();

  const [passwordState, formPasswordAction, passwordPending] = useActionState(
    updatePassword,
    {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  );

  const [nameState, formNameAction, namePending] = useActionState(updateName, {
    name: user?.name ?? "",
  });

  // --- Trigger Sonner Toast for Name Updates ---
  useEffect(() => {
    if (nameState?.message) {
      refetch();
      if (nameState.errors) {
        toast.error(nameState.message);
      } else {
        toast.success(nameState.message);
      }
    }
  }, [nameState, refetch]); // Runs whenever the action returns a new state object

  // --- Trigger Sonner Toast for Password Updates ---
  useEffect(() => {
    if (passwordState?.message) {
      if (passwordState.errors) {
        toast.error(passwordState.message);
      } else {
        toast.success(passwordState.message);
      }
    }
  }, [passwordState]);

  return (
    <div className="space-y-8">
      <form action={formNameAction} className="space-y-4">
        {/* --- NAME SECTION --- */}
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <User className="h-5 w-5 mr-2 text-indigo-500" />
          Change Name
        </h3>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user?.name}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                nameState.errors?.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
            {nameState.errors?.name && (
              <p className="mt-2 text-sm text-red-600">
                {nameState.errors.name[0]}
              </p>
            )}
          </div>
        </div>

        {/* Note: Inline message block removed because sonner handles the UI now */}

        <button
          type="submit"
          disabled={namePending}
          className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {namePending ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Update Name
        </button>
      </form>

      <form action={formPasswordAction} className="space-y-4">
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-indigo-500" />
            Change Password
          </h3>
          <div className="space-y-4 mt-4">
            <div>
              <label
                htmlFor="current_password"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="current_password"
                  id="current_password"
                  defaultValue={passwordState.current_password}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                    passwordState.errors?.current_password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordState.errors?.current_password && (
                  <p className="mt-2 text-sm text-red-600">
                    {passwordState.errors.current_password[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  defaultValue={passwordState.new_password}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                    passwordState.errors?.new_password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordState.errors?.new_password && (
                  <p className="mt-2 text-sm text-red-600">
                    {passwordState.errors.new_password[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  defaultValue={passwordState.confirm_password}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                    passwordState.errors?.confirm_password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordState.errors?.confirm_password && (
                  <p className="mt-2 text-sm text-red-600">
                    {passwordState.errors.confirm_password[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={passwordPending}
              className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {passwordPending ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
