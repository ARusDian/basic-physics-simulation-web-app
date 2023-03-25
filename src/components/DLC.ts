import writeText from "@/utils/writeText";
import drawLine from "@/utils/drawLine";



export default function drawPlane(
	context: CanvasRenderingContext2D,
	objectDistance: number,
	objectHeight: number,
	planeToggle: boolean,
	planeDistanceCoefficient: number,
) {
	if (planeToggle) {
		if (objectHeight >= 130) {
			//draw Boeing 767
			const planeTipDistance =  planeDistanceCoefficient* objectDistance;
			const planeTipHeight = 5/8 *objectHeight;
			writeText({
				ctx: context,
				start: { x: -planeTipDistance - 30, y: planeTipHeight + 12},
				end: {x: -planeTipDistance - 30, y: planeTipHeight + 12},
				text: "boeing 767",
				color: "black",
			});
			//plane's head
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance, y: planeTipHeight},
				end: { x: -planeTipDistance - 10, y: planeTipHeight + 10},
				color: "#5A5A5A",
			});
			//plane's pilot window
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 15, y: planeTipHeight + 6},
				end: { x: -planeTipDistance - 6, y: planeTipHeight + 6},
				color: "#5A5A5A",
			});
			//plane's bottom 1
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance, y: planeTipHeight},
				end: { x: -planeTipDistance - 25, y: planeTipHeight},
				color: "#5A5A5A",
			});
			//plane's bottom 2
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 35, y: planeTipHeight + 1},
				end: { x: -planeTipDistance - 52, y: planeTipHeight + 2},
				color: "#5A5A5A",
			});
			//plane's upper
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 10, y: planeTipHeight + 10},
				end: { x: -planeTipDistance - 50, y: planeTipHeight + 10},
				color: "#5A5A5A",
			});
			//plane's tail
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 50, y: planeTipHeight + 10},
				end: { x: -planeTipDistance - 55, y: planeTipHeight + 17},
				color: "#5A5A5A",
			});
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 55, y: planeTipHeight + 17},
				end: { x: -planeTipDistance - 59, y: planeTipHeight + 17},
				color: "#5A5A5A",
			});
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 59, y: planeTipHeight + 17},
				end: { x: -planeTipDistance - 56, y: planeTipHeight + 5},
				color: "#5A5A5A",
			});
			//plane's wing 1
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 47, y: planeTipHeight + 5},
				end: { x: -planeTipDistance - 56, y: planeTipHeight},
				color: "#5A5A5A",
			});
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 56, y: planeTipHeight},
				end: { x: -planeTipDistance - 62, y: planeTipHeight},
				color: "#5A5A5A",
			});
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 60, y: planeTipHeight},
				end: { x: -planeTipDistance - 54, y: planeTipHeight + 5},
				color: "#5A5A5A",
			});
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 54, y: planeTipHeight + 5},
				end: { x: -planeTipDistance - 47, y: planeTipHeight + 5},
				color: "#5A5A5A",
			});
			//plane's wing 2
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 20, y: planeTipHeight + 3},
				end: { x: -planeTipDistance - 42, y: planeTipHeight - 10},
				color: "#5A5A5A",
			});
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 42, y: planeTipHeight - 10},
				end: { x: -planeTipDistance - 50, y: planeTipHeight - 10},
				color: "#5A5A5A",
			});
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 48, y: planeTipHeight - 10},
				end: { x: -planeTipDistance - 32, y: planeTipHeight + 3},
				color: "#5A5A5A",
			});
			drawLine({
				ctx: context,
				start: { x: -planeTipDistance - 32, y: planeTipHeight + 3},
				end: { x: -planeTipDistance - 20, y: planeTipHeight + 3},
				color: "#5A5A5A",
			});
		}
	} else {
		return;
	}
}

