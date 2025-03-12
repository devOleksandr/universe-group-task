"use client"
import React from "react";
import Link from "next/link";
import {HistoryIcon, PenIcon} from "lucide-react";
import {usePathname} from "next/navigation";

const menuLinks = [
	{
		href: "/",
		label: "Convert new",
		icon: <PenIcon size={18} color="#4b5563" className="group-hover:stroke-blue-400"/>
	},
	{
		href: "/history",
		label: "History",
		icon: <HistoryIcon size={18} color="#4b5563" className="group-hover:stroke-blue-400"/>
	},
]

export const Header = () => {
	const pathname = usePathname();

	return (
		<div className="py-3 w-full bg-white shadow">
			<div className="container flex items-center justify-between">
				<ul className="flex">
					{
						menuLinks.map((item, index) => {
							const isActive = pathname === item.href;

							return (
								<li key={index} className="mr-6">
									<Link href={item.href}
									      className={`flex items-center group px-3 py-2 border-[1px] group hover:border-blue-400  font-medium rounded-lg ${isActive ? 'text-blue-400 border-blue-400' : ''}`}>
										{React.cloneElement(item.icon, {
											color: isActive ? "#3b82f6" : "#4b5563",
										})}
										<span
											className={`ml-1 flex items-center text-sm   group-hover:text-blue-400 ${isActive ? 'text-blue-400' : 'text-gray-600'}`}
										>
												{item.label}
											</span>

									</Link>
								</li>
							)
						})
					}
				</ul>
				<Link href={'/'} className="group">
					<h4 className="text-gray-600 group-hover:text-blue-400 transition-all">Convert to PDF</h4>
				</Link>
			</div>
		</div>
	)
}