import vector2f from "./Vector2f";

export interface Props {
	ctx: CanvasRenderingContext2D;
	start: vector2f;
	end: vector2f;
	color: string;
	beyond: boolean;
}

export default function AlgorithmDDA(props: Props) {
	const {ctx, start, end, color, beyond} = props;

	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 1;

	let x = start.getX();
	let y = start.getY();
	
	let dx = 0;
	let dy = 0;

	if(beyond) {
		const slope = (end.getY() - start.getY()) / (end.getX() - start.getX());
		const intercept = start.getY() - slope * start.getX();

		dx = (((start.getY() > 0 ? -720 : 720) - intercept) / slope) - start.getX();
		dy = (start.getY() > 0 ? -720 : 720) - start.getY();
	}
	else {
		dx = end.getX() - start.getX();
		dy = end.getY() - start.getY();
	}
	
	// const step = dx > dy ? dx : dy;
	const step = Math.max(Math.abs(dx), Math.abs(dy));

	const x_inc = dx / step;
	const y_inc = dy / step;

	for(let i = 0; i <= step; i++) {
		ctx.fillRect(x, y, 1, 1);
		x += x_inc;
		y += y_inc;
	}

	ctx.stroke();
	ctx.closePath();
}