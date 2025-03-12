"use client";
import React from "react";
import {usePDFContext} from "../PDFContext";

export const ConverterForm = () => {
	const {text, setText, generatePDFHandler} = usePDFContext();

	return (
		<div className="max-w-[500px] w-full flex flex-col gap-4">
			<textarea
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Enter text for PDF..."
				className="w-full h-80 p-4 text-lg text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
			/>
			<button
				onClick={generatePDFHandler}
				className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-auto disabled:bg-gray-500"
				disabled={!text}
			>
				Generate PDF
			</button>
		</div>

	);
};

