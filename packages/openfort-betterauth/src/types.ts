import type Openfort from "@openfort/openfort-node";

import type { UnionToIntersection } from "better-auth";
import type { encryptionSession } from "./plugins/encryption-session";

export type OpenfortPlugin = ReturnType<typeof encryptionSession>;

export type OpenfortPlugins = [OpenfortPlugin, ...OpenfortPlugin[]];

export type OpenfortEndpoints = UnionToIntersection<ReturnType<OpenfortPlugin>>;

export interface EncryptionSessionConfig {
	/**
	 * Openfort API Key
	 */
	apiKey: string;
	/**
	 * Openfort Secret Key
	 */
	secretKey: string;
	/**
	 * Optional Shield API Base URL (defaults to https://shield.openfort.io)
	 */
	shieldAPIBaseURL?: string;
}

export interface OpenfortOptions {
	/**
	 * Openfort Client instance
	 */
	client: Openfort;
	/**
	 * Use Openfort plugins
	 */
	use: OpenfortPlugins;
}
