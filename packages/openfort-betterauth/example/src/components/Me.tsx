"use client";

import { useSession, signOut } from "@/lib/auth-client";

export const Me = () => {
	const { data: session } = useSession();

	if (!session) {
		return (
			<div className="flex flex-col gap-4 p-6 border rounded-lg">
				<h2 className="text-lg font-semibold">Not Authenticated</h2>
				<p className="text-sm text-gray-600">Please sign in or register to continue</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 p-6 border rounded-lg">
			<h2 className="text-lg font-semibold">Welcome!</h2>
			<div className="flex flex-col gap-2">
				<p className="text-sm">
					<span className="font-medium">Name:</span> {session.user.name}
				</p>
				<p className="text-sm">
					<span className="font-medium">Email:</span> {session.user.email}
				</p>
			</div>
			<button
				onClick={() => signOut()}
				className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
				type="button"
			>
				Sign Out
			</button>
		</div>
	);
};
