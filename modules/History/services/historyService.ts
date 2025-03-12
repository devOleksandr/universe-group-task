export interface HistoryItem {
	text: string;
	url: string;
	timestamp: number;
}

export function saveToHistory(entry: HistoryItem): void {
	const history = getHistory();
	localStorage.setItem('pdfHistory', JSON.stringify([entry, ...history].slice(0, 10)));
}

export function getHistory(): HistoryItem[] {
	if (typeof window === 'undefined') return [];
	const stored = localStorage.getItem('pdfHistory');
	return stored ? JSON.parse(stored) : [];
}