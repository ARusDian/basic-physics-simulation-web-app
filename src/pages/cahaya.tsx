import Slider from '@/components/Slider';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import drawLine from '../utils/drawLine';

export default function Cahaya() {
	const [objectDistance, setObjectDistance] = useState(100);
	const [objectHeight, setObjectHeight] = useState(80);
	const [mirrorFocus, setmirrorFocus] = useState(100);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const goDraw = () => {
		if (!canvasRef.current) return;
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

		if (context) {
			context.canvas.width = context.canvas.width;
			context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
			context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
			initDraw(context, canvas);

			// Draw Object
			drawLine({
				ctx: context,
				start: { x: objectDistance - (canvas.width / 2), y: 0 },
				end: { x: objectDistance - (canvas.width / 2), y: objectHeight },
				color: "#0096FF",
				text: "Objek",
			});

			console.log(mirrorFocus);

			drawLine({
				ctx: context,
				start: { x:- mirrorFocus, y: 0 },
				end: { x: -	mirrorFocus , y: 30 },
				color: "purple",
				text: "Fokus",
			});



		}

	};

	function initDraw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		ctx.strokeStyle = "#000000";
		ctx.beginPath();

		ctx.moveTo(-canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2, 0);
		ctx.stroke();

		ctx.moveTo(0, -canvas.height / 2);
		ctx.lineTo(0, canvas.height / 2);
		ctx.stroke();

		ctx.closePath();
	}

	useEffect(() => goDraw(), [goDraw]);
	const configBar = () => {

		return (
			<>
				<div className='flex my-20'>
					<Slider
						handler={(e) => setmirrorFocus(parseInt(e.target.value))}
						className="slider-vertical w-96"
						value={mirrorFocus}
						max={540}
						min={-540}
					/>
					<Slider
						handler={(e) => setObjectHeight(parseInt(e.target.value))}
						className="slider-vertical w-96"
						value={objectHeight}
						max={360}
						min={-360}
					/>
					<Slider
						handler={(e) => setObjectDistance(parseInt(e.target.value))}
						className="slider-vertical w-96"
						value={objectDistance}
						max={540}
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
					<canvas ref={canvasRef} width={1080} height={720} className={"bg-white"}></canvas>
				</div>
			</Layout>
		</>
	);
}

