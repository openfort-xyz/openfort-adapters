# @openfort/better-auth

A [Better Auth](https://github.com/better-auth/better-auth) plugin for integrating [Openfort](https://openfort.io) wallets into your authentication flow.

## Features

- **Encryption Session Support**: Securely create encryption sessions for wallet recovery
- **Seamless Integration**: Works with Better Auth's authentication flow
- **TypeScript Support**: Fully typed for better developer experience

## Installation

```bash
pnpm add better-auth @openfort/better-auth @openfort/openfort-node
```

## Setup

### 1. Get Your Openfort API Keys

Go to your [Openfort Dashboard](https://dashboard.openfort.xyz) and create an API key and secret key.

```bash
# .env
OPENFORT_API_KEY=sk_test_...
OPENFORT_SECRET_KEY=...
```

### 2. Configure BetterAuth Server

```typescript
import { betterAuth } from "better-auth";
import { openfort, encryptionSession } from "@openfort/better-auth";
import Openfort from "@openfort/openfort-node";

const openfortClient = new Openfort("sk_test_...");

const auth = betterAuth({
  // ... Better Auth config
  plugins: [
    openfort({
      client: openfortClient,
      use: [
        encryptionSession({
          config: {
            apiKey: process.env.OPENFORT_API_KEY!,
            secretKey: process.env.OPENFORT_SECRET_KEY!,
          },
        }),
      ],
    }),
  ],
});
```

### 3. Configure BetterAuth Client

```typescript
import { createAuthClient } from "better-auth/react";
import { openfortClient } from "@openfort/better-auth";

export const authClient = createAuthClient({
  plugins: [openfortClient()],
});
```

## Usage

### Encryption Session

The encryption session plugin allows authenticated users to create secure encryption sessions for wallet recovery.

#### Server Configuration

The `encryptionSession` plugin is included in the `use` array and requires the encryption session configuration:

```typescript
encryptionSession({
  config: {
    apiKey: process.env.OPENFORT_API_KEY!,
    secretKey: process.env.OPENFORT_SECRET_KEY!,
    shieldAPIBaseURL: "https://shield.openfort.io", // Optional
  },
})
```

#### Client Usage

```typescript
import { authClient } from "./auth-client";

// Create an encryption session
try {
  const { sessionId, success } = await authClient.createEncryptionSession(
    "encryption_part_data"
  );

  console.log("Encryption session created:", sessionId);
} catch (error) {
  console.error("Failed to create encryption session:", error);
}
```

## Configuration Options

### Main Plugin Options

```typescript
interface OpenfortOptions {
  // Required: Openfort client instance
  client: Openfort;

  // Required: Array of Openfort plugins to use
  use: OpenfortPlugins;
}
```

### Encryption Session Plugin Options

```typescript
interface EncryptionSessionOptions {
  config?: {
    apiKey: string;
    secretKey: string;
    shieldAPIBaseURL?: string; // Default: 'https://shield.openfort.io'
  };
}
```

## API Reference

### Server-Side

#### `openfort(options)`

Creates the main Openfort plugin for Better Auth.

#### `encryptionSession(options)`

Creates an encryption session endpoint at `/encryption-session`.

### Client-Side

#### `openfortClient()`

Creates the client-side plugin for Better Auth.

#### `authClient.createEncryptionSession(encryptionPart)`

Creates an encryption session for the authenticated user.

**Parameters:**
- `encryptionPart` (string): The encryption data to register

**Returns:**
```typescript
{
  sessionId: string;
  success: boolean;
}
```

## Examples

### Basic Setup

```typescript
// server/auth.ts
import { betterAuth } from "better-auth";
import { openfort, encryptionSession } from "@openfort/better-auth";
import Openfort from "@openfort/openfort-node";

const openfortClient = new Openfort(process.env.OPENFORT_API_KEY!);

export const auth = betterAuth({
  database: {
    // ... your database config
  },
  plugins: [
    openfort({
      client: openfortClient,
      use: [
        encryptionSession({
          config: {
            apiKey: process.env.OPENFORT_API_KEY!,
            secretKey: process.env.OPENFORT_SECRET_KEY!,
          },
        }),
      ],
    }),
  ],
});
```

```typescript
// client/auth.ts
import { createAuthClient } from "better-auth/react";
import { openfortClient } from "@openfort/better-auth";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [openfortClient()],
});
```

### Using Encryption Sessions

```typescript
// In your React component
import { authClient } from "./auth";

async function setupWallet() {
  try {
    const encryptionPart = generateEncryptionPart(); // Your logic here

    const result = await authClient.createEncryptionSession(encryptionPart);

    if (result.success) {
      console.log("Wallet setup complete. Session ID:", result.sessionId);
    }
  } catch (error) {
    console.error("Wallet setup failed:", error);
  }
}
```

## License

Apache-2.0
