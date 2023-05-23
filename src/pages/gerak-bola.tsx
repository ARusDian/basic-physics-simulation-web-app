import Layout from "@/components/Layout";
import Slider from "@/components/Slider";
import Ball from "@/utils/Ball";
import Vector2f from "@/utils/Vector2f";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
export default function GerakBola() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number | null>(null);
	const kickAnimationRef = useRef<number | null>(null);
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

	// const kickBallAnimation = useCallback(() => {
	// 	let isMovingBackwards = ball.isMovingBackwards;
	// 	let newVelocityX = ball.velocityX;

	// 	if (ball.posX >= 1020) isMovingBackwards = true;
	// 	else if (ball.posX <= 30) isMovingBackwards = false;

	// 	if (isMovingBackwards) {
	// 		if (newVelocityX < 0) newVelocityX = newVelocityX * 1;
	// 		else newVelocityX = -newVelocityX;
	// 	}
	// 	else {
	// 		if (newVelocityX > 0) newVelocityX = newVelocityX * 1;
	// 		else newVelocityX = -newVelocityX;
	// 	}

	// 	const newX = Math.floor(ball.posX + newVelocityX);
	// 	if (newX <= 30 || newX >= 1020) {
	// 		newVelocityX = -ball.velocityX * ball.bounceFactor;
	// 		setBall({
	// 			...ball,
	// 			posX: newX,
	// 			velocityX: newVelocityX,
	// 		});
	// 	} else {
	// 		setBall({
	// 			...ball,
	// 			posX: newX
	// 		});
	// 	}

	// 	if (kicked) {
	// 		requestAnimationFrame(kickBallAnimation);
	// 	}

	// }, [ball, kicked]);

	const updatePos = useCallback(() => {
		let isMovingBackwards = ball.isMovingBackwards;
		let newVelocityY = ball.velocityY + 0.1;
		let newVelocityX = ball.velocityX;

		if (ball.posX >= 1020) isMovingBackwards = true;
		else if (ball.posX <= 30) isMovingBackwards = false;

		if (isMovingBackwards) {
			if (newVelocityX < 0) newVelocityX = newVelocityX * 1;
			else newVelocityX = -newVelocityX;
		}
		else {
			if (newVelocityX > 0) newVelocityX = newVelocityX * 1;
			else newVelocityX = -newVelocityX;
		}

		const newY = Math.floor(ball.posY - newVelocityY);
		let newX = Math.floor(ball.posX + newVelocityX);
		
		
		if (newY > 0 && newY < 120) {
			newVelocityY = Math.floor(-ball.velocityY * ball.bounceFactor);
			newVelocityX = Math.sign((newVelocityX * ball.bounceFactor) * 1.01) * Math.floor(Math.abs(newVelocityX * ball.bounceFactor) * 1.01);
			newX = Math.floor(ball.posX + newVelocityX);
			setBall({
				...ball,
				posX: newX,
				velocityY: newVelocityY,
				velocityX: newVelocityX,
				isMovingBackwards,
			});
		} else {
			if (newX <= 30  || newX >= 1020) {
				// newVelocityX = parseFloat(((newVelocityX * ball.bounceFactor) / 1.1).toFixed(2));
				newVelocityX = Math.sign((newVelocityX * ball.bounceFactor) / 1.15) * Math.floor(Math.abs(newVelocityX * ball.bounceFactor) / 1.15);
				console.log(newX, newVelocityX);
			}
			newX = Math.floor(ball.posX + newVelocityX);
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

		if (gravity) {
			animationRef.current = requestAnimationFrame(updatePos);
		}
	}, [gravity, ball]);

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

		if (context) {
			context.setTransform(
				1,
				0,
				0,
				-1,
				0,
				canvas.height
			);
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

		// if (kicked) {
		// 	kickAnimationRef.current = requestAnimationFrame(kickBallAnimation);

		// 	if (ball.velocityX <= 0.5 || ball.velocityX >= -0.5) {
		// 		setKicked(false);
		// 		cancelAnimationFrame(kickAnimationRef.current);
		// 	}
		// }


		if (gravity) {
			animationRef.current = requestAnimationFrame(updatePos);
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}

			if (kickAnimationRef.current) {
				cancelAnimationFrame(kickAnimationRef.current);
			}
		};
	}, [ball, gravity, updatePos, kicked]);

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
					<h2>Vx : {ball.velocityX}</h2>
					<Slider
						value={ball.velocityX}
						max={10}
						min={-10}
						handler={(e) => setBall({ ...ball, velocityX: parseFloat(parseFloat(e.target.value).toFixed(1)) })}
						className=""
					/>
				</div>
				<div className="mt-3">
					<label className="relative inline-flex items-center cursor-pointer mb-3">
						<input type="checkbox" className="sr-only peer" checked={gravity ? true : false} onChange={() => setGravity(prev => !prev)} />
						<div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
						<span className="ml-3 text-lg font-medium text-gray-300">Gravity</span>
					</label>
					<br />
					<button className="px-5 py-1 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600" onClick={() => {
						setBall({
							...ball,
							velocityX: 200
						});
						setKicked(true);
					}}>Kick Ball</button>
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