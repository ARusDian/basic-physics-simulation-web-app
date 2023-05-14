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

	// let x = center.getX() + (xo * Math.cos(rad)) - (yo * Math.sin(rad));
	// let y = center.getY() + (xo * Math.sin(rad)) + (yo * Math.cos(rad));

	// let x = ((xo) * Math.cos(rad)) - ((yo) * Math.sin(rad));
	// let y = ((xo) * Math.sin(rad)) + ((yo) * Math.cos(rad));

	drawMPTEllipese(x, y);


	// let rad = Math.atan(0.00096 * distance - 0.02);
	
	drawDDALine(new vector2f((center.getX() + x), (center.getY() + y)), new vector2f((center.getX() - x), (center.getY() - y)), "red");
	drawDDALine(new vector2f((center.getX() - y), (center.getY() - x)), new vector2f((center.getX() + y), (center.getY() + x)), "yellow");

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

		let rad = Math.atan(0.00278 * distance - 0.05556);

		let x1n = center.getX() + ((start.getX() - center.getX()) * Math.cos(rad)) - ((start.getY() - center.getY()) * Math.sin(rad));
		let y1n = center.getY() + ((start.getX() - center.getX()) * Math.sin(rad)) + ((start.getY() - center.getY()) * Math.cos(rad));

		let x2n = center.getX() + ((end.getX() - center.getX()) * Math.cos(rad)) - ((end.getY() - center.getY()) * Math.sin(rad));
		let y2n = center.getY() + ((end.getX() - center.getX()) * Math.sin(rad)) + ((end.getY() - center.getY()) * Math.cos(rad));

		const dx = Math.abs(x2n - x1n);
		const dy = Math.abs(y2n - y1n);
		const step = Math.max(Math.abs(dx), Math.abs(dy));

		const x_inc = dx / step;
		const y_inc = dy / step;

		let x = x1n;
		let y = y1n;

		for (let i = 0; i <= step; i++) {
			ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
			x += x_inc;
			y += y_inc;
		}

		ctx.stroke();
		ctx.closePath();
	}

	// function drawDDALine(start: vector2f, end: vector2f, colorDDA: string) {
	// 	ctx.beginPath();
	// 	ctx.strokeStyle = colorDDA;
	// 	ctx.fillStyle = colorDDA;
	// 	ctx.lineWidth = 1;

	// 	const dx = end.getX() - start.getX();
	// 	const dy = end.getY() - start.getY();
	// 	const step = Math.max(Math.abs(dx), Math.abs(dy));

	// 	const x_inc = dx / step;
	// 	const y_inc = dy / step;

	// 	let x = start.getX();
	// 	let y = start.getY();

	// 	for (let i = 0; i <= step; i++) {
	// 		ctx.fillRect(x, y, 1, 1);
	// 		x += x_inc;
	// 		y += y_inc;
	// 	}

	// 	ctx.stroke();
	// 	ctx.closePath();
	// }
}