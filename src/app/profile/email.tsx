import { MonoCloudUser } from "@monocloud/auth-nextjs";
import { Mail } from "lucide-react";

export const Email = ({ user }: { user: MonoCloudUser }) => <div className="space-y-4 mb-4 pb-4 border-b border-gray-200">
    <div className='flex items-start justify-between gap-3'>
        <div>
            <h3 className='text-lg font-medium text-gray-900 flex items-center'>
            <Mail className='h-5 w-5 mr-2 text-indigo-500' />
                Email
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
                Your primary sign-in address for this account.
            </p>
        </div>
    </div>

    <div>
        <label className='block text-sm font-medium text-gray-700'>
            Email
        </label>
        <div className='mt-1'>
            <div className='shadow-sm rounded-md border w-full border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900'>
                {user.email}
            </div>
        </div>
    </div>

</div>
