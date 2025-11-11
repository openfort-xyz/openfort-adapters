import type { BetterAuthPlugin } from "better-auth";
import type { OpenfortEndpoints, OpenfortOptions } from "./types";

export { openfortClient } from "./client";

export * from "./plugins/encryption-session";

export const openfort = <O extends OpenfortOptions>(options: O) => {
	const plugins = options.use
		.map((use) => use(options.client))
		.reduce((acc, plugin) => {
			Object.assign(acc, plugin);
			return acc;
		}, {} as OpenfortEndpoints);

	return {
		id: "openfort",
		endpoints: {
			...plugins,
		},
	} satisfies BetterAuthPlugin;
};
