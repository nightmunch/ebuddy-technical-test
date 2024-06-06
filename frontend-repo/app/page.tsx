import type { Metadata } from "next";

export default function IndexPage() {
	return (
		<div>
			<input type="text" name="name" id="name" />
			<button>Update User Data</button>
		</div>
	);
}

export const metadata: Metadata = {
	title: "EBuddy",
};
