import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import {PDFProvider} from "@/modules/Converter/components/PDFContext";
import {Header} from "@/components/Header";


const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
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
			className={`${poppins.variable} font-sans relative`}
		>
		<PDFProvider>
			<Header/>
			<main className="container py-8">{children}</main>
		</PDFProvider>
		</body>
		</html>
	);
}
