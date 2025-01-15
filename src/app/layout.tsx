"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ChakraProvider value={system}>
			<html lang="en">
				<body>{children}</body>
			</html>
		</ChakraProvider>
	);
}
