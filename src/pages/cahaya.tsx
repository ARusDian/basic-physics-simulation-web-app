import Slider from '@/components/Slider';
import Head from 'next/head';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Layout from '../components/Layout';

export default function Cahaya() {
	const [jarakObjek, setJarakObjek] = useState(100);
	const [tinggiObjek, setTinggiObjek] = useState(80);
	const [fokusCermin, setFokusCermin] = useState(0);

	const configBar = () => {

		return (
			<>
				<div className='flex my-20'>
					<Slider
						handler={(e) => setJarakObjek(parseInt(e.target.value))}
						className="slider-vertical w-96"
						value={jarakObjek}
						max={1000}
						min={0}
					/>
					<Slider
						handler={(e) => setTinggiObjek(parseInt(e.target.value))}
						className="slider-vertical w-96"
						value={tinggiObjek}
						max={1000}
						min={0}
					/>
					<Slider
						handler={(e) => setFokusCermin(parseInt(e.target.value))}
						className="slider-vertical w-96"
						value={fokusCermin}
						max={1000}
						min={0}
					/>
				</div>
				<div className='flex justify-between mx-16'>
					<div className='text-xl'>
						f
					</div>
					<div className='text-xl'>
						h
					</div>
					<div className='text-xl'>
						s
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<Head>
				<title>Simulasi Cahaya</title>
			</Head>
			<Layout configBar={configBar}>
				<div className="flex flex-col items-center justify-center w-full h-full">

				</div>
			</Layout>
		</>
	);
}

