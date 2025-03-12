"use client";
import React from "react";
import {Document, Page} from "react-pdf";
import {usePDFContext} from "../PDFContext";

import 'pdfjs-dist/build/pdf.worker.min.mjs';

export const Preview: React.FC = () => {
	const {pdfData, numPages, setNumPages} = usePDFContext();

	const onDocumentLoadSuccess = ({numPages}: { numPages: number }) => {
		setNumPages(numPages);
	};

	return pdfData ? (
		<div className="w-full">
			<Document
				file={pdfData}
				onLoadSuccess={onDocumentLoadSuccess}
				loading={<div className="text-gray-500">Download PDF...</div>}
				error={<div className="text-red-500">Download error</div>}
			>
				{Array.from(new Array(numPages || 0), (_, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						className="bg-white p-4 rounded-lg shadow-md mb-2"
					/>
				))}
			</Document>
		</div>
	) : (
		<div className="text-gray-500 text-center p-4">PDF will be displayed after generation</div>
	);
};

