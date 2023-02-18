export interface Props {
	ctx: CanvasRenderingContext2D;
	start: { x: number, y: number };
	end: { x: number, y: number };
	color: string;
	text?: string;
	isDash?: boolean;
}


export default function drawLine(props: Props) {
	const { ctx, start, end, color,text, isDash } = props;
	ctx.beginPath();
	ctx.strokeStyle = color;
	if (isDash) {
		ctx.setLineDash([5, 5]);
	} else {
		ctx.setLineDash([]);
	}
	ctx.moveTo(start.x, -start.y);
	ctx.lineTo(end.x, -end.y);
	if (text) {
		ctx.fillText(text, end.x, -end.y - (end.y > 0 ? 10 : -10));
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
	}
	ctx.stroke();
	ctx.closePath();

}
