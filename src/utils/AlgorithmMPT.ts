import vector2f from "./Vector2f";

export interface Props {
    ctx: CanvasRenderingContext2D;
    center: vector2f;
    radius: number;
    color: string;
}

export default function AlgorithmMPT(props: Props) {
    const {ctx, center, radius, color} = props;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    let x = radius;
    let y = 0;
    let p = 1 - x;

    while(x >= y) {
        ctx.fillRect((x + center.getX()), (y + center.getY()), 1, 1);
        ctx.fillRect((y + center.getY()), (x + center.getX()), 1, 1);
        ctx.fillRect((-x + center.getX()), (y + center.getY()), 1, 1);
        ctx.fillRect((-y + center.getY()), (x + center.getX()), 1, 1);
        ctx.fillRect((-x + center.getX()), (-y + center.getY()), 1, 1);
        ctx.fillRect((-y + center.getY()), (-x + center.getX()), 1, 1);
        ctx.fillRect((x + center.getX()), (-y + center.getY()), 1, 1);
        ctx.fillRect((y + center.getY()), (-x + center.getX()), 1, 1);
        y++;

        if(p < 0) {
            p += 2 * y + 1;
        }
        else {
            x--;
            p += 2 * (y - x + 1);
        }
     }

    ctx.stroke();
    ctx.closePath();
}