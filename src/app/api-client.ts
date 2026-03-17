import { MonoCloudManagementClient } from "@monocloud/management";

export const apiClient = MonoCloudManagementClient.init({
  domain: process.env.MONOCLOUD_AUTH_TENANT_DOMAIN as string,
  apiKey: process.env.MONOCLOUD_API_KEY as string,
});

