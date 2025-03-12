"use client";
import React from "react";
import {Preview} from "@/modules/Converter";
import {History} from "@/modules/History";

export default function HistoryPage() {
	return (
		<div className="flex gap-6">
			<History/>
			<div className="w-1/2">
				<Preview/>
			</div>
		</div>
	);
}