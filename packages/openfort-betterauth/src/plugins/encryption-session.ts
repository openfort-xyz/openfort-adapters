import type Openfort from "@openfort/openfort-node";
import { APIError, getSessionFromCtx } from "better-auth/api";
import { createAuthEndpoint } from "better-auth/plugins";
import { z } from "zod";
import type { EncryptionSessionConfig } from "../types";

export interface EncryptionSessionOptions {
	/**
	 * Encryption session configuration
	 */
	config?: EncryptionSessionConfig;
}

export const EncryptionSessionParams = z.object({
	encryptionPart: z.string(),
});

export type EncryptionSessionParams = z.infer<typeof EncryptionSessionParams>;

export const encryptionSession =
	(encryptionSessionOptions: EncryptionSessionOptions = {}) =>
	(openfort: Openfort) => {
		return {
			encryptionSession: createAuthEndpoint(
				"/encryption-session",
				{
					method: "POST",
					body: EncryptionSessionParams,
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
								"Encryption session configuration is required. Please provide apiKey and secretKey in the plugin options.",
						});
					}

					const { apiKey, secretKey, shieldAPIBaseURL } =
						encryptionSessionOptions.config;

					try {
						const sessionId = await openfort.registerRecoverySession(
							apiKey,
							secretKey,
							ctx.body.encryptionPart,
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
