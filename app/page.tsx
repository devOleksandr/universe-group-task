import {ConverterForm, Preview} from "@/modules/Converter";

export default function Home() {

	return (
		<div className="flex gap-6">
			<ConverterForm/>
			<div className="w-full">
				<Preview/>
			</div>
		</div>
	);
}
