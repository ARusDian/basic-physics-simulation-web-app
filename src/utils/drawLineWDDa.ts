import DDA from "./DDA";

interface Props {
	ctx: CanvasRenderingContext2D;
	start: { x: number, y: number };
	end: { x: number, y: number };
	color: string;
	text?: string;
	isInfinity?: boolean;
	canvasHeight?: number;
}

const drawLineDDA = (props: Props) => {

	const { ctx, start, end, color, text, isInfinity, canvasHeight } = props;
	
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 1;

	if (isInfinity && canvasHeight && end) {

		const slope = (end.y - start.y) / (end.x - start.x);
		const intercept = start.y - slope * start.x;

		const getX = (y: number) => {
			return (y - intercept) / slope;
		}

		console.log(start, { x: getX(canvasHeight), y: - canvasHeight });


		let { values, steps } = DDA(start, { x: getX(canvasHeight), y: - canvasHeight });

		console.log(steps)
	
		ctx.moveTo(values[0].x, -values[0].y);
		for (let i = 1; i < values.length; i += 10) {
			ctx.lineTo(values[i].x, -values[i].y);
		}
		ctx.lineTo(values[values.length - 1].x, -values[values.length - 1].y);
		ctx.lineTo(end.x, -end.y);
	} else {
		const { values, steps } = DDA(start, end);
		ctx.moveTo(values[0].x, -values[0].y);
		for (let i = 1; i < values.length; i += 10) {
			ctx.lineTo(values[i].x, -values[i].y);
		}
		ctx.lineTo(values[values.length - 1].x, -values[values.length - 1].y);
		ctx.lineTo(end.x, -end.y);
	}


	
	if (text) {
		ctx.fillText(text, end.x, -end.y - 10);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
	}
	ctx.stroke();
	ctx.closePath();
};

export default drawLineDDA;
