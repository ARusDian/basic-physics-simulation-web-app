import DDA from "./DDA";
import { Props } from "./drawLine";

const drawLineDDA = ({ ctx, start, end, color, text } : Props) => {
	// const values = DDA(start, end);
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.moveTo(start.x, -start.y);
	ctx.lineTo(end.x, -end.y);
	// ctx.moveTo(values[0].x, -values[0].y);
	// for (let i = 1; i < values.length; i+=10) {
	// 	ctx.lineTo(values[i].x, -values[i].y);
	// }
	// ctx.lineTo(values[values.length-1].x, -values[values.length-1].y);
	// ctx.lineTo(end.x, -end.y);
	if (text) {
		ctx.fillText(text, end.x, -end.y - 10);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
	}
	ctx.stroke();
	ctx.closePath();
};
 
export default drawLineDDA;