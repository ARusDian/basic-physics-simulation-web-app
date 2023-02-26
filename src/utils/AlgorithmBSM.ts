import vector2f from "./Vector2f";

export interface Props {
    ctx: CanvasRenderingContext2D;
    center: vector2f;
    radius: number;
    color: string;
}

export default function AlgorithmBSM(props: Props) {
    const {ctx, center, radius, color} = props;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    let x = 0;
    let y = radius;
    let p = 3 - 2 * radius;

    while(x <= y) {
        ctx.fillRect(x + center.getX(), y + center.getY(), 1, 1);
        ctx.fillRect(y + center.getX(), x + center.getY(), 1, 1);

        x++;
        if(p < 0) {
            p = p + 4 * x + 6;
        }
        else {
            y--;
            p = p + 4 * (x - y) + 10;
        }
    }

    ctx.stroke();
    ctx.closePath();
}