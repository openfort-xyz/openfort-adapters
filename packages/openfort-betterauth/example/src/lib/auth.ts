import { betterAuth } from "better-auth";
import { openfort, encryptionSession } from "@openfort/better-auth";
import Database from "better-sqlite3";
import { openfortSDK } from "./openfort";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		openfort({
			client: openfortSDK,
			use: [
				encryptionSession({
					config: {
						apiKey: process.env.OPENFORT_API_KEY as string,
						secretKey: process.env.OPENFORT_SECRET_KEY as string,
					},
				}),
			],
		}),
	],
	database: new Database("sqlite.db"),
});
