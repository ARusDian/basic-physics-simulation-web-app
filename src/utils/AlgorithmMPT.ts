import vector2f from "./Vector2f";

export interface Props {
    ctx: CanvasRenderingContext2D;
    center: vector2f;
    radius: vector2f;
    color: string;
    height?: number;
    concave: boolean;
	lens: boolean;
}

export default function AlgorithmMPT(props: Props) {
    const {ctx, center, radius, color, height, concave, lens} = props;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    let rx = radius.getX();
    let ry = height ? height : radius.getY();

    let srx = rx * rx;
    let sry = ry * ry;

    let twoSRX = 2 * srx;
    let twoSRY = 2 * sry;

    let p = 0;
    let x = 0;
    let y = ry;
    let px = 0;
    let py = twoSRX * y;
    let i = 0;

    drawMPTEllipese(x, y);

    p = Math.round(sry - (srx * ry) + (0.25 * srx));
    while(px < py) {
        x++;
        px += twoSRY;
        if(p < 0) {
            p += sry + px;
        }
        else {
            y--;
            py -= twoSRX;
            p += sry + px - py;
        }
        drawMPTEllipese(x, y);
        i++;
    }

    p = Math.round(sry * (x + 0.5) * (x + 0.5) + srx * (y-1) * (y - 1) - srx * sry);
    while(y > 0) {
        y--;
        py -= twoSRX;
        if(p > 0) {
            p += srx - py;
        }
        else {
            x++;
            px += twoSRY;
            p += srx - py + px;
        }
        drawMPTEllipese(x, y);
        i++;
    }

    ctx.stroke();
    ctx.closePath();

    function drawMPTEllipese(x: number, y: number) {
        if(lens) {
            if(concave) {
                ctx.fillRect((center.getX() + x + rx / 7), (center.getY() + y), 1, 1);
                ctx.fillRect((-center.getX() - x - rx / 7), (center.getY() + y), 1, 1);
                ctx.fillRect((center.getX() + x + rx / 7), (center.getY() - y), 1, 1);
                ctx.fillRect((-center.getX() - x - rx / 7), (center.getY() - y), 1, 1);
            }
            else {
                ctx.fillRect((center.getX() + x - rx / 100), (center.getY() + y), 1, 1);
                ctx.fillRect((-center.getX() - x + rx / 100), (center.getY() + y), 1, 1);
                ctx.fillRect((center.getX() + x - rx / 100), (center.getY() - y), 1, 1);
                ctx.fillRect((-center.getX() - x + rx / 100), (center.getY() - y), 1, 1);
            }
        }
        else {
            if(concave) {
                ctx.fillRect((center.getX() + x), (center.getY() + y), 1, 1);
                ctx.fillRect((center.getX() + x), (center.getY() - y), 1, 1);
            }
            else {
                ctx.fillRect((-center.getX() - x), (center.getY() + y), 1, 1);
                ctx.fillRect((-center.getX() - x), (center.getY() - y), 1, 1);
            }
        }
        
    }
}