export function drawTowers(
	context: CanvasRenderingContext2D,
	objectDistance: number,
	objectHeight: number,
	isBuilding: boolean,
) {
	if (isBuilding) {
		//draw twin tower
		//first tower
		drawLine({
			ctx: context,
			start: { x: -objectDistance - 45, y: 0 },
			end: { x: -objectDistance - 45, y: objectHeight - 20 },
			color: "#931A1A",
		});

		drawLine({
			ctx: context,
			start: { x: -objectDistance - 10, y: 0 },
			end: { x: -objectDistance - 10, y: objectHeight - 20 },
			color: "#931A1A",
		});

		drawLine({
			ctx: context,
			start: { x: -objectDistance - 45, y: objectHeight - 20 },
			end: { x: -objectDistance - 10, y: objectHeight - 20 },
			color: "#931A1A",
		});

		//second tower
		drawLine({
			ctx: context,
			start: { x: -objectDistance + 45, y: 0 },
			end: { x: -objectDistance + 45, y: objectHeight - 20 },
			color: "#931A1A",
		});

		drawLine({
			ctx: context,
			start: { x: -objectDistance + 10, y: 0 },
			end: { x: -objectDistance + 10, y: objectHeight - 20 },
			color: "#931A1A",
		});

		drawLine({
			ctx: context,
			start: { x: -objectDistance + 45, y: objectHeight - 20 },
			end: { x: -objectDistance + 10, y: objectHeight - 20 },
			color: "#931A1A",
		});

		//antenna
		drawLine({
			ctx: context,
			start: { x: -objectDistance - 30, y: objectHeight - 20},
			end: { x: -objectDistance, y: objectHeight},
			color: "#931A1A",
		});

		drawLine({
			ctx: context,
			start: { x: -objectDistance + 30, y: objectHeight - 20},
			end: { x: -objectDistance, y: objectHeight},
			color: "#931A1A",
		});
	} else {
		// Draw Object
		drawLine({
			ctx: context,
			start: { x: -objectDistance, y: 0 },
			end: { x: -objectDistance, y: objectHeight },
			color: "#ea96FF",
			text: "Object",
		});

	}
}



export function drawMirrorTowers_kuadranAtas(
	context: CanvasRenderingContext2D,
	mirrorObjectDistance: number,
	mirrorObjectHeight: number,
	isBuilding: boolean,
) {
	if (isBuilding) {
		//draw twin tower
		//first tower
		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) - 45, y: 0 },
			end: { x: -	(mirrorObjectDistance) - 45, y: -mirrorObjectHeight - 20 },
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) - 10, y: 0 },
			end: { x: -(mirrorObjectDistance) - 10, y: -mirrorObjectHeight - 20 },
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) - 45, y: -mirrorObjectHeight - 20 },
			end: { x: -(mirrorObjectDistance) - 10, y: -mirrorObjectHeight - 20 },
			color: "#D76D1B",
		});

		//second tower
		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) + 45, y: 0 },
			end: { x: -(mirrorObjectDistance) + 45, y: -mirrorObjectHeight - 20 },
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) + 10, y: 0 },
			end: { x: -(mirrorObjectDistance) + 10, y: -mirrorObjectHeight - 20 },
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) + 45, y: -mirrorObjectHeight - 20 },
			end: { x: -(mirrorObjectDistance) + 10, y: -mirrorObjectHeight - 20 },
			color: "#D76D1B",
		});

		//antenna
		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) - 30, y: -mirrorObjectHeight - 20},
			end: { x: -(mirrorObjectDistance), y: -mirrorObjectHeight},
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) + 30, y: -mirrorObjectHeight - 20},
			end: { x: -(mirrorObjectDistance), y: -mirrorObjectHeight},
			color: "#D76D1B",
		});
	} else {
		//draw mirror image
		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance), y: 0 },
			end: { x: -	(mirrorObjectDistance), y: -mirrorObjectHeight },
			color: "green",
			text: "Image",
		});
	}
}


export function drawMirrorTowers_kuadranBawah(
	context: CanvasRenderingContext2D,
	mirrorObjectDistance: number,
	mirrorObjectHeight: number,
	isBuilding: boolean,
) {
	if (isBuilding) {
		//draw twin tower
		//first tower
		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) - 45, y: 0 },
			end: { x: -	(mirrorObjectDistance) - 45, y: -mirrorObjectHeight + 20 },
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) - 10, y: 0 },
			end: { x: -(mirrorObjectDistance) - 10, y: -mirrorObjectHeight + 20 },
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) - 45, y: -mirrorObjectHeight + 20 },
			end: { x: -(mirrorObjectDistance) - 10, y: -mirrorObjectHeight + 20 },
			color: "#D76D1B",
		});

		//second tower
		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) + 45, y: 0 },
			end: { x: -(mirrorObjectDistance) + 45, y: -mirrorObjectHeight + 20 },
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) + 10, y: 0 },
			end: { x: -(mirrorObjectDistance) + 10, y: -mirrorObjectHeight + 20 },
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) + 45, y: -mirrorObjectHeight + 20 },
			end: { x: -(mirrorObjectDistance) + 10, y: -mirrorObjectHeight + 20 },
			color: "#D76D1B",
		});

		//antenna
		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) - 30, y: -mirrorObjectHeight + 20},
			end: { x: -(mirrorObjectDistance), y: -mirrorObjectHeight},
			color: "#D76D1B",
		});

		drawLine({
			ctx: context,
			start: { x: -(mirrorObjectDistance) + 30, y: -mirrorObjectHeight + 20},
			end: { x: -(mirrorObjectDistance), y: -mirrorObjectHeight},
			color: "#D76D1B",
		});
	} else {
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
	}

}                            