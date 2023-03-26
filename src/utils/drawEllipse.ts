import Vector2f from "./Vector2f";

export interface Props {
	ctx: CanvasRenderingContext2D;
	center: Vector2f;
	radius: Vector2f;
	color: string;
	concave: boolean;
	lens: boolean;
	height?: number;
}

export default function drawEllipse(props: Props) {
	const { ctx, center, radius, color, concave, lens, height } = props;

	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.lineWidth = 1;

	if (lens) {
		if (concave) {
			ctx.ellipse(center.getX(), center.getY(), radius.getX(), (height ? height : radius.getY()), 0, -Math.PI * 0.23, 0.23 * Math.PI);
			ctx.ellipse(-center.getX(), center.getY(), radius.getX(), (height ? height : radius.getY()), Math.PI, -Math.PI * 0.23, 0.23 * Math.PI);
			ctx.ellipse(center.getX(), center.getY(), radius.getX(), (height ? height : radius.getY()), 0, -Math.PI * 0.23, -Math.PI * 0.23);
		}
		else {
			ctx.ellipse(center.getX() - (center.getX() / 7), center.getY(), radius.getX(), (height ? height : radius.getY()), 0, -Math.PI * 0.23, 0.23 * Math.PI);
			ctx.ellipse(-center.getX() + (center.getX() / 7), center.getY(), radius.getX(), (height ? height : radius.getY()), 0, 0.77 * Math.PI, Math.PI * 1.23);
		}
	}
	else {
		if (!concave) {
			ctx.ellipse(center.getX(), center.getY(), radius.getX(), (height ? height : radius.getY()), 0, -Math.PI * 0.23, 0.23 * Math.PI);
		}
		else {
			ctx.ellipse(-center.getX(), center.getY(), radius.getX(), (height ? height : radius.getY()), Math.PI, -Math.PI * 0.23, 0.23 * Math.PI);
		}
	}



	// ctx.ellipse(0, 0, 50, 75, Math.PI / 4, 0, Math.PI);
}