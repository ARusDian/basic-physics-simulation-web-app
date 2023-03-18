import Image from "next/image";

export default function WorkInProgress() {
	return (
		<div className="m-auto  max-h-screen flex justify-center h-screen">
			<div className="text-4xl flex flex-col justify-center gap-10">
				<Image
					src="/assets/work-in-progress.gif"
					alt="Under Construction"
					height={500}
					width={500}
				/>
				<div className="mx-auto font-bold">
					<span className="text-yellow-400">Work in Progress</span>
				</div>
			</div>
		</div>
	);
}
