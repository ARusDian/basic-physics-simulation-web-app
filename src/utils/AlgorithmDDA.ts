import vector2f from "./Vector2f";

export interface Props {
    ctx: CanvasRenderingContext2D;
    canvasHeight?: number;
	canvasWidth?: number;
    beforeStart?: vector2f;
    start: vector2f;
    end: vector2f;
    color: string;
    beyond?: boolean | false;
    isDash?: boolean | false;
}

export default function AlgorithmDDA(props: Props) {
    const {ctx, start, end, color, beyond, isDash, canvasHeight, canvasWidth, beforeStart} = props;

    ctx.clearRect(0, 0, 1080, 720);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    let x = start.getX();
    let y = start.getY();
    
    let dx = 0;
    let dy = 0;

    if(beyond) {
        // ctx.clearRect(0, 0, 1080, 720);

        // const slope = (end.getY() - start.getY()) / (end.getX() - start.getX());
        // const intercept = start.getY() - slope * start.getX();

        // dx = (((start.getY() > 0 ? -720 : 720) - intercept) / slope) - start.getX();
        // dy = (start.getY() > 0 ? -720 : 720) - start.getY();

        if (isDash) {
            ctx.setLineDash([5, 5]);
        } else {
            ctx.setLineDash([]);
        }
    
        if (beforeStart && !end.getY() && canvasWidth) {
            const slope = (start.getY() - beforeStart.getY()) / (start.getX() - beforeStart.getX());
            const intercept = start.getY() - slope * start.getX();
            const getY = (x: number) => {
                return slope * x + intercept;
            };
    
            end.setY(getY(end.getX()));
    
            console.log('end', end.getY());
            ctx.moveTo(start.getX(), -start.getY());
            ctx.lineTo(end.getX(), -end.getY());
            if (end.getX() < 0) {
                ctx.lineTo(-canvasWidth, -getY(-canvasWidth));
            } else {
                ctx.lineTo(canvasWidth, -getY(canvasWidth));
            }
    
        } else {
    
            const slope = (end.getY()! - start.getY()) / (end.getX() - start.getX());
            const intercept = start.getY() - slope * start.getX();
            const getX = (y: number) => {
                return (y - intercept) / slope;
            };
            ctx.moveTo(start.getX(), -start.getY());
            ctx.lineTo(end.getX(), -end.getY()!);
            ctx.lineTo(
                getX(start.getY() > 0 ? -canvasHeight! : canvasHeight!),
                start.getY() < 0 ? -canvasHeight! : canvasHeight!
            );
    
        }
    }
    else {
        dx = end.getX() - start.getX();
        dy = end.getY() - start.getY();
    }
    
    // const step = dx > dy ? dx : dy;
    const step = Math.max(Math.abs(dx), Math.abs(dy));

    const x_inc = dx / step;
    const y_inc = dy / step;

    if(isDash && !beyond) {
        for(let i = 0; i <= step; i++) {
            if(i%10 < 5){
                ctx.fillRect(x, y, 1, 1);

            }else{
                ctx.fillRect(x, y, 0, 0);
            }
            x += x_inc;
            y += y_inc;
        }
    }
    if(!isDash && !beyond) {
        for(let i = 0; i <= step; i++) {
            ctx.fillRect(x, y, 1, 1);
            x += x_inc;
            y += y_inc;
        }
    }

    ctx.stroke();
    ctx.closePath();
}