import { describe, expect, it } from "vitest";
import { version } from "../index";

describe("adapter-utils", () => {
	it("should export version", () => {
		expect(version).toBe("0.0.0");
	});
});
