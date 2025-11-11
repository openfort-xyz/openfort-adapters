"use client";

import { signUp } from "@/lib/auth-client";
import { useState } from "react";

export const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleRegister = async () => {
		try {
			setLoading(true);
			await signUp.email({
				email,
				password,
				name,
			});
			console.log("Registered successfully");
		} catch (error) {
			console.error("Registration error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-4 p-6 border rounded-lg">
			<h2 className="text-lg font-semibold">Register</h2>
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="px-3 py-2 border rounded"
			/>
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
				className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
				onClick={handleRegister}
			>
				{loading ? "Registering..." : "Register"}
			</button>
		</div>
	);
};
