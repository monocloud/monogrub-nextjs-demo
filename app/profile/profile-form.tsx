"use client";

import { useActionState, useEffect, useState } from "react";
import { User, Lock, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateName, updatePassword } from "./submit-form";
import { useAuth } from "@monocloud/auth-nextjs/client";

// 1. Types remain exactly the same
export type PasswordState = {
  old_password: string;
  new_password: string;
  confirm_password: string;
  errors?: {
    old_password?: string[];
    new_password?: string[];
    confirm_password?: string[];
  };
  message?: string | null;
};

export type NameState = {
  given_name?: string | null;
  family_name?: string | null;
  errors?: {
    given_name?: string[];
    family_name?: string[];
  };
  message?: string | null | string[];
};

export function ProfileForm() {
  const { user, refetch } = useAuth();
  const [nameErrors, setNameErrors] = useState<string[]>([]);

  const [passwordState, formPasswordAction, passwordPending] = useActionState(
    updatePassword,
    {
      old_password: "",
      new_password: "",
      confirm_password: "",
    } satisfies PasswordState,
  );

  const [nameState, formNameAction, namePending] = useActionState(updateName, {
    given_name: user?.given_name ?? "",
    family_name: user?.family_name ?? "",
  } satisfies NameState);

  useEffect(() => {
    if (!nameState?.message) return;

    refetch();

    if (!nameState.errors) {
      toast.success(nameState.message);
    } else if (typeof nameState.message === "string") {
      toast.error(nameState.message);
    } else {
      setNameErrors(nameState.message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameState]);

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
    <div className='space-y-8'>
      <form action={formNameAction} className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900 flex items-center'>
          <User className='h-5 w-5 mr-2 text-indigo-500' />
          Change Name
        </h3>
        <div>
          <label
            htmlFor='given_name'
            className='block text-sm font-medium text-gray-700'
          >
            First Name
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='given_name'
              id='given_name'
              defaultValue={nameState?.given_name || user?.given_name}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                nameState.errors?.given_name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder='John'
            />
            {nameState.errors?.given_name && (
              <p className='mt-2 text-sm text-red-600'>
                {nameState.errors.given_name[0]}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor='family_name'
            className='block text-sm font-medium text-gray-700'
          >
            Last Name
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='family_name'
              id='family_name'
              defaultValue={nameState?.family_name || user?.family_name}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                nameState.errors?.family_name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder='Doe'
            />
            {nameState.errors?.family_name && (
              <p className='mt-2 text-sm text-red-600'>
                {nameState.errors.family_name[0]}
              </p>
            )}
          </div>
        </div>

        <button
          type='submit'
          disabled={namePending}
          className='inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
        >
          {namePending ? (
            <Loader2 className='animate-spin h-4 w-4 mr-2' />
          ) : (
            <Save className='h-4 w-4 mr-2' />
          )}
          Update Name
        </button>

        {nameErrors.length > 0 ? (
          <ul className='mt-6'>
            {nameErrors.map((error) => (
              <li key={error} className='text-red-500'>
                {error}
              </li>
            ))}
          </ul>
        ) : null}
      </form>

      <form action={formPasswordAction} className='space-y-4'>
        <div className='border-t border-gray-200 pt-8'>
          <h3 className='text-lg font-medium text-gray-900 flex items-center'>
            <Lock className='h-5 w-5 mr-2 text-indigo-500' />
            Change Password
          </h3>
          <div className='space-y-4 mt-4'>
            <div>
              <label
                htmlFor='old_password'
                className='block text-sm font-medium text-gray-700'
              >
                Current Password
              </label>
              <div className='mt-1'>
                <input
                  type='password'
                  name='old_password'
                  id='old_password'
                  defaultValue={passwordState.old_password}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                    passwordState.errors?.old_password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordState.errors?.old_password && (
                  <p className='mt-2 text-sm text-red-600'>
                    {passwordState.errors.old_password[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='new_password'
                className='block text-sm font-medium text-gray-700'
              >
                New Password
              </label>
              <div className='mt-1'>
                <input
                  type='password'
                  name='new_password'
                  id='new_password'
                  defaultValue={passwordState.new_password}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                    passwordState.errors?.new_password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordState.errors?.new_password && (
                  <p className='mt-2 text-sm text-red-600'>
                    {passwordState.errors.new_password[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='confirm_password'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm New Password
              </label>
              <div className='mt-1'>
                <input
                  type='password'
                  name='confirm_password'
                  id='confirm_password'
                  defaultValue={passwordState.confirm_password}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border ${
                    passwordState.errors?.confirm_password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {passwordState.errors?.confirm_password && (
                  <p className='mt-2 text-sm text-red-600'>
                    {passwordState.errors.confirm_password[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              disabled={passwordPending}
              className='inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
            >
              {passwordPending ? (
                <Loader2 className='animate-spin h-4 w-4 mr-2' />
              ) : (
                <Save className='h-4 w-4 mr-2' />
              )}
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
