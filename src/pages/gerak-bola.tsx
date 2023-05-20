import Layout from "@/components/Layout";
import Slider from "@/components/Slider";
// import AlgorithmDDA from "@/utils/AlgorithmDDA";
// import AlgorithmMPT from "@/utils/AlgorithmMPT";
import Ball from "@/utils/Ball";
import Vector2f from "@/utils/Vector2f";
// import WorkInProgress from "@/components/WorkInProgress";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
export default function GerakBola() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number | null>(null);
	// const [ballX, setBallX] = useState(500);
	// const [ballY, setBallY] = useState(500);
	// const [velocityY, setVelocityY] = useState(0);
	const [gravity, setGravity] = useState<boolean>(true);
	const [ball, setBall] = useState({
		posX: 500,
		posY: 500,
		velocityY: 0,
		bounceFactor: 0.8,
		radius: 100,
	});

	const initDraw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(0, 20);
		ctx.lineTo(canvas.width, 20);
		ctx.stroke();
		ctx.closePath();
	};

	// const gravity = 9.81;
	// const bounce = 0.7;
	// let tempVelocityY = velocityY;

	// function update(deltaTime : number) {
	// 	tempVelocityY += Math.floor(Math.sqrt(2 * gravity * ballY) * deltaTime);

	// 	if(ballY < 120) {
	// 		tempVelocityY = Math.floor(tempVelocityY -bounce);
	// 	}

	// 	setVelocityY(tempVelocityY);
	// 	setBallY(ballY - tempVelocityY);
	// }

	// let lastTime = Date.now();
	// function loopState() {
	// 	requestAnimationFrame(loopState);
	// 	const now = Date.now();
	// 	const deltaTime = (now - lastTime) / 1000;
	// 	lastTime = now;

	// 	update(deltaTime);
	// }

	const updatePos = useCallback(() => {
		// let vt = Math.sqrt(2 * 9.8 * (ball.posY/10));
		let newVelocityY = ball.velocityY + 0.1;
		const newY = Math.floor(ball.posY - newVelocityY);
		if (newY > 0 && newY < 120) {
			newVelocityY = Math.floor(-ball.velocityY * ball.bounceFactor);
			setBall({
				...ball,
				velocityY: newVelocityY,
				bounceFactor: ball.bounceFactor * 1,
			});
		} else {
			setBall({
				...ball,
				posY: newY,
				velocityY: newVelocityY,
				radius: (-0.0012 * ball.posY + 1.15) * 100
			});
		}

		if (gravity) {
			animationRef.current = requestAnimationFrame(updatePos);
		}
	}, [gravity, ball]);

	useEffect(() => {
		// function updateBall() {
		// 	let height = ballY - 120;
		// 	let gravity = 9.81;

		// 	let time = Math.sqrt((2 * height) / gravity);
		// 	for(let i = 0; i < time; i++) {
		// 		const now = performance.now();
		// 		const deltaTime = (now - lastTime) / 1000;
		// 		lastTime = now;

		// 		setBallY(ballY - Math.round(Math.sqrt(2 * gravity * height) * deltaTime));
		// 	}
		// }

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
			// Clear the canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			initDraw(context, canvas);
			// Draw the line
			context.beginPath();
			// context.moveTo(ball.posX, 20);
			// context.lineTo(ball.posX, ball.posY);
			context.stroke();

			// if (ballY < 120) {
			// 	setBallY(120);
			// }
			// if (ballY > 120) {
			// 	let height = ballY - 120;
			// 	let gravity = 9.81;

			// 	let time = Math.round(Math.sqrt((2 * height) / gravity));
			// 	for(let i = 0; i <= time; i++) {
			// 		const now = Date.now();
			// 		const deltaTime = (now - lastTime) / (1000 / 60);
			// 		lastTime = now;

			// 		let velocity = -1 * Math.round(Math.sqrt(2 * gravity * height) * deltaTime)

			// 		// setBallY(Math.round((velocity * i) + (0.5 * gravity * (i ** 2))))

			// 		setBallY(height + velocity);
			// 		console.log(ballY);
			// 		// console.log((height + 120) - Math.round(Math.sqrt(2 * gravity * height) * deltaTime));
			// 		// console.log(deltaTime);
			// 	}
			// }

			Ball({
				ctx: context,
				center: new Vector2f(ball.posX, ball.posY),
				radius: new Vector2f(ball.radius, ball.radius),
				color: "blue",
				distance: ball.posX,
			});

			// AlgorithmMPT({
			// 	ctx: context,
			// 	center: new Vector2f(ballX, ballY),
			// 	radius: new Vector2f(100, 100),
			// 	color: "blue",
			// 	ball: true,
			// });

			// AlgorithmDDA({
			// 	ctx: context,
			// 	start: new Vector2f(ballX + 100, ballY),
			// 	end: new Vector2f(ballX, ballY),
			// 	color: "blue",
			// });
		}

		if (gravity) {
			animationRef.current = requestAnimationFrame(updatePos);
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [ball, gravity, updatePos]);


	// useEffect(() => {
	// 	if (!canvasRef.current) return;
	// 	const canvas: HTMLCanvasElement = canvasRef.current;
	// 	const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
	// 	if (context) {
	// 		context.clearRect(0, 0, canvas.width, canvas.height);
	// 		context.translate(0, canvas.height);
	// 		context.scale(1, -1);

	// 		context.beginPath();
	// 		context.moveTo(ballX, 20);
	// 		context.lineTo(ballX, canvas.height - ballY);
	// 		context.stroke();
	// 		// initDraw(context, canvas);
	// 		// AlgorithmMPT({
	// 		// 	ctx: context,
	// 		// 	center: new Vector2f(ballX, ballY),
	// 		// 	radius: new Vector2f(2 * ballX, 2 * ballX),
	// 		// 	color: "black",
	// 		// 	height: canvas.height,
	// 		// 	ball: true
	// 		// });
	// 	}
	// }, [ballX, ballY]);

	const configBar = () => (
		<>
			<div className="flex flex-col mx-auto my-8 px-10 gap-4">
				<h2>Vy : {ball.velocityY}</h2>
				<div className="flex flex-col gap-2 text-xl">
					<h2>X : {ball.posX}</h2>
					<Slider
						value={ball.posX}
						max={1060}
						min={20}
						handler={(e) => setBall({ ...ball, posX: parseInt(e.target.value) })}
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
							...ball, posY: parseInt(e.target.value), velocityY: 0,
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
						handler={(e) => setBall({ ...ball, bounceFactor: parseFloat(parseFloat(e.target.value).toFixed(1)) })}
						className=""
					/>
				</div>
				<div className="mt-3">
					<label className="relative inline-flex items-center cursor-pointer">
						<input type="checkbox" className="sr-only peer" checked={gravity ? true : false} onChange={() => setGravity(prev => !prev)} />
						<div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
						<span className="ml-3 text-lg font-medium text-gray-300">Gravity</span>
					</label>
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