<div align="center">
  <a href="https://www.monocloud.com?utm_source=github&utm_medium=monogrub_demo" target="_blank" rel="noopener noreferrer">
    <picture>
      <img src="https://raw.githubusercontent.com/monocloud/monogrub-nextjs-demo/refs/heads/main/banner.svg" alt="MonoCloud Banner">
    </picture>
  </a>
</div>
<br />

# MonoGrub Next.js Demo

MonoGrub is a sample food ordering and invoicing app that demonstrates how to integrate MonoCloud into a Next.js application.

It shows how to add authentication, protected pages, profile management, and user-driven experiences to a modern web application using MonoCloud.

## Features

- **Authentication**: Sign up, sign in, and sign out with MonoCloud.
- **Protected Routes**: Restrict access to authenticated users.
- **Profile Management**: View and update basic profile information using MonoCloud's [Management SDK](https://github.com/monocloud/management-js).

## Getting Started

### Prerequisites

- Node.js 20 or later 
- Create a [MonoCloud account](https://dashboard.monocloud.com/api/auth/signin?prompt=create)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/monocloud/monogrub-nextjs-demo.git
   cd monogrub-nextjs-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env.local file in the project root and add your MonoCloud credentials:

   ```env
   MONOCLOUD_AUTH_TENANT_DOMAIN=<your-tenant-domain>
   MONOCLOUD_AUTH_CLIENT_ID=<your-client-id>
   MONOCLOUD_AUTH_CLIENT_SECRET=<your-client-secret>
   MONOCLOUD_AUTH_SCOPES=openid profile email groups
   MONOCLOUD_AUTH_APP_URL=http://localhost:3000
   MONOCLOUD_AUTH_COOKIE_SECRET=<your-cookie-secret>
   MONOCLOUD_AUTH_REFETCH_USER_INFO=true
   MONOCLOUD_AUTH_REFETCH_STRICT_PROFILE_SYNC=true
   MONOCLOUD_API_KEY=<your-monocloud-api-key>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open `http://localhost:3000` in your browser.

## What this example demonstrates

MonoGrub can be used as a reference for building applications with:
- User authentication
- Protected pages
- Profile updates
- MonoCloud Management SDK integration

Learn more
- [MonoCloud Website](https://monocloud.com?utm_source=github&utm_medium=monogrub_demo)
- [MonoCloud Documentation](https://www.monocloud.com/docs??utm_source=github&utm_medium=monogrub_demo)
- [MonoCloud Management SDK](https://github.com/monocloud/management-js)