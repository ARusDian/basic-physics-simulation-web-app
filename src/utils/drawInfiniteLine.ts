interface Props {
	canvasHeight?: number;
	canvasWidth?: number;
	ctx: CanvasRenderingContext2D;
	beforeStart?: { x: number, y: number }
	start: { x: number, y: number };
	end: { x: number, y?: number };
	color: string;
	text?: string;
	isDash?: boolean;
}


export default function drawInfiniteLine(props: Props) {
	const { ctx, start, end, color, text, canvasHeight, canvasWidth, beforeStart , isDash} = props;
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 1;
	if (isDash) {
		ctx.setLineDash([5, 5]);
	} else {
		ctx.setLineDash([]);
	}


	if (beforeStart && !end.y && canvasWidth) {
		const slope = (start.y - beforeStart.y) / (start.x - beforeStart.x);
		const intercept = start.y - slope * start.x;
		const getY = (x: number) => {
			return slope * x + intercept;
		}

		end.y = getY(end.x);

		console.log('end', end.y);
		ctx.moveTo(start.x, -start.y);
		ctx.lineTo(end.x, -end.y);
		ctx.lineTo(canvasWidth, -end.y);

	} else {

		const slope = (end.y! - start.y) / (end.x - start.x);
		const intercept = start.y - slope * start.x;
		const getX = (y: number) => {
			return (y - intercept) / slope;
		}
		ctx.moveTo(start.x, -start.y);
		ctx.lineTo(end.x, -end.y!);
		ctx.lineTo(
			getX(start.y > 0 ? -canvasHeight! : canvasHeight!),
			start.y < 0 ? -canvasHeight! : canvasHeight!
		);

	}





	if (text) {
		ctx.fillText(text, start.x - end.x, -end.y! - 10);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
	}
	ctx.stroke();
	ctx.closePath();
}
