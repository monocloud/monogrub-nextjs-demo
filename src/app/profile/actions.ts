"use server";

import { getSession, protect } from "@monocloud/auth-nextjs";
import { MonoCloudIdentityValidationException } from "@monocloud/management";
import { apiClient } from "../api-client";

export type NameState = {
  given_name?: string | null;
  family_name?: string | null;
  formErrors?: string[];
  success?: boolean;
};

export type PasswordState = {
  old_password: string;
  new_password: string;
  confirm_password: string;
  formErrors?: string[];
  success?: boolean;
};

export const updateName = async (
  _prevState: NameState,
  formData: FormData,
): Promise<NameState> => {
  await protect();

  const givenName = ((formData.get("given_name") as string) || "").trim();
  const familyName = ((formData.get("family_name") as string) || "").trim();

  const normalizedGivenName = givenName || null;
  const normalizedFamilyName = familyName || null;

  try {
    let session = await getSession();
    const userId = session?.user?.sub;

    if (!userId) {
      throw new Error("User ID not found in session.");
    }

    await apiClient.users.patchClaims(userId, {
      given_name: normalizedGivenName,
      family_name: normalizedFamilyName,
    });

    session = await getSession({ refetchUserInfo: true });

    return {
      given_name: session?.user.given_name,
      family_name: session?.user.family_name,
      success: true,
    };
  } catch (error) {
    console.error("Failed to update name:", error);

    if (error instanceof MonoCloudIdentityValidationException) {
      const formErrors = error.errors.map((item) => item.description);

      return {
        given_name: normalizedGivenName,
        family_name: normalizedFamilyName,
        formErrors,
        success: false,
      };
    }

    const formErrors = [
      (error as Error)?.message ??
        "An unexpected error occurred. Please try again.",
    ];

    return {
      given_name: normalizedGivenName,
      family_name: normalizedFamilyName,
      formErrors,
      success: false,
    };
  }
};

export const updatePassword = async (
  _prevState: PasswordState,
  formData: FormData,
): Promise<PasswordState> => {
  await protect();

  const old_password = (formData.get("old_password") as string) || "";
  const new_password = (formData.get("new_password") as string) || "";
  const confirm_password = (formData.get("confirm_password") as string) || "";

  if (!old_password.length || !new_password.length || !confirm_password.length) {
    return {
      old_password,
      new_password,
      confirm_password,
      formErrors: ["All fields are required."],
      success: false,
    }
  };

  if (new_password !== confirm_password) {
    return {
      old_password,
      new_password,
      confirm_password,
      formErrors: ["New passwords do not match. Please try again."],
      success: false,
    };
  }

  try {
    const session = await getSession();
    const userId = session?.user?.sub;

    if (!userId) {
      throw new Error("User ID not found in session.");
    }

    await apiClient.users.changePassword(userId, {
      old_password,
      new_password,
    });

    return {
      old_password: "",
      new_password: "",
      confirm_password: "",
      success: true,
    };
  } catch (error) {
    console.error("Failed to update password:", error);

    if (error instanceof MonoCloudIdentityValidationException) {
      const formErrors = error.errors.map((item) => item.description);

      return {
        old_password: "",
        new_password: "",
        confirm_password: "",
        formErrors,
        success: false,
      };
    }

    const formErrors = [
      (error as Error)?.message ??
        "An unexpected error occurred. Please try again.",
    ];

    return {
      old_password: "",
      new_password: "",
      confirm_password: "",
      formErrors,
      success: false,
    };
  }
};
