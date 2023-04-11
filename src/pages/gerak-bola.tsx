import Layout from "@/components/Layout";
import Slider from "@/components/Slider";
import AlgorithmMPT from "@/utils/AlgorithmMPT";
import Vector2f from "@/utils/Vector2f";
// import WorkInProgress from "@/components/WorkInProgress";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
export default function GerakBola() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ballX, setBallX] = useState(500);
	const [ballY, setBallY] = useState(500);

	const initDraw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void => {
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(0, 20);
		ctx.lineTo(canvas.width, 20);
		ctx.stroke();
		ctx.closePath();
	};

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
			// Clear the canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			initDraw(context, canvas);
			// Draw the line
			context.beginPath();
			context.moveTo(ballX, 20);
			context.lineTo(ballX, ballY); // Use canvas height to calculate the y-coordinate
			context.stroke();
		}
	}, [ballX, ballY]);


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
				<div className="flex flex-col gap-2 text-xl">
					<h2>X : {ballX}</h2>
					<Slider
						value={ballX}
						max={1060}
						min={20}
						handler={(e) => setBallX(parseInt(e.target.value))}
						className=""
					/>
				</div>
				<div className="flex flex-col gap-2 text-xl">
					<h2>Y : {ballY}</h2>
					<Slider
						value={ballY}
						max={720}
						min={20}
						handler={(e) => setBallY(parseInt(e.target.value))}
						className=""
					/>
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
