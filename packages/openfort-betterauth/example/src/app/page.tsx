"use client";

import { Login } from "@/components/Login";
import { Me } from "@/components/Me";
import { Register } from "@/components/Register";
import { authClient, useSession } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
	const { data: session } = useSession();
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const onClickCreateEncryptionSession = async () => {
		try {
			setLoading(true);
			setError(null);

			const result = await authClient.createEncryptionSession();

			if (result.success) {
				setSessionId(result.sessionId);
				console.log("Encryption session created:", result.sessionId);
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to create encryption session");
			console.error("Encryption session error:", e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-8 items-center justify-center min-h-screen p-8">
			<h1 className="text-3xl font-bold">Openfort Better Auth Example</h1>

			<div className="flex flex-row gap-4 items-start">
				<Me />
				<Register />
				<Login />
			</div>

			{session && (
				<div className="flex flex-col gap-4 items-center justify-center p-6 border rounded-lg">
					<h2 className="text-xl font-semibold">Encryption Session</h2>
					<p className="text-sm text-gray-600 text-center max-w-md">
						Create a secure encryption session for wallet recovery using Openfort Shield API
					</p>

					<button
						onClick={onClickCreateEncryptionSession}
						disabled={loading}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
						type="button"
					>
						{loading ? "Creating..." : "Create Encryption Session"}
					</button>

					{sessionId && (
						<div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
							<p className="text-sm font-semibold text-green-800">Session Created!</p>
							<p className="text-xs text-green-600 mt-1 font-mono break-all">
								ID: {sessionId}
							</p>
						</div>
					)}

					{error && (
						<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
							<p className="text-sm font-semibold text-red-800">Error</p>
							<p className="text-xs text-red-600 mt-1">{error}</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
