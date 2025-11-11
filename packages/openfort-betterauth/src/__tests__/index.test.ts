import { describe, expect, it } from "vitest";
import { openfort, openfortClient } from "../index";

describe("@openfort/better-auth", () => {
	it("should export openfort function", () => {
		expect(openfort).toBeDefined();
		expect(typeof openfort).toBe("function");
	});

	it("should export openfortClient function", () => {
		expect(openfortClient).toBeDefined();
		expect(typeof openfortClient).toBe("function");
	});
});
