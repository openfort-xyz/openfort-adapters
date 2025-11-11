# Openfort Better Auth Example

This is a Next.js example demonstrating the `@openfort/better-auth` plugin with encryption session support.

## Features

- Email/Password authentication using Better Auth
- Secure encryption session creation for wallet recovery
- Integration with Openfort's Shield API

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file and update with your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
OPENFORT_API_KEY=sk_test_your_openfort_api_key_here
SHIELD_API_KEY=your_shield_api_key_here
SHIELD_SECRET_KEY=your_shield_secret_key_here
SHIELD_ENCRYPTION_PART=your_encryption_part_here
```

Get your credentials from the [Openfort Dashboard](https://dashboard.openfort.io).

### 3. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Server Side (`src/lib/auth.ts`)

The Better Auth server is configured with the Openfort plugin:

```typescript
import { betterAuth } from "better-auth";
import { openfort, encryptionSession } from "@openfort/better-auth";

export const auth = betterAuth({
  emailAndPassword: { enabled: true },
  plugins: [
    openfort({
      client: openfortSDK,
      use: [
        encryptionSession({
          config: {
            apiKey: process.env.SHIELD_API_KEY!,
            secretKey: process.env.SHIELD_SECRET_KEY!,
            encryptionPart: process.env.SHIELD_ENCRYPTION_PART!,
          },
        }),
      ],
    }),
  ],
  database: new Database("sqlite.db"),
});
```

### Client Side (`src/lib/auth-client.ts`)

The Better Auth client is configured with the Openfort client plugin:

```typescript
import { createAuthClient } from "better-auth/react";
import { openfortClient } from "@openfort/better-auth";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [openfortClient()],
});
```

### Creating Encryption Sessions

Once authenticated, you can create encryption sessions:

```typescript
const result = await authClient.createEncryptionSession();

if (result.success) {
  console.log("Session ID:", result.sessionId);
}
```

The encryption part is configured on the server side, so the client doesn't need to provide it.

## Project Structure

```
example/
├── src/
│   ├── app/
│   │   ├── api/auth/[...all]/route.ts  # Better Auth API routes
│   │   ├── layout.tsx                  # Root layout
│   │   └── page.tsx                    # Main page with examples
│   ├── components/
│   │   ├── Login.tsx                   # Login form
│   │   ├── Register.tsx                # Registration form
│   │   └── Me.tsx                      # User profile display
│   └── lib/
│       ├── auth.ts                     # Server-side auth config
│       ├── auth-client.ts              # Client-side auth config
│       └── openfort.ts                 # Openfort SDK instance
├── .env.example                        # Environment variables template
└── package.json
```

## Learn More

- [Openfort Documentation](https://www.openfort.xyz/docs)
- [Better Auth Documentation](https://www.better-auth.com)
- [@openfort/better-auth Plugin](../README.md)
