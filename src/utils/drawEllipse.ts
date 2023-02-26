import vector2f from "./Vector2f";

export interface Props {
    ctx: CanvasRenderingContext2D;
    center: vector2f;
    radius: vector2f;
    color: string;
    concave: boolean;
    lens: boolean;
}

export default function drawEllipse(props: Props) {
    const {ctx, center, radius, color, concave, lens} = props;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    if(lens) {
        if(concave) {
            ctx.ellipse(center.getX(), center.getY(), radius.getX(), radius.getY(), 0, -Math.PI / 4, 0.25 * Math.PI);
            ctx.ellipse(-center.getX(), center.getY(), radius.getX(), radius.getY(), Math.PI, -Math.PI / 4, 0.25 * Math.PI);
            ctx.ellipse(center.getX(), center.getY(), radius.getX(), radius.getY(), 0, -Math.PI / 4, -Math.PI / 4);
        }
        else {
            ctx.ellipse(center.getX() - (center.getX() / 4), center.getY(), radius.getX(), radius.getY(), 0, -Math.PI * 0.23, 0.23 * Math.PI);
            ctx.ellipse(-center.getX() + (center.getX() / 4), center.getY(), radius.getX(), radius.getY(), 0, 0.77 * Math.PI, Math.PI * 1.23);
        }
    }
    else {
        if(!concave) {
            ctx.ellipse(center.getX(), center.getY(), radius.getX(), radius.getY(), 0, -Math.PI / 4, 0.25 * Math.PI);
        }
        else {
            ctx.ellipse(-center.getX(), center.getY(), radius.getX(), radius.getY(), Math.PI, -Math.PI / 4, 0.25 * Math.PI);
        }
    }



    // ctx.ellipse(0, 0, 50, 75, Math.PI / 4, 0, Math.PI);

    ctx.stroke();
    ctx.closePath();
}