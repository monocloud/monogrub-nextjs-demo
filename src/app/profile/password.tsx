"use client";

import { useActionState, useEffect } from "react";
import { Lock, Save, Loader2 } from "lucide-react";
import { PasswordState, updatePassword } from "./actions";
import { toast } from "sonner";

export function Password() {
  const [passwordState, formPasswordAction, passwordPending] = useActionState(
    updatePassword,
    {
      old_password: "",
      new_password: "",
      confirm_password: "",
    } satisfies PasswordState,
  );

  useEffect(() => {
    if (passwordState.success) {
      toast.success('Password updated successfully');
    }
  }, [passwordState]);

  return (
    <>
      <form action={formPasswordAction} className='space-y-4 mb-4 pb-4 border-b border-gray-200'>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <h3 className='text-lg font-medium text-gray-900 flex items-center'>
              <Lock className='h-5 w-5 mr-2 text-indigo-500' />
              Password
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Update the password used for signing in to your account.
            </p>
          </div>
        </div>

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
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border border-gray-300"
            />
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
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border border-gray-300"
            />
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
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2 border border-gray-300"
            />
          </div>
        </div>

        {passwordState.formErrors?.length ? (
          <ul className='rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
            {passwordState.formErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}

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
      </form>
    </>
  );
}
