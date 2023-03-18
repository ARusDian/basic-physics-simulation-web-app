import Slider from "@/components/Slider";
import drawInfiniteLine from "@/utils/drawInfiniteLine";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import drawLine from "../utils/drawLine";
import drawBaseView from "@/components/drawBaseView";
import AlgorithmDDA from "@/utils/AlgorithmDDA";
import AlgorithmMPT from "@/utils/AlgorithmMPT";
import Vector2f from "../utils/Vector2f";
import drawEllipse from "@/utils/drawEllipse";

export default function Lensa() {
	const [objectDistance, setObjectDistance] = useState(122);
	const [objectHeight, setObjectHeight] = useState(80);
	const [mirrorObjectDistance, setMirrorObjectDistance] = useState(0);
	const [mirrorObjectHeight, setMirrorObjectHeight] = useState(0);
	const [mirrorFocus, setmirrorFocus] = useState(250);
	const [isConvex, setIsConvex] = useState(true);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	function initDraw(
		ctx: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement
	): void {
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

	useEffect(() => {
		const goDraw = () => {
			if (!canvasRef.current) return;
			const canvas: HTMLCanvasElement = canvasRef.current;
			const context: CanvasRenderingContext2D | null =
				canvas.getContext("2d");
			if (context) {
				// For clear canvas
				// eslint-disable-next-line no-self-assign
				context.canvas.width = context.canvas.width;
				context.setTransform(
					1,
					0,
					0,
					1,
					canvas.width / 2,
					canvas.height / 2
				);
				context.clearRect(0, 0, canvas.width, canvas.height);
				initDraw(context, canvas);

				drawBaseView(context, canvas, mirrorFocus, false);

				// Draw Object
				drawLine({
					ctx: context,
					start: { x: -objectDistance, y: 0 },
					end: { x: -objectDistance, y: objectHeight },
					color: "#ea96FF",
					text: "Object",
				});

				if (isConvex) {
					const calculatedFocus = mirrorFocus;
					setMirrorObjectDistance(
						-(
							(objectDistance * calculatedFocus) /
							(objectDistance - calculatedFocus)
						)
					);
					setMirrorObjectHeight(
						-(
							(mirrorObjectDistance * objectHeight) /
							objectDistance
						)
					);

					// drawEllipse({
					// 	ctx: context,
					// 	center: new Vector2f(-mirrorFocus * 2, 0),
					// 	radius: new Vector2f(
					// 		1.95 * mirrorFocus,
					// 		2 * mirrorFocus
					// 	),
					// 	color: "blue",
					// 	concave: isConvex,
					// 	lens: true,
					// 	height: canvas.height,
					// });

					AlgorithmMPT({
						ctx: context,
						center: new Vector2f(-mirrorFocus * 2, 0),
						radius: new Vector2f(2 * mirrorFocus, 2 * mirrorFocus),
						color: "blue",
						height: canvas.height,
						concave: false,
						lens: true,
					});
					
					if (objectDistance == 0) {
						return;
					} else if (calculatedFocus == 0) {
						return;
					} else if (objectHeight == 0) {
						return;
					} else if (
						mirrorObjectDistance == Infinity ||
						mirrorObjectHeight == Infinity ||
						objectDistance == calculatedFocus
					) {
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(-objectDistance, canvas.height),
							color: "lime",
						});

						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(0, 0),
							color: "red",
						});

						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(0, -objectHeight),
							color: "cyan",
						});
						return;
					}

					

					// Draw MirrorObject
					drawLine({
						ctx: context,
						start: { x: -mirrorObjectDistance, y: 0 },
						end: {
							x: -mirrorObjectDistance,
							y: -mirrorObjectHeight,
						},
						color: "green",
						text: "Image",
					});

					if (objectDistance > calculatedFocus) {
						// drawLine({
						// 	ctx: context,
						// 	start: { x: -objectDistance, y: objectHeight },
						// 	end: { x: 0, y: objectHeight },
						// 	color: "cyan",
						// });
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(0, -objectHeight),
							color: "cyan",
						});
						
						// drawInfiniteLine({
						// 	ctx: context,
						// 	start: { x: 0, y: objectHeight },
						// 	end: { x: mirrorFocus, y: 0 },
						// 	color: "cyan",
						// 	canvasHeight: canvas.height,
						// });
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(0, objectHeight),
							end: new Vector2f(-mirrorObjectDistance, -mirrorObjectHeight),
							color: "cyan",
							canvasHeight: canvas.height,
							beyond: true,
						});

						// drawLine({
						// 	ctx: context,
						// 	start: { x: -objectDistance, y: objectHeight },
						// 	end: { x: -mirrorFocus, y: 0 },
						// 	color: "lime",
						// });
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(-mirrorFocus, 0),
							color: "lime",
						});

						// drawLine({
						// 	ctx: context,
						// 	start: { x: -mirrorFocus, y: 0 },
						// 	end: { x: 0, y: -mirrorObjectHeight },
						// 	color: "lime",
						// });
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-mirrorFocus, 0),
							end: new Vector2f(0, mirrorObjectHeight),
							color: "lime",
						});

						// drawLine({
						// 	ctx: context,
						// 	start: { x: 0, y: -mirrorObjectHeight },
						// 	end: { x: canvas.width, y: -mirrorObjectHeight },
						// 	color: "lime",
						// });
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(0, mirrorObjectHeight),
							end: new Vector2f(canvas.width, mirrorObjectHeight),
							color: "lime",
						});

						// drawInfiniteLine({
						// 	ctx: context,
						// 	start: { x: -objectDistance, y: objectHeight },
						// 	end: { x: 0, y: 0 },
						// 	color: "red",
						// 	canvasHeight: canvas.height,
						// });
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, objectHeight),
							end: new Vector2f(0, 0),
							color: "red",
							canvasHeight: canvas.height,
							beyond: true,
						});

						AlgorithmDDA({ //Sinar Datang
							ctx: context,
							start: new Vector2f(-canvas.width, -objectHeight),
							end: new Vector2f(-objectDistance, -objectHeight),
							color: "cyan",
						});
						AlgorithmDDA({ //Sinar Datang
							ctx: context,
							beforeStart: new Vector2f(0, -mirrorObjectHeight),
							start: new Vector2f(-objectDistance, objectHeight),
							end: new Vector2f(-canvas.width, 0),
							canvasWidth: canvas.width,
							color: "lime",
							beyond: true,
						});
						AlgorithmDDA({ //Sinar Datang
							ctx: context,
							beforeStart: new Vector2f(0, 0),
							start: new Vector2f(-objectDistance, objectHeight),
							end: new Vector2f(-canvas.width, 0),
							canvasWidth: canvas.width,
							color: "red",
							beyond: true,
						});
					} else {
						AlgorithmDDA({ //Sinar Datang
							ctx: context,
							start: new Vector2f(-canvas.width, -objectHeight),
							end: new Vector2f(-objectDistance, -objectHeight),
							color: "lime",
						});
						AlgorithmDDA({ //Sinar Datang
							ctx: context,
							beforeStart: new Vector2f(0, -mirrorObjectHeight),
							start: new Vector2f(-objectDistance, objectHeight),
							end: new Vector2f(-canvas.width, 0),
							canvasWidth: canvas.width,
							color: "cyan",
							beyond: true,
						});
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(
								-mirrorObjectDistance,
								mirrorObjectHeight
							),
							end: new Vector2f(0, mirrorObjectHeight),
							color: "cyan",
							isDash: true,
						});
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(
								-mirrorObjectDistance,
								mirrorObjectHeight
							),
							end: new Vector2f(0, -objectHeight),
							color: "lime",
							isDash: true,
						});
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(
								-mirrorObjectDistance,
								mirrorObjectHeight
							),
							end: new Vector2f(-objectDistance, -objectHeight),
							color: "red",
							isDash: true,
						});
						AlgorithmDDA({
							ctx: context,
							beforeStart: new Vector2f(
								-objectDistance,
								objectHeight
							),
							start: new Vector2f(0, -mirrorObjectHeight),
							end: new Vector2f(0, 0),
							color: "cyan",
							canvasWidth: canvas.width,
							beyond: true,
						});

						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(0, mirrorObjectHeight),
							color: "cyan",
						});

						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(0, objectHeight),
							end: new Vector2f(mirrorFocus, 0),
							color: "lime",
							canvasHeight: canvas.height,
							beyond: true,
						});

						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(0, -objectHeight),
							color: "lime",
						});

						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, objectHeight),
							end: new Vector2f(0, 0),
							color: "red",
							canvasHeight: canvas.height,
							beyond: true,
						});
					}
				} else {
					const calculatedFocus = -mirrorFocus;
					setMirrorObjectDistance(
						-(objectDistance * calculatedFocus) /
							(objectDistance - calculatedFocus)
					);
					setMirrorObjectHeight(
						-(mirrorObjectDistance * objectHeight) / objectDistance
					);
					// drawEllipse({
					// 	ctx: context,
					// 	center: new Vector2f(-mirrorFocus * 2, 0),
					// 	radius: new Vector2f(2 * mirrorFocus, 2 * mirrorFocus),
					// 	color: "blue",
					// 	concave: isConvex,
					// 	lens: true,
					// 	height: canvas.height,
					// });
					AlgorithmMPT({
						ctx: context,
						center: new Vector2f(-mirrorFocus * 2, 0),
						radius: new Vector2f(2 * mirrorFocus, 2 * mirrorFocus),
						color: "blue",
						height: canvas.height,
						concave: true,
						lens: true,
					});
					if (objectDistance == 0) {
						return;
					} else if (calculatedFocus == 0) {
						return;
					} else if (objectHeight == 0) {
						return;
					} else if (
						mirrorObjectDistance == Infinity ||
						mirrorObjectHeight == Infinity
					) {
						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(-objectDistance, canvas.height),
							color: "lime",
						});

						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(0, 0),
							color: "red",
						});

						AlgorithmDDA({
							ctx: context,
							start: new Vector2f(-objectDistance, -objectHeight),
							end: new Vector2f(0, -objectHeight),
							color: "cyan",
						});
						return;
					}
					drawLine({
						ctx: context,
						start: { x: -mirrorObjectDistance, y: 0 },
						end: {
							x: -mirrorObjectDistance,
							y: -mirrorObjectHeight,
						},
						color: "green",
						text: "Image",
					});
					AlgorithmDDA({
						ctx: context,
						start: new Vector2f(-objectDistance, -objectHeight),
						end: new Vector2f(0, -objectHeight),
						color: "cyan",
					});
					AlgorithmDDA({
						ctx: context,
						start: new Vector2f(
							-mirrorObjectDistance,
							mirrorObjectHeight
						),
						end: new Vector2f(0, -objectHeight),
						color: "cyan",
						isDash: true,
					});
					AlgorithmDDA({
						ctx: context,
						beforeStart: new Vector2f(
							-mirrorObjectDistance,
							-mirrorObjectHeight
						),
						start: new Vector2f(0, objectHeight),
						end: new Vector2f(canvas.width, 0),
						color: "cyan",
						canvasWidth: canvas.width,
						beyond: true,
					});

					AlgorithmDDA({ //Sinar Datang
						ctx: context,
						start: new Vector2f(-canvas.width, -objectHeight),
						end: new Vector2f(-objectDistance, -objectHeight),
						color: "cyan",
					});
					AlgorithmDDA({ //Sinar Datang
						ctx: context,
						beforeStart: new Vector2f(0, -mirrorObjectHeight),
						start: new Vector2f(-objectDistance, objectHeight),
						end: new Vector2f(-canvas.width, 0),
						canvasWidth: canvas.width,
						color: "lime",
						beyond: true,
					});
					AlgorithmDDA({ //Sinar Datang
						ctx: context,
						beforeStart: new Vector2f(0, 0),
						start: new Vector2f(-objectDistance, objectHeight),
						end: new Vector2f(-canvas.width, 0),
						canvasWidth: canvas.width,
						color: "red",
						beyond: true,
					});

					AlgorithmDDA({
						ctx: context,
						start: new Vector2f(-objectDistance, objectHeight),
						end: new Vector2f(0, 0),
						color: "red",
						canvasHeight: canvas.height,
						beyond: true,
					});

					AlgorithmDDA({
						ctx: context,
						start: new Vector2f(
							-mirrorObjectDistance,
							mirrorObjectHeight
						),
						end: new Vector2f(0, mirrorObjectHeight),
						color: "lime",
						isDash: true,
					});
					AlgorithmDDA({
						ctx: context,
						start: new Vector2f(-objectDistance, -objectHeight),
						end: new Vector2f(0, mirrorObjectHeight),
						color: "lime",
					});
					AlgorithmDDA({
						ctx: context,
						start: new Vector2f(0, -mirrorObjectHeight),
						end: new Vector2f(canvas.width, -mirrorObjectHeight),
						color: "lime",
						canvasHeight: canvas.height,
						beyond: true,
					});
				}
			}
		};
		goDraw();
	}, [
		isConvex,
		mirrorFocus,
		mirrorObjectDistance,
		mirrorObjectHeight,
		objectDistance,
		objectHeight,
		setIsConvex,
	]);
	const configBar = () => {
		return (
			<>
				<div className="flex mt-4 mx-4">
					<div
						className={`text-xl ${
							!isConvex ? "text-cyan-400" : ""
						}`}
					>
						Concave
					</div>
					<div className="flex items-center justify-center w-full">
						<label className="flex items-center cursor-pointer">
							<div className="relative">
								<input
									type="checkbox"
									id="toggleB"
									className="sr-only"
									onChange={() => setIsConvex(!isConvex)}
								/>
								<div className="block bg-gray-600 w-14 h-8 rounded-full" />
								<div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
							</div>
							<div className="ml-3 text-gray-700 font-medium"></div>
						</label>
					</div>
					<div
						className={`text-xl ${isConvex ? "text-cyan-400" : ""}`}
					>
						Convex
					</div>
				</div>
				<div className="flex my-20">
					<Slider
						handler={(e) =>
							setmirrorFocus(parseInt(e.target.value))
						}
						className="slider-vertical"
						value={mirrorFocus}
						max={540}
						min={0}
					/>
					<Slider
						handler={(e) =>
							setObjectHeight(parseInt(e.target.value))
						}
						className="slider-vertical"
						value={objectHeight}
						max={360}
						min={-360}
					/>
					<Slider
						handler={(e) =>
							setObjectDistance(parseInt(e.target.value))
						}
						className="slider-vertical"
						value={objectDistance}
						max={540}
						min={0}
					/>
				</div>
				<div className="flex justify-between mx-16">
					<div className="text-xl">f</div>
					<div className="text-xl">h</div>
					<div className="text-xl">s</div>
				</div>
				<div className="flex mt-2 mx-4">
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
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"></td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									h
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									Height of Object
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"></td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									f
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									Focus of Mirror
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"></td>
							</tr>
						</tbody>
					</table>
				</div>

				<div className="flex mt-4 mx-4">
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
										onChange={(e) =>
											setObjectDistance(
												parseFloat(e.target.value)
											)
										}
										min={0}
										step={"any"}
									/>
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									{mirrorObjectDistance}
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
										onChange={(e) =>
											setObjectHeight(
												parseFloat(e.target.value)
											)
										}
										min={-360}
										step={"any"}
									/>
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									{mirrorObjectHeight}
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									f
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									<div className="flex">
										{isConvex ? "" : "-"}
										<input
											type="number"
											className="w-20 bg-transparent"
											value={mirrorFocus}
											onChange={(e) =>
												setmirrorFocus(
													parseFloat(e.target.value)
												)
											}
											min={0}
											step={"any"}
										/>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									P ={" "}
									{100 /
										(isConvex ? mirrorFocus : -mirrorFocus)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</>
		);
	};

	return (
		<>
			<Head>
				<title>Simulasi Cahaya</title>
			</Head>
			<Layout configBar={configBar}>
				<div className="flex flex-col items-center justify-center w-full h-full">
					<canvas
						ref={canvasRef}
						width={1080}
						height={720}
						className={"bg-white"}
					></canvas>
				</div>
			</Layout>
		</>
	);
}
