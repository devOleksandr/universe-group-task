"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { generatePDF } from "../../utils/generatePDF";

interface PDFItem {
	id: string;
	text: string;
	pdfData: string;
	createdAt: string;
}

interface PDFContextType {
	text: string;
	setText: (text: string) => void;
	pdfData: Blob | null;
	setPdfData: (pdfData: Blob | null) => void;
	numPages: number | null;
	setNumPages: (numPages: number | null) => void;
	history: PDFItem[];
	generatePDFHandler: () => void;
	loadPDF: (id: string) => void;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const PDFProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [text, setText] = useState<string>("");
	const [pdfData, setPdfData] = useState<Blob | null>(null);
	const [numPages, setNumPages] = useState<number | null>(null);
	const [history, setHistory] = useState<PDFItem[]>([]);

	// Завантаження історії з localStorage
	useEffect(() => {
		const savedHistory = localStorage.getItem("pdfHistory");
		if (savedHistory) {
			try {
				const parsedHistory = JSON.parse(savedHistory);
				setHistory(parsedHistory);
			} catch (error) {
				console.error("Error parsing history from localStorage:", error);
				localStorage.removeItem("pdfHistory"); // Очищаємо, якщо дані пошкоджені
			}
		}
	}, []);

	// Збереження PDF у localStorage
	const saveToHistory = (newPdfData: Blob, newText: string) => {
		const id = Date.now().toString();
		const createdAt = new Date().toISOString();

		const reader = new FileReader();
		reader.onloadend = () => {
			const base64Data = reader.result?.toString().split(",")[1]; // Отримуємо чистий Base64
			if (base64Data) {
				const pdfItem: PDFItem = { id, text: newText, pdfData: base64Data, createdAt };
				const newHistory = [pdfItem, ...history];
				setHistory(newHistory);
				localStorage.setItem("pdfHistory", JSON.stringify(newHistory));
			}
		};
		reader.onerror = () => {
			console.error("Error reading Blob in Base64");
		};
		reader.readAsDataURL(newPdfData);
	};

	const generatePDFHandler = () => {
		try {
			const pdfBlob = generatePDF(text);
			setPdfData(pdfBlob);
			saveToHistory(pdfBlob, text);
		} catch (error) {
			console.error("Error generating PDF:", error);
			alert("An error occurred while creating the PDF.");
		}
	};


	const loadPDF = (id: string) => {
		const pdfItem = history.find(item => item.id === id);
		if (pdfItem) {
			try {
				const byteCharacters = atob(pdfItem.pdfData);
				const byteNumbers = new Uint8Array(byteCharacters.length);
				for (let i = 0; i < byteCharacters.length; i++) {
					byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				const blob = new Blob([byteNumbers], { type: "application/pdf" });
				setText(pdfItem.text);
				setPdfData(blob);
			} catch (error) {
				console.error("Error while restoring PDF from Base64:", error);
				alert("Could not download PDF");
			}
		}
	};

	return (
		<PDFContext.Provider
			value={{
				text,
				setText,
				pdfData,
				setPdfData,
				numPages,
				setNumPages,
				history,
				generatePDFHandler,
				loadPDF,
			}}
		>
			{children}
		</PDFContext.Provider>
	);
};

export const usePDFContext = () => {
	const context = useContext(PDFContext);
	if (!context) {
		throw new Error("usePDFContext must be used within a PDFProvider");
	}
	return context;
};