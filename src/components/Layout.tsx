import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineSetting } from 'react-icons/ai';

interface Props {
	children: React.ReactNode;
	configBar: () => JSX.Element;
}

export default function Layout(props: Props) {
	const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
	const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);


	const handleLeftSidebar = () => {
		setIsLeftSidebarOpen(!isLeftSidebarOpen);
	};

	const handleRightSidebar = () => {
		setIsRightSidebarOpen(!isRightSidebarOpen);
	};

	return (
		<div className="mx-auto max-w-6xl">

			<div className="flex items-center h-24  justify-between text-white">
				<h1 className="flex gap-2 w-full text-3xl font-bold text-cyan-400">
					<div className="text-3xl block text-white" onClick={handleLeftSidebar}>
						{
							isLeftSidebarOpen ? (
								<AiOutlineClose />
							) : (
								<AiOutlineMenu />
							)
						}
					</div>
					Simulasi Fisdas
				</h1>
				<ul className=" hidden md:flex gap-4">
					<li>
						<div className="text-3xl block text-white" onClick={handleRightSidebar}>
							{
								isRightSidebarOpen ? (
									<AiOutlineClose />
								) : (
									<AiOutlineSetting />
								)
							}
						</div>
					</li>
				</ul>
				<aside
					className={isLeftSidebarOpen ?
						"fixed left-0 top-0 w-1/5 h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500" :
						"fixed left-[-100%]"
					}
				>
					<h1 className="text-3xl font-bold text-cyan-400 m-4">
						RuxTech
					</h1>
					<ul className="flex flex-col gap-4 uppercase p-4">
						<li className='border-b border-gray-600'>Lensa</li>
						<li className='border-b border-gray-600'>Cermin</li>
						<li className='border-b border-gray-600'>Gerak Bola</li>
					</ul>
					<div className='flex justify-center'>
						<div className='absolute text-3xl bottom-32' onClick={handleLeftSidebar}>
							<AiOutlineClose />
						</div>
					</div>
				</aside>
				<aside
					className={isRightSidebarOpen ?
						"fixed right-0 top-0 w-1/5 h-full border-l border-l-gray-900 bg-[#000300] ease-in-out duration-500" :
						"fixed right-[-100%]"
					}
				>
					<h1 className="text-3xl font-bold text-cyan-400 m-4">
						Konfigurasi
					</h1>
					{props.configBar()}
					<div className='flex justify-center'>
						<div className='absolute text-3xl bottom-32' onClick={handleRightSidebar}>
							<AiOutlineClose />
						</div>
					</div>
				</aside>
			</div >
			<div className="p-4 bg-zinc-800 h-max">
				{props.children}
			</div>
		</div>
	);
}
