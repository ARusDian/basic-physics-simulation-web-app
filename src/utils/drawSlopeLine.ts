interface Props {
    canvasHeight: number;
    ctx: CanvasRenderingContext2D;
    start: { x: number, y: number };
    end: { x: number, y: number };
    color: string;
    text?: string;
}


export default function drawSlopeLine(props: Props) {
    const { ctx, start, end, color, text } = props;

    const slope = (end.y - start.y) / (end.x - start.x);
    const intercept = start.y - slope * start.x;

    const getX = (y: number) => {
        return (y - intercept) / slope;
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    ctx.moveTo(getX(-props.canvasHeight), props.canvasHeight);
    ctx.lineTo(start.x, -start.y);
    ctx.lineTo(end.x, -end.y);
    ctx.lineTo(getX(props.canvasHeight), -props.canvasHeight);
    if (text) {
        ctx.fillText(text, start.x-end.x, -end.y - 10);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
    }
    ctx.stroke();
    ctx.closePath();
}
