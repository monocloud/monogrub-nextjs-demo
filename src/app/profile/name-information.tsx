'use client';

import { MonoCloudUser } from "@monocloud/auth-nextjs";
import { Loader2, Save, User } from "lucide-react";
import { useActionState, useEffect } from "react";
import { NameState, updateName } from "./actions";
import { toast } from "sonner";

export const NameInformation = ({ user }: { user: MonoCloudUser }) => {
    const [nameState, formNameAction, namePending] = useActionState(updateName, {
        given_name: user?.given_name ?? "",
        family_name: user?.family_name ?? "",
        success: false,
    } satisfies NameState);

    useEffect(() => {
        if (nameState.success) {
            toast.success('Name updated successfully');
        }
    }, [nameState]);

    return (
        <form action={formNameAction} className='space-y-5 mb-4 pb-4 border-b border-gray-200'>
            <div className='flex items-start justify-between gap-3'>
                <div>
                    <h3 className='text-lg font-medium text-gray-900 flex items-center'>
                        <User className='h-5 w-5 mr-2 text-indigo-500' />
                        Name Information
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                        Update how your name appears across your account.
                    </p>
                </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
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
                            defaultValue={nameState?.given_name ?? ''}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2.5 border border-gray-300"
                            autoComplete='given-name'
                        />
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
                            defaultValue={nameState?.family_name ?? ''}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md p-2.5 border border-gray-300"
                            autoComplete='family-name'
                        />
                    </div>
                </div>
            </div>

            {nameState.formErrors?.length ? (
                <ul className='rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                    {nameState.formErrors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            ) : null}

            <div className='mt-4'>
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
                    Save Changes
                </button>
            </div>
        </form>
    );
}
