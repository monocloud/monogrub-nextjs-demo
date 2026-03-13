"use client";

import Link from "next/link";
import { SignIn, SignOut } from "@monocloud/auth-nextjs/components";
import { Utensils, User, ShieldCheck, LogIn } from "lucide-react";
import { Protected } from "@monocloud/auth-nextjs/components/client";
import { useAuth } from "@monocloud/auth-nextjs/client";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="shrink-0 flex items-center">
              <Utensils className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                MonoFood
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Link>

                <Protected groups={["admin"]}>
                  <Link
                    href="/admin"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <ShieldCheck className="h-4 w-4 mr-1" />
                    Admin
                  </Link>
                </Protected>

                <div className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                  <SignOut>Sign Out</SignOut>
                </div>
              </>
            ) : (
              <SignIn className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium flex items-center">
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </SignIn>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
