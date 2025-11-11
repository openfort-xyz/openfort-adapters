import { betterAuth } from "better-auth";
import { openfort, encryptionSession } from "@openfort/better-auth";
import Database from "better-sqlite3";
import { openfortSDK } from "./openfort";
import { bearer } from "better-auth/plugins";

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
						apiKey: process.env.SHIELD_API_KEY as string,
						secretKey: process.env.SHIELD_SECRET_KEY as string,
						encryptionPart: process.env.SHIELD_ENCRYPTION_PART as string,
					},
				}),
			],
		}),
	],
	database: new Database("sqlite.db"),
});
