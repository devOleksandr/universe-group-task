"use client";
import React from "react";
import {usePDFContext} from "@/modules/Converter/components/PDFContext";

export const History = () => {
	const {history, loadPDF} = usePDFContext();

	return (
		<div className="w-1/2">
			<h3 className="text-2xl font-bold mb-4 text-gray-600">History</h3>
			{history.length === 0 ? (
				<p className="text-gray-600">History empty</p>
			) : (
				<ul className="space-y-2">
					{history.map(item => (
						<li
							key={item.id}
							onClick={() => loadPDF(item.id)}
							className="p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition"
						>
		                <span className="text-gray-700">
		                  {`Created: ${new Date(item.createdAt).toLocaleString()} (Text: ${item.text.slice(0, 30)}${item.text.length > 30 ? "..." : ""})`}
		                </span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}