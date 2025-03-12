import { generatePDF } from "./generatePDF";
import { jsPDF } from "jspdf";

jest.mock("jspdf", () => {
	const mockDoc = {
		internal: {
			pageSize: {
				getWidth: jest.fn().mockReturnValue(210),
			},
		},
		setFont: jest.fn(),
		setFontSize: jest.fn(),
		splitTextToSize: jest.fn((text, maxWidth) => [text]),
		text: jest.fn(),
		addPage: jest.fn(),
		output: jest.fn().mockReturnValue(new Blob(["mocked PDF content"], { type: "application/pdf" })),
	};
	return {
		jsPDF: jest.fn(() => mockDoc),
	};
});

describe("generatePDF", () => {
	let mockDoc: any;

	beforeEach(() => {
		mockDoc = new (jsPDF as jest.MockedClass<typeof jsPDF>)();
		jest.clearAllMocks();
	});


	it("should throw an error if text is empty or whitespace", () => {
		expect(() => generatePDF("")).toThrow("Text cannot be empty.");
		expect(() => generatePDF("   ")).toThrow("Text cannot be empty.");
	});

	it("should add a new page if text exceeds page height", () => {
		const longText = "Довгий текст ".repeat(50);
		mockDoc.splitTextToSize.mockReturnValue(Array(50).fill("Довгий текст "));

		generatePDF(longText);

		expect(mockDoc.addPage).toHaveBeenCalled(); // Перевірка додавання сторінки
		expect(mockDoc.text).toHaveBeenCalledTimes(50); // Кількість рядків
	});
});