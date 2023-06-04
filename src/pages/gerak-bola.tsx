import Layout from "@/components/Layout";
import Slider from "@/components/Slider";
import Ball from "@/utils/Ball";
import Vector2f from "@/utils/Vector2f";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
export default function GerakBola() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number | null>(null);
	const [sampling, setSampling] = useState<number>(1);
	const [gravity, setGravity] = useState<boolean>(true);
	const [kicked, setKicked] = useState<boolean>(false);
	const [ball, setBall] = useState({
		posX: 750,
		posY: 500,
		velocityY: 0,
		velocityX: 10,
		bounceFactor: 0.98,
		radius: 100,
		isMovingBackwards: false,
	});

	const initDraw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(0, 20);
		ctx.lineTo(canvas.width, 20);
		ctx.stroke();
		ctx.closePath();
	};

	const updatePos = useCallback(() => {
		let isMovingBackwards = ball.isMovingBackwards;
		let newVelocityY = ball.velocityY + 0.1;
		let newVelocityX = ball.velocityX;

		if (ball.posX >= 1020) isMovingBackwards = true;
		else if (ball.posX <= 30) isMovingBackwards = false;

		const newY = Math.floor(ball.posY - newVelocityY);
		let newX = isMovingBackwards ? Math.floor(ball.posX - newVelocityX) : Math.floor(ball.posX + newVelocityX);


		if (newY > 0 && newY < 120) {
			newVelocityY = Math.floor(-ball.velocityY * ball.bounceFactor);
			newVelocityX = Math.sign((newVelocityX * ball.bounceFactor) * 1.01) * Math.floor(Math.abs(newVelocityX * ball.bounceFactor) * 1.01);
			newX = isMovingBackwards ? Math.floor(ball.posX - newVelocityX) : Math.floor(ball.posX + newVelocityX);
			setBall({
				...ball,
				posX: newX,
				velocityY: newVelocityY,
				velocityX: newVelocityX,
				isMovingBackwards,
			});
		} else {
			if (newX <= 30 || newX >= 1020) {
				newVelocityX = Math.sign((newVelocityX * ball.bounceFactor) / 1.15) * Math.floor(Math.abs(newVelocityX * ball.bounceFactor) / 1.15);
			}
			newX = isMovingBackwards ? Math.floor(ball.posX - newVelocityX) : Math.floor(ball.posX + newVelocityX);
			if (!gravity && kicked) {
				setBall({
					...ball,
					posX: newX,
					velocityX: newVelocityX,
					isMovingBackwards,
				});
			} else {
				setBall({
					...ball,
					posY: newY,
					posX: newX,
					velocityX: newVelocityX,
					velocityY: newVelocityY,
					radius: (-0.0012 * ball.posY + 1.15) * 100,
					isMovingBackwards,
				});
			}
		}

		if (gravity) {
			animationRef.current = requestAnimationFrame(updatePos);
		}
	}, [gravity, ball, kicked]);

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

		// const msaaCanvas = document.createElement('canvas');
		// const msaaContext = msaaCanvas.getContext('2d');

		// const msaaWidth = canvas.width * sampling;
		// const msaaHeight = canvas.height * sampling;

		// msaaCanvas.width = msaaWidth;
		// msaaCanvas.height = msaaHeight;

		if (context) {
			context.setTransform(1, 0, 0, -1, 0, canvas.height);
			context.clearRect(0, 0, canvas.width, canvas.height);
			initDraw(context, canvas);
			context.beginPath();
			context.stroke();

			Ball({
				ctx: context,
				center: new Vector2f(ball.posX, ball.posY),
				radius: new Vector2f(ball.radius, ball.radius),
				color: "blue",
				distance: ball.posX,
			});
		}

		if (gravity || kicked) {
			animationRef.current = requestAnimationFrame(updatePos);
		}

		// if (sampling != 1) {
		// 	const originalData = context.getImageData(0, 0, canvas.width, canvas.height);
		// 	const msaaData = msaaContext.getImageData(0, 0, msaaWidth, msaaHeight);

		// 	for (let y = 0; y < canvas.height; y++) {
		// 		for (let x = 0; x < canvas.width; x++) {
		// 			let r = 0, g = 0, b = 0, a = 0;

		// 			for (let offsetY = 0; offsetY < sampling; offsetY++) {
		// 				for (let offsetX = 0; offsetX < sampling; offsetX++) {
		// 					const pixelX = x * sampling + offsetX;
		// 					const pixelY = y * sampling + offsetY;

		// 					const pixelIndex = (pixelY * msaaWidth + pixelX) * 4;
		// 					const pixelData = msaaData.data;

		// 					r += pixelData[pixelIndex];
		// 					g += pixelData[pixelIndex + 1];
		// 					b += pixelData[pixelIndex + 2];
		// 					a += pixelData[pixelIndex + 3];
		// 				}
		// 			}

		// 			const pixelIndex = (y * canvas.width + x) * 4;
		// 			const pixelCount = sampling * sampling;
		// 			originalData.data[pixelIndex] = Math.floor(r / pixelCount);
		// 			originalData.data[pixelIndex + 1] = Math.floor(g / pixelCount);
		// 			originalData.data[pixelIndex + 2] = Math.floor(b / pixelCount);
		// 			originalData.data[pixelIndex + 3] = Math.floor(a / pixelCount);
		// 		}
		// 	}

		// 	context.putImageData(originalData, 0, 0);
		// }

		if (sampling != 1) {
			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			const diameter = 2 * sampling + 1;
			const halfDiameter = Math.floor(diameter / 2);
	
			for (let y = 0; y < canvas.height; y++) {
				for (let x = 0; x < canvas.width; x++) {
					let r = 0, g = 0, b = 0, a = 0;
					for (let offsetY = -halfDiameter; offsetY <= halfDiameter; offsetY++) {
						for (let offsetX = -halfDiameter; offsetX <= halfDiameter; offsetX++) {
							const pixelX = x + offsetX;
							const pixelY = y + offsetY;
	
							const pixelIndex = (pixelY * canvas.width + pixelX) * 4;
							const pixelData = imageData.data;
	
							r += pixelData[pixelIndex];
							g += pixelData[pixelIndex + 1];
							b += pixelData[pixelIndex + 2];
							a += pixelData[pixelIndex + 3];
						}
					}
					const pixelIndex = (y * canvas.width + x) * 4;
					const pixelCount = diameter * diameter;
					imageData.data[pixelIndex] = Math.floor(r / pixelCount);
					imageData.data[pixelIndex + 1] = Math.floor(g / pixelCount);
					imageData.data[pixelIndex + 2] = Math.floor(b / pixelCount);
					imageData.data[pixelIndex + 3] = Math.floor(a / pixelCount);
				}
			}

			context.imageSmoothingEnabled = true;
			context.imageSmoothingQuality = 'high';

			context?.clearRect(0, 0, canvas.width, canvas.height);
	
			context?.putImageData(imageData, 0, 0);
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [ball, gravity, updatePos, kicked, sampling]);

	const configBar = () => (
		<>
			<div className="flex flex-col mx-auto my-8 px-10 gap-4">
				<h2>Vy : {ball.velocityY}</h2>
				<h2>Moving Backwards : {ball.isMovingBackwards ? "True" : "False"}</h2>
				<div className="flex flex-col gap-2 text-xl">
					<h2>X : {ball.posX}</h2>
					<Slider
						value={ball.posX}
						max={1020}
						min={30}
						handler={(e) => {
							if (parseInt(e.target.value) < ball.posX) {
								setBall({ ...ball, posX: parseInt(e.target.value), isMovingBackwards: true });
							} else {
								setBall({ ...ball, posX: parseInt(e.target.value), isMovingBackwards: false });
							}
						}}
						className=""
					/>
				</div>
				<div className="flex flex-col gap-2 text-xl">
					<h2>Y : {ball.posY}</h2>
					<Slider
						value={ball.posY}
						max={720}
						min={120}
						handler={(e) => setBall({
							...ball, posY: parseInt(e.target.value),
							velocityY: 0,
							radius: (-0.0012 * ball.posY + 1.15) * 100
						})}
						className=""
					/>
				</div>
				<div className="flex flex-col gap-2 text-xl">
					<h2>Bounce : {ball.bounceFactor}</h2>
					<Slider
						value={ball.bounceFactor}
						max={1}
						min={0}
						handler={(e) => setBall({ ...ball, bounceFactor: parseFloat(parseFloat(e.target.value).toFixed(2)) })}
						className=""
					/>
				</div>
				<div className="flex flex-col gap-2 text-xl">
					<div className="flex flex-row">
						<h2>Vx : {ball.isMovingBackwards && "-"}</h2>
						<input type="text" className="bg-transparent rounded-lg" value={ball.velocityX} onChange={(e) => {
							setBall({ ...ball, velocityX: parseFloat(e.target.value) });
							setKicked(false);
						}} />
					</div>
					<Slider
						value={ball.isMovingBackwards ? -ball.velocityX : ball.velocityX}
						max={10}
						min={-10}
						handler={(e) => setBall({ ...ball, velocityX: parseFloat(parseFloat(e.target.value).toFixed(1)) })}
						className=""
					/>
				</div>
				<div className="mt-3 flex flex-row justify-between items-center">
					<div>
						<label className="relative inline-flex items-center cursor-pointer">
							<input type="checkbox" className="sr-only peer" checked={gravity ? true : false} onChange={() => setGravity(prev => !prev)} />
							<div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
							<span className="ml-3 text-lg font-medium text-gray-300">Gravity</span>
						</label>
					</div>
					<div className="">
						<button className="px-5 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600" onClick={() => {
							// setBall({
							// 	...ball,
							// 	velocityX: 200
							// });
							setKicked(true);
						}}>Kick Ball</button>
					</div>
				</div>
				<div className="mt-3">
					<select value={sampling} onChange={(e) => setSampling(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option defaultValue={1}>Anti-Aliasing Off</option>
						<option value={2}>2x Anti-Aliasing</option>
						<option value={4}>4x Anti-Aliasing</option>
						<option value={8}>8x Anti-Aliasing</option>
					</select>
				</div>
			</div>
		</>
	);

	return (
		<>
			<Head>
				<title>Gerak Bola</title>
			</Head>
			<Layout configBar={configBar}>
				<div className="flex flex-col items-center justify-center w-full h-full">
					<canvas ref={canvasRef} width={1080} height={720} className={"bg-white"}></canvas>
				</div>
			</Layout>
		</>
	);
}