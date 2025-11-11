import type Openfort from "@openfort/openfort-node";
import { APIError, getSessionFromCtx } from "better-auth/api";
import { createAuthEndpoint } from "better-auth/plugins";
import type { EncryptionSessionConfig } from "../types";

export interface EncryptionSessionOptions {
	/**
	 * Encryption session configuration
	 */
	config?: EncryptionSessionConfig;
}

export const encryptionSession =
	(encryptionSessionOptions: EncryptionSessionOptions = {}) =>
	(openfort: Openfort) => {
		return {
			encryptionSession: createAuthEndpoint(
				"/encryption-session",
				{
					method: "POST",
				},
				async (ctx) => {
					const session = await getSessionFromCtx(ctx);

					if (!session?.user.id) {
						throw new APIError("UNAUTHORIZED", {
							message: "You must be logged in to create an encryption session",
						});
					}

					if (!encryptionSessionOptions.config) {
						throw new APIError("BAD_REQUEST", {
							message:
								"Encryption session configuration is required. Please provide Shield API Key, Shield Secret Key, and encryption part in the plugin options.",
						});
					}

					const { apiKey, secretKey, encryptionPart, shieldAPIBaseURL } =
						encryptionSessionOptions.config;

					try {
						const sessionId = await openfort.registerRecoverySession(
							apiKey,
							secretKey,
							encryptionPart,
							shieldAPIBaseURL,
						);

						return ctx.json({
							sessionId,
							success: true,
						});
					} catch (e: unknown) {
						if (e instanceof Error) {
							ctx.context.logger.error(
								`Openfort encryption session creation failed. Error: ${e.message}`,
							);
						}

						throw new APIError("INTERNAL_SERVER_ERROR", {
							message: "Encryption session creation failed",
						});
					}
				},
			),
		};
	};
