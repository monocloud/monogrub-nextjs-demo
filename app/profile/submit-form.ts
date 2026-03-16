"use server";

import {
  getSession,
  isAuthenticated,
} from "@monocloud/auth-nextjs";
import {
  ChangePasswordRequest,
  MonoCloudConflictException,
  MonoCloudException,
  MonoCloudForbiddenException,
  MonoCloudIdentityValidationException,
  MonoCloudKeyValidationException,
  MonoCloudManagementClient,
  MonoCloudPaymentRequiredException,
  MonoCloudUnauthorizedException,
} from "@monocloud/management";
import { NameState, type PasswordState } from "./profile-form";

const apiClient = MonoCloudManagementClient.init({
  domain: process.env.MONOCLOUD_AUTH_TENANT_DOMAIN as string,
  apiKey: process.env.MONOCLOUD_API_KEY as string,
});

export const updatePassword = async (
  _prevState: PasswordState,
  formData: FormData,
): Promise<PasswordState> => {
  const authenticated = await isAuthenticated();

  const old_password = (formData.get("old_password") as string) || "";
  const new_password = (formData.get("new_password") as string) || "";
  const confirm_password = (formData.get("confirm_password") as string) || "";

  if (!authenticated) {
    return {
      old_password,
      new_password,
      confirm_password,
      message: "Unauthorized",
    };
  }

  if (new_password !== confirm_password) {
    return {
      old_password,
      new_password,
      confirm_password,
      errors: {
        confirm_password: ["Passwords do not match. Please try again."],
      },
      message: "Validation failed. Please check your inputs.",
    };
  }

  try {
    const session = await getSession();
    const userId = session?.user?.sub;

    if (!userId) {
      return {
        old_password,
        new_password,
        confirm_password,
        message: "User ID not found in session.",
      };
    }

    // Note: The Management SDK usually sets the password directly.
    // We are passing the new plaintext password.
    const requestBody: ChangePasswordRequest = {
      old_password,
      new_password: new_password,
    };

    await apiClient.users.changePassword(userId, requestBody);

    return {
      old_password: "",
      new_password: "",
      confirm_password: "",
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update password:", error);

    if (error instanceof MonoCloudIdentityValidationException) {
      const errors = error.errors.map((x) => x.description);

      return {
        old_password,
        new_password,
        confirm_password: "",
        errors: {
          old_password: errors,
        },
        message: "Error Updating password",
      };
    }

    if (error instanceof MonoCloudKeyValidationException) {
      const errors: { [key: string]: string[] } = {};

      Object.entries(error.errors).forEach(([key, value]) => {
        errors[key] = value;
      });

      return {
        old_password,
        new_password,
        confirm_password: "",
        errors: errors,
        message: "Error Updating password",
      };
    }

    if (
      error instanceof MonoCloudForbiddenException ||
      error instanceof MonoCloudUnauthorizedException
    ) {
      return {
        old_password,
        new_password,
        confirm_password: "",
        errors: {},
        message: error.response?.detail ?? "Unauthorized",
      };
    }

    if (error instanceof MonoCloudConflictException) {
      return {
        old_password,
        new_password,
        confirm_password: "",
        errors: {},
        message: error.response?.detail ?? "Conflit",
      };
    }

    if (error instanceof MonoCloudPaymentRequiredException) {
      return {
        old_password,
        new_password,
        confirm_password: "",
        errors: {},
        message: error.response?.detail ?? "Payment Required",
      };
    }

    if (error instanceof MonoCloudException) {
      return {
        old_password,
        new_password,
        confirm_password: "",
        errors: {},
        message: error.message ?? "Payment Required",
      };
    }

    let errorMessage = "An unexpected error occurred. Please try again later.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      old_password,
      new_password,
      confirm_password,
      message: errorMessage,
    };
  }
};

export const updateName = async (
  _prevState: NameState,
  formData: FormData,
): Promise<NameState> => {
  const authenticated = await isAuthenticated();
  const givenName = (formData.get("given_name") as string) || null;
  const familyName = (formData.get("family_name") as string) || null;

  if (!authenticated) {
    return {
      given_name: givenName,
      family_name: familyName,
      message: "Unauthorized",
    };
  }

  try {
    const session = await getSession();
    const userId = session?.user?.sub;

    if (!userId) {
      return {
        given_name: givenName,
        family_name: familyName,
        errors: {},
        message: "User ID not found in session.",
      };
    }

    const requestBody = {
      given_name: givenName,
      family_name: familyName,
    };

    await apiClient.users.patchClaims(userId, requestBody);

    return {
      given_name: givenName,
      family_name: familyName,
      message: "Name updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update name:", error);

    const validationErrors: { [key: string]: string[] } = {};

    if (error instanceof MonoCloudIdentityValidationException) {
      const errors = error.errors.map((x) => x.description);

      return {
        given_name: givenName,
        family_name: familyName,
        errors: {},
        message: errors,
      };
    }

    if (
      error instanceof MonoCloudForbiddenException ||
      error instanceof MonoCloudUnauthorizedException
    ) {
      return {
        given_name: givenName,
        family_name: familyName,
        errors: {},
        message: error.response?.detail ?? "Unauthorized",
      };
    }

    if (error instanceof MonoCloudConflictException) {
      return {
        given_name: givenName,
        family_name: familyName,
        errors: {},
        message: error.response?.detail ?? "Conflit",
      };
    }

    let errorMessage = "An unexpected error occurred. Please try again later.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      given_name: givenName,
      family_name: familyName,
      errors: {},
      message: errorMessage,
    };
  }
};
