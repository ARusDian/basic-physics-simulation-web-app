import Layout from "@/components/Layout";
import Image from "next/image";

export default function Custom404() {
	return (
		<Layout>
			<div className="m-auto  max-h-screen flex justify-center h-screen">
				<div className="text-4xl flex flex-col justify-center">
					<Image
						src="/assets/wink-hehe.gif"
						alt="Not Found"
						height={500}
						width={500}
					/>
					<div className="mx-auto font-bold">
						<span className="text-red-400">404</span> - Not Found
					</div>
				</div>
			</div>
		</Layout>
	);
}
