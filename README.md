<div align="center">
  <a href="https://www.monocloud.com?utm_source=github&utm_medium=monofood" target="_blank" rel="noopener noreferrer">
    <picture>
      <img src="https://raw.githubusercontent.com/monocloud/MonoFood/refs/heads/main/banner.svg?token=GHSAT0AAAAAADSOYQQK6BU7IWO67JGSQEEM2NTWTLQ" alt="MonoCloud Banner">
    </picture>
  </a>
</div>
<br />

# MonoFood

MonoFood is an example food ordering and invoicing applictaion build with MonoCloud authentication.

## Features

- **User Authentication**: Secure login and registration powered by MonoCloud.
- **Product Catalog**: Browse a variety of food items.
- **Invoicing**: Automatically generate invoices for completed orders.
- **Profile Management**: View and update user profile information using MonoCloud's [Management SDK](https://github.com/monocloud/management-js).

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Create a [MonoCloud account](https://dashboard.monocloud.dev/api/auth/signin?prompt=create)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/monocloud/monofood.git
   cd monofood
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your MonoCloud credentials:

   ```env
   MONOCLOUD_AUTH_TENANT_DOMAIN=<your-tenant-domain>
   MONOCLOUD_AUTH_CLIENT_ID=<your-client-id>
   MONOCLOUD_AUTH_CLIENT_SECRET=<your-client-secret>
   MONOCLOUD_AUTH_SCOPES=openid profile email groups
   MONOCLOUD_AUTH_APP_URL=http://localhost:3000
   MONOCLOUD_AUTH_COOKIE_SECRET=<your-cookie-secret>
   MONOCLOUD_AUTH_API_KEY=<your-monocloud-api-key>
   MONOCLOUD_AUTH_REFETCH_USER_INFO=true
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
