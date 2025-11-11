"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		try {
			setLoading(true);
			const user = await signIn.email({
				email,
				password,
			});
			console.log("Logged in:", user);
		} catch (error) {
			console.error("Login error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4 p-6 border rounded-lg">
			<h2 className="text-lg font-semibold">Login</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="px-3 py-2 border rounded"
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="px-3 py-2 border rounded"
			/>
			<button
				type="button"
				disabled={loading}
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
				onClick={handleLogin}
			>
				{loading ? "Signing In..." : "Sign In"}
			</button>
		</div>
	);
};
