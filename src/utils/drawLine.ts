export interface Props {
	ctx: CanvasRenderingContext2D;
	start: { x: number, y: number };
	end: { x: number, y: number };
	color: string;
	text?: string;
}


export default function drawLine(props: Props) {
    const { ctx, start, end, color,text } = props;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, -end.y);
    if (text) {
        ctx.fillText(text, end.x, -end.y - 10);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    }
    ctx.stroke();
    ctx.closePath();

}
