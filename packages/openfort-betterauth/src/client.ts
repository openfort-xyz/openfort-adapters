import type { BetterAuthClientPlugin } from "better-auth";
import type { BetterFetchOption } from "better-auth/client";
import type { openfort } from "./index";

export interface EncryptionSessionResponse {
	sessionId: string;
	success: boolean;
}

export const openfortClient = () => {
	return {
		id: "openfort-client",
		$InferServerPlugin: {} as ReturnType<typeof openfort>,
		getActions: ($fetch) => {
			return {
				/**
				 * Create an encryption session for the authenticated user
				 * @param encryptionPart - The encryption part to register
				 * @param fetchOptions - Optional fetch options
				 * @returns The session ID and success status
				 */
				createEncryptionSession: async (
					encryptionPart: string,
					fetchOptions?: BetterFetchOption,
				): Promise<EncryptionSessionResponse> => {
					const res = await $fetch("/encryption-session", {
						method: "POST",
						body: {
							encryptionPart,
						},
						...fetchOptions,
					});

					if (res.error) {
						throw new Error(res.error.message);
					}

					return res.data as EncryptionSessionResponse;
				},
			};
		},
	} satisfies BetterAuthClientPlugin;
};
