import { createAuthClient } from "better-auth/react";
import { openfortClient } from "@openfort/better-auth";
import { bearer } from "better-auth/plugins";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000", // the base url of your auth server
	plugins: [openfortClient(), bearer()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
