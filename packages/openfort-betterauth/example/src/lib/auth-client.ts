import { createAuthClient } from "better-auth/react";
import { openfortClient } from "@openfort/better-auth";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000", // the base url of your auth server
	plugins: [openfortClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
