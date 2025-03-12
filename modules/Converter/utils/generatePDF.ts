import { jsPDF } from "jspdf";

export const generatePDF = (text: string): Blob => {
	const doc = new jsPDF({
		orientation: "portrait",
		unit: "mm",
		format: "a4",
	});

	const margin = 15;
	const pageWidth = doc.internal.pageSize.getWidth();
	const maxWidth = pageWidth - margin * 2;
	let cursorY = margin;

	doc.setFont("times");
	doc.setFontSize(12);

	if (!text.trim()) {
		throw new Error("Text cannot be empty.");
	}

	const textLines = doc.splitTextToSize(text, maxWidth);

	textLines.forEach((line: string) => {
		if (cursorY > 280) {
			doc.addPage();
			cursorY = margin;
		}
		doc.text(line, margin, cursorY);
		cursorY += 7;
	});

	return doc.output("blob");
};