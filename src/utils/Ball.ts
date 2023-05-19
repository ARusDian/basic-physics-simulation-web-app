import vector2f from "./Vector2f";

export interface Props {
	ctx: CanvasRenderingContext2D;
	center: vector2f;
	radius: vector2f;
	color: string;
	distance: number;
}

export default function Ball(props: Props) {
	const { ctx, center, radius, color, distance } = props;

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

	drawMPTEllipese(x, y);

	drawDDALine(new vector2f((center.getX() - y), (center.getY())), new vector2f((center.getX() + y), (center.getY())), "blue");
	drawDDALine(new vector2f((center.getX()), (center.getY() - y)), new vector2f((center.getX()), (center.getY() + y)), "red");

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

	function drawDDALine(start: vector2f, end: vector2f, colorDDA: string) {
		ctx.beginPath();
		ctx.strokeStyle = colorDDA;
		ctx.fillStyle = colorDDA;
		ctx.lineWidth = 1;

		// const m = (1 - 0) / (1920 - 0);
		// const b = 0 - m * 0;

		// const rad = Math.atan(-m * distance + b);

		const scaleFactor = 0.5;
		const angle = distance * scaleFactor;

		const rad = -(Math.PI / 180) * angle;

		const dx = end.getX() - start.getX();
		const dy = end.getY() - start.getY();
		const step = Math.max(Math.abs(dx), Math.abs(dy));

		const x_inc = dx / step;
		const y_inc = dy / step;

		let xDDA = start.getX();
		let yDDA = start.getY();

		for (let i = 0; i <= step; i++) {
			const xn = center.getX() + ((xDDA - center.getX()) * Math.cos(rad)) - ((yDDA - center.getY()) * Math.sin(rad));
			const yn = center.getY() + ((xDDA - center.getX()) * Math.sin(rad)) + ((yDDA - center.getY()) * Math.cos(rad));

			ctx.fillRect(Math.round(xn), Math.round(yn), 1, 1);
			xDDA += x_inc;
			yDDA += y_inc;
		}

		ctx.stroke();
		ctx.closePath();
	}
}