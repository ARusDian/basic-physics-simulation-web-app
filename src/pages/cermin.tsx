import Slider from '@/components/Slider';
import drawSlopeLine from '@/utils/drawSlopeLine';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import drawLine from '../utils/drawLine';

export default function cermin() {
	const [objectDistance, setObjectDistance] = useState(100);
	const [objectHeight, setObjectHeight] = useState(80);
	const [mirrorObjectDistance, setMirrorObjectDistance] = useState(0);
	const [mirrorObjectHeight, setMirrorObjectHeight] = useState(0);
	const [mirrorFocus, setmirrorFocus] = useState(70);
	const [isConvex, setIsConvex] = useState(false);

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
				start: { x: -objectDistance, y: 0 },
				end: { x: -objectDistance, y: objectHeight },
				color: "#0096FF",
				text: "Object",
			});
			drawLine({
				ctx: context,
				start: { x: - mirrorFocus, y: 0 },
				end: { x: -	mirrorFocus, y: 10 },
				color: "purple",
				text: "Focus",
			});
			drawLine({
				ctx: context,
				start: { x: - 2 * mirrorFocus, y: 0 },
				end: { x: - 2 * mirrorFocus, y: 10 },
				color: "blue",
				text: "Curvature",
			});

			// Draw Mirror
			if (isConvex) { 
				const calculatedFocus = -mirrorFocus
				console.log(objectDistance,calculatedFocus)
				setMirrorObjectDistance((objectDistance * calculatedFocus) / (objectDistance - calculatedFocus));
				setMirrorObjectHeight((mirrorObjectDistance * objectHeight) / objectDistance);
				drawLine({
					ctx: context,
					start: { x: -(mirrorObjectDistance), y: 0 },
					end: { x: -(mirrorObjectDistance), y: -(mirrorObjectHeight) },
					color: "#FF0000",
					text: "Image",
				});
			} else {
				const calculatedFocus = mirrorFocus
				setMirrorObjectDistance((objectDistance * calculatedFocus) / (objectDistance - calculatedFocus));
				setMirrorObjectHeight((mirrorObjectDistance * objectHeight) / objectDistance);
			}

			drawLine({
				ctx: context,
				start: { x: -mirrorObjectDistance, y: 0 },
				end: { x: -mirrorObjectDistance, y: -mirrorObjectHeight },
				color: "#FF0000",
				text: "Image",
			});

			drawLine({
				ctx: context,
				start: { x: -objectDistance, y: -objectHeight},
				end: {x: 0, y: objectHeight },
				color: "green",
			});

			drawLine({
				ctx: context,
				start: { x: -mirrorObjectDistance, y: mirrorObjectHeight},
				end: {x: 0, y: -mirrorObjectHeight },
				color: "orange",
			});

			drawSlopeLine({
				ctx: context,
				start: { x: -objectDistance, y: objectHeight},
				end: {x: 0, y: -mirrorObjectHeight },
				color: "yellow",
				canvasHeight:canvas.height
			});

			drawSlopeLine({
				ctx: context,
				start: {x: 0, y: objectHeight },
				end: { x: -mirrorObjectDistance, y: -mirrorObjectHeight },
				color: "cyan",
				canvasHeight:canvas.height
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

	useEffect(() => goDraw(), [goDraw,setIsConvex]);
	const configBar = () => {

		return (
			<>
				<div className='flex mt-4 mx-4'>
					<div className={`text-xl ${(!isConvex) ? "text-cyan-400" : ""}`}>
						Concave
					</div>
					<div className="flex items-center justify-center w-full">
						<label className="flex items-center cursor-pointer">
							<div className="relative">
								<input type="checkbox" id="toggleB" className="sr-only" onChange={() => setIsConvex(!isConvex)} />
								<div className="block bg-gray-600 w-14 h-8 rounded-full" />
								<div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
							</div>
							<div className="ml-3 text-gray-700 font-medium">
							</div>
						</label>
					</div>
					<div className={`text-xl ${(isConvex) ? "text-cyan-400" : ""}`}>
						Convex
					</div>
				</div>
				<div className='flex my-20'>
					<Slider
						handler={(e) => setmirrorFocus(parseInt(e.target.value))}
						className="slider-vertical"
						value={mirrorFocus}
						max={540}
						min={0}
					/>
					<Slider
						handler={(e) => setObjectHeight(parseInt(e.target.value))}
						className="slider-vertical"
						value={objectHeight}
						max={360}
						min={-360}
					/>
					<Slider
						handler={(e) => setObjectDistance(parseInt(e.target.value))}
						className="slider-vertical"
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
				<div className='flex mt-2 mx-4'>
					<table className="w-full text-sm text-left text-gray-500">
						<thead>
							<tr>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									Symbols
								</th>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									Variables
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									s
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									Distance between Object and Mirror
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									h
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									Height of Object
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									f
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									Focus of Mirror
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				
				<div className='flex mt-4 mx-4'>
					<table className="w-full text-sm text-left text-gray-500">
						<thead>
							<tr>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									Variables
								</th>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									Object
								</th>
								<th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-blue-500 tracking-wider">
									Image
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									s
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									<input
										type="number"
										className="w-20 bg-transparent"
										value={objectDistance}
										onChange={(e) => setObjectDistance(parseFloat(e.target.value))}
										min={0}
										step={"any"}
									/>
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									{mirrorObjectDistance.toFixed(2)}
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									h
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									<input
										type="number"
										className="w-20 bg-transparent"
										value={objectHeight}
										onChange={(e) => setObjectHeight(parseFloat(e.target.value))}
										min={-360}
										step={"any"}
									/>
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									{mirrorObjectHeight.toFixed(2)}
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									f
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									<input
										type="number"
										className="w-20 bg-transparent"
										value={mirrorFocus}
										onChange={(e) => setmirrorFocus(parseFloat(e.target.value))}
										min={0}
										step={"any"}
									/>
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									M = {Math.abs(mirrorObjectDistance / objectDistance).toFixed(2)}
								</td>
							</tr>
						</tbody>
					</table>
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

