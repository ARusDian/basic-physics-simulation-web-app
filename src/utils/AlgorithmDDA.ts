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

    let nx = 0;
    let ny = 0;

    let slope = 0;

    let intercept = 0;

    if(beyond) {
        slope = (end.getY() - start.getY()) / (end.getX() - start.getX());
        intercept = start.getY() - slope * start.getX();

        nx = (720 - intercept) / slope;
        ny = slope * 1080 + intercept;

        dx = nx;
        dy = ny;
    }
    else {
        dx = end.getX() - start.getX();
        dy = end.getY() - start.getY();
    }
    
    const step = dx > dy ? dx : dy;

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