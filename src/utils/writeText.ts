interface Props {
	ctx: CanvasRenderingContext2D;
	start: { x: number, y: number };
	end: { x: number, y: number };
	text?: string;
	color: string;
}


export default function writeText(props: Props) {
	const { ctx, start, end, text, color } = props;
	ctx.beginPath();
	if (text) {
		ctx.fillText(text, end.x, -end.y - (end.y > 0 ? 10 : -10));
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = color;
	}
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;
	ctx.moveTo(start.x, start.y);
	ctx.lineTo(end.x, -end.y);
	ctx.stroke();
	ctx.closePath();
}