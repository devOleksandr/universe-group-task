import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";


const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["cyrillic"],
	weight: ['100', '300', '400', '500', '700', '900']
})

export const metadata: Metadata = {
	title: "PDF Converter",
	description: "Convert text to PDF documents",
};

export default function RootLayout(
	{
		children,
	}: Readonly<{
		children: React.ReactNode;
	}>) {
	return (
		<html lang="en">
		<body
			className={`${roboto.variable} font-sans relative`}
		>
			{children}
		</body>
		</html>
	);
}
