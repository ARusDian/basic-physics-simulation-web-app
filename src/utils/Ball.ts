import vector2f from "./Vector2f";

export interface Props {
	ctx: CanvasRenderingContext2D;
	center: vector2f;
	radius: vector2f;
	color: string;
	distance: number;
}

export default function Ball(props: Props) {
	const { ctx, center, radius, color, distance} = props;

	// ctx.beginPath();
	// ctx.strokeStyle = color;
	// ctx.fillStyle = color;
	// ctx.lineWidth = 1;

	const rx = radius.getX();
	const ry = radius.getY();

	const srx = rx * rx;
	const sry = ry * ry;

	const twoSRX = 2 * srx;
	const twoSRY = 2 * sry;

	let p = 0;
	let x = 0;
	let y = ry;
	let px = 0;
	let py = twoSRX * y;

	let rad = (distance / rx);

	// let x = px + ((xo - px) * Math.cos(rad)) - ((yo - py) * Math.sin(rad));
	// let y = py + ((xo - px) * Math.sin(rad)) + ((yo - py) * Math.cos(rad));

	drawMPTEllipese(x, y);
    drawDDALine(new vector2f((center.getX() + x), (center.getY() + y)), new vector2f((center.getX() - x), (center.getY() - y)));
    drawDDALine(new vector2f((center.getX() - y), (center.getY() - x)), new vector2f((center.getX() + y), (center.getY() + x)));

	p = Math.round(sry - (srx * ry) + (0.25 * srx));
	while (px < py) {
		x++;
		px += twoSRY;
		if (p < 0) {
			p += sry + px;
		}
		else {
			y--;
			py -= twoSRX;
			p += sry + px - py;
		}
		drawMPTEllipese(x, y);
	}

	p = Math.round(sry * (x + 0.5) * (x + 0.5) + srx * (y - 1) * (y - 1) - srx * sry);
	while (y > 0) {
		y--;
		py -= twoSRX;
		if (p > 0) {
			p += srx - py;
		}
		else {
			x++;
			px += twoSRY;
			p += srx - py + px;
		}
		drawMPTEllipese(x, y);
	}
	// ctx.stroke();
	// ctx.closePath();

	function drawMPTEllipese(x: number, y: number) {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.lineWidth = 1;

        ctx.fillRect((center.getX() + x), (center.getY() + y), 1, 1);
        ctx.fillRect((center.getX() + x), (center.getY() - y), 1, 1);
        ctx.fillRect((center.getX() - x), (center.getY() + y), 1, 1);
        ctx.fillRect((center.getX() - x), (center.getY() - y), 1, 1);

		ctx.stroke();
		ctx.closePath();
	}

    function drawDDALine(start: vector2f, end : vector2f) {
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
		ctx.lineWidth = 1;

        const dx = end.getX() - start.getX();
		const dy = end.getY() - start.getY();
		const step = Math.max(Math.abs(dx), Math.abs(dy));

		const x_inc = dx / step;
		const y_inc = dy / step;

		let x = start.getX();
		let y = start.getY();

        for (let i = 0; i <= step; i++) {
            ctx.fillRect(x, y, 1, 1);
            x += x_inc;
            y += y_inc;
        }

		ctx.stroke();
		ctx.closePath();
    }
}