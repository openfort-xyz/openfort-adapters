import { encryptionSession, openfort } from "@openfort/better-auth";
import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import Database from "better-sqlite3";
import { openfortSDK } from "./openfort";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		bearer(),
		openfort({
			client: openfortSDK,
			use: [
				encryptionSession({
					config: {
						apiKey: process.env.SHIELD_PUBLISHABLE_KEY as string,
						secretKey: process.env.SHIELD_SECRET_KEY as string,
						encryptionPart: process.env.SHIELD_ENCRYPTION_SHARE as string,
					},
				}),
			],
		}),
	],
	database: new Database("sqlite.db"),
});
