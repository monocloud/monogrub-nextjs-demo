"use server";

import {
  getSession,
  getTokens,
  isAuthenticated,
  MonoCloudValidationError,
} from "@monocloud/auth-nextjs";
import {
  MonoCloudConflictException,
  MonoCloudForbiddenException,
  MonoCloudKeyValidationException,
  MonoCloudManagementClient,
  MonoCloudPaymentRequiredException,
  MonoCloudUnauthorizedException,
} from "@monocloud/management";
import { NameState, type PasswordState } from "./profile-form";

const apiClient = MonoCloudManagementClient.init({
  domain: process.env.MONOCLOUD_AUTH_TENANT_DOMAIN as string,
  apiKey: process.env.MONOCLOUD_AUTH_API_KEY as string,
});

export const updatePassword = async (
  _prevState: PasswordState,
  formData: FormData,
): Promise<PasswordState> => {
  const authenticated = await isAuthenticated();

  const current_password = (formData.get("current_password") as string) || "";
  const new_password = (formData.get("new_password") as string) || "";
  const confirm_password = (formData.get("confirm_password") as string) || "";

  if (!authenticated) {
    return {
      current_password,
      new_password,
      confirm_password,
      message: "Unauthorized",
    };
  }

  if (new_password !== confirm_password) {
    return {
      current_password,
      new_password,
      confirm_password,
      errors: {
        confirm_password: ["Passwords do not match. Please try again."],
      },
      message: "Validation failed. Please check your inputs.",
    };
  }

  if (new_password && !current_password) {
    return {
      current_password,
      new_password,
      confirm_password,
      errors: {
        current_password: [
          "Current password is required to set a new password.",
        ],
      },
      message: "Validation failed. Please check your inputs.",
    };
  }

  try {
    // 2. Retrieve the session to get the user ID
    const session = await getSession();
    const userId = session?.user?.sub;

    if (!userId) {
      return {
        current_password,
        new_password,
        confirm_password,
        message: "User ID not found in session.",
      };
    }

    // 3. Prepare the request body for MonoCloud
    // Note: The Management SDK usually sets the password directly.
    // We are passing the new plaintext password.
    const requestBody = {
      password: new_password,
      // You likely want to enforce password policies and revoke existing sessions
      // when a user manually changes their password for security reasons.
      skip_password_policy_checks: false,
      revoke_sessions: true,
      is_temporary_password: false,
    };

    // 4. Make the API Call to MonoCloud
    await apiClient.users.setPassword(userId, requestBody);

    return {
      current_password: "",
      new_password: "",
      confirm_password: "",
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update password:", error);

    // Attempt to parse MonoCloud API errors if they provide structured responses
    let errorMessage = "An unexpected error occurred. Please try again later.";
    if (error instanceof Error) {
      // You might want to refine this based on the specific error structures
      // returned by the @monocloud/management SDK (e.g., policy violations)
      errorMessage = error.message;
    }

    return {
      current_password,
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
  const givenName = (formData.get("given_name") as string) || "";
  const familyName = (formData.get("family_name") as string) || "";

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

    const res = await apiClient.users.patchClaims(userId, requestBody);

    const { result } = res;

    const validationErrors: { [key: string]: string[] } = {};

    if (result instanceof MonoCloudKeyValidationException) {
      Object.entries(result.errors).forEach(([key, value]) => {
        validationErrors[key] = value;
      });

      return {
        given_name: givenName,
        family_name: familyName,
        errors: validationErrors,
        message: "",
      };
    }

    if (
      result instanceof MonoCloudForbiddenException ||
      result instanceof MonoCloudUnauthorizedException
    ) {
      return {
        given_name: givenName,
        family_name: familyName,
        errors: {},
        message: result.response?.detail ?? "Unauthorized",
      };
    }

    if (result instanceof MonoCloudConflictException) {
      return {
        given_name: givenName,
        family_name: familyName,
        errors: {},
        message: result.response?.detail ?? "Conflit",
      };
    }

    if (result instanceof MonoCloudPaymentRequiredException) {
      return {
        given_name: givenName,
        family_name: familyName,
        errors: {},
        message: result.response?.detail ?? "Payment Required",
      };
    }

    return {
      given_name: givenName,
      family_name: familyName,
      message: "Name updated successfully!",
    };
  } catch (error) {
    console.error("Failed to update name:", error);

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
