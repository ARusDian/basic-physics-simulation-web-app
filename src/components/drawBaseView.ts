import drawLine from "@/utils/drawLine";
import writeText from "@/utils/writeText";

export default function drawBaseView (
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	mirrorFocus: number,
	isMirror : boolean,
)  {
	if (isMirror) {
		// Draw Focus coordinate
		drawLine({
			ctx: context,
			start: { x: - mirrorFocus, y: 0 },
			end: { x: -	mirrorFocus, y: 30 },
			color: "purple",
			text: "Focus",
		});
		// Draw Curvature Point
		drawLine({
			ctx: context,
			start: { x: - mirrorFocus * 2, y: 2 },
			end: { x: -	mirrorFocus * 2, y: 30 },
			color: "brown",
			text: "Curvature",
		});
		//text for 1st object dimension(ruang cahaya I)
		writeText({
			ctx: context,
			start: { x: - mirrorFocus + mirrorFocus * 0.5, y: 2 },
			end: { x: -	mirrorFocus + mirrorFocus * 0.5, y: -20 },
			text: "Ruang I",
			color: 'black',
		});
		//text for 2nd object dimension(ruang cahaya II)
		writeText({
			ctx: context,
			start: { x: - mirrorFocus * 1.5, y: 2 },
			end: { x: -	mirrorFocus * 1.5, y: -20 },
			text: "Ruang II",
			color: 'black',
		});
		//text for 3rd object dimension(ruang cahaya III)
		writeText({
			ctx: context,
			start: { x: - mirrorFocus * 2.5, y: 2 },
			end: { x: -	mirrorFocus * 2.5, y: -20 },
			text: "Ruang III",
			color: 'black',
		});
		//text for 4th object dimension(ruang cahaya IV)
		writeText({
			ctx: context,
			start: { x: canvas.width / 3, y: 0 },
			end: { x: canvas.width / 4, y: -20 },
			text: "Ruang IV",
			color: 'black',
		});

		writeText({
			ctx: context,
			start: { x: - canvas.width / 2.5, y: 0 },
			end: { x: - canvas.width / 2.5, y: 0 },
			text: "",
			color: "#7D379",
		});

		//text keterangan ruang benda
		writeText({
			ctx: context,
			start: { x: - canvas.width / 2.5, y: 0 },
			end: { x: - canvas.width / 2.5, y: 300 },
			text: "Ruang benda (depan)",
			color: "#3E8497",
		});

		writeText({
			ctx: context,
			start: { x: - canvas.width / 2.5, y: 0 },
			end: { x: - canvas.width / 2.5, y: 300 },
			text: "Ruang benda (depan)",
			color: "#7D3796",
		});

		writeText({
			ctx: context,
			start: { x: -  canvas.width / 2.5, y: 0 },
			end: { x: - canvas.width / 2.5, y: - 300 },
			text: "Ruang bayangan (depan)",
			color: "#3E8497",
		});

		writeText({
			ctx: context,
			start: { x: canvas.width / 2.5, y: 0 },
			end: { x: canvas.width / 2.5, y: 300 },
			text: "Ruang benda (belakang)",
			color: "#7D3796",
		});

		writeText({
			ctx: context,
			start: { x: canvas.width / 2.5, y: 0 },
			end: { x: canvas.width / 2.5, y: - 300 },
			text: "Ruang bayangan (belakang)",
			color: "#3E8497",
		});

	} else {
		// Draw Focus coordinate
		drawLine({
			ctx: context,
			start: { x: - mirrorFocus, y: 60 },
			end: { x: -	mirrorFocus, y: 60 },
			color: "purple",
			text: "F2",
		});

		drawLine({
			ctx: context,
			start: { x: mirrorFocus, y: -60 },
			end: { x: mirrorFocus, y: -60 },
			color: "purple",
			text: "F1",
		});

		// Draw Curvature Point left-side
		drawLine({
			ctx: context,
			start: { x: - mirrorFocus * 2, y: 60 },
			end: { x: -	mirrorFocus * 2, y: 60 },
			color: "brown",
			text: "M2",
		});
		//text for 1st object dimension(ruang cahaya I) left-side
		writeText({
			ctx: context,
			start: { x: - mirrorFocus + mirrorFocus * 0.5, y: 20 },
			end: { x: -	mirrorFocus + mirrorFocus * 0.5, y: 20 },
			text: "Ruang I",
			color: "black",
		});
		//text for 2nd object dimension(ruang cahaya II) left-side
		writeText({
			ctx: context,
			start: { x: - mirrorFocus * 1.5, y: 20 },
			end: { x: -	mirrorFocus * 1.5, y: 20 },
			text: "Ruang II",
			color: "black",
		});
		//text for 3rd object dimension(ruang cahaya III) left-side
		writeText({
			ctx: context,
			start: { x: - mirrorFocus * 2.5, y: 20 },
			end: { x: -	mirrorFocus * 2.5, y: 20 },
			text: "Ruang III",
			color: "black",
		});

		//text for 4th object dimension(ruang cahaya IV) left-side
		writeText({
			ctx: context,
			start: { x: -canvas.width / 4, y: -20 },
			end: { x: - canvas.width / 4, y: -20 },
			text: "(Ruang IV bayangan)",
			color: "black",
		});

		// Draw Curvature Point right-side
		drawLine({
			ctx: context,
			start: { x: mirrorFocus * 2, y: -60 },
			end: { x: mirrorFocus * 2, y: -60 },
			color: "brown",
			text: "M1",
		});
		//text for 1st object dimension(ruang cahaya I) right-side
		writeText({
			ctx: context,
			start: { x: mirrorFocus * 0.5, y: -20 },
			end: { x: mirrorFocus * 0.5, y: - 20 },
			text: "Ruang I",
			color: "black",
		});
		writeText({
			ctx: context,
			start: { x: mirrorFocus * 0.5, y: -30 },
			end: { x: mirrorFocus * 0.5, y: - 30 },
			text: "(bayangan)",
			color: "black",
		});
		//text for 2nd object dimension(ruang cahaya II) right-side
		writeText({
			ctx: context,
			start: { x: mirrorFocus * 1.5, y: -20 },
			end: { x: mirrorFocus * 1.5, y: - 20 },
			text: "Ruang II",
			color: "black",
		});
		writeText({
			ctx: context,
			start: { x: mirrorFocus * 1.5, y: -30 },
			end: { x: mirrorFocus * 1.5, y: - 30 },
			text: "(bayangan)",
			color: "black",
		});

		//text for 3rd object dimension(ruang cahaya III) right-side
		writeText({
			ctx: context,
			start: { x: mirrorFocus * 2.5, y: -20 },
			end: { x: mirrorFocus * 2.5, y: - 20 },
			text: "Ruang III",
			color: "black",
		});
		writeText({
			ctx: context,
			start: { x: mirrorFocus * 2.5, y: - 30 },
			end: { x: mirrorFocus * 2.5, y: - 30 },
			text: "(bayangan)",
			color: "black",
		});
		//text for 4th object dimension(ruang cahaya IV) right-side
		writeText({
			ctx: context,
			start: { x: canvas.width / 4, y: 20 },
			end: { x: canvas.width / 4, y: 20 },
			text: "Ruang IV",
			color: "black",
		});

		writeText({
			ctx: context,
			start: { x: - canvas.width / 2.5, y: 0 },
			end: { x: - canvas.width / 2.5, y: 0 },
			text: "",
			color: "#7D379",
		});

		//text keterangan ruang benda
		writeText({
			ctx: context,
			start: { x: - canvas.width / 2.5, y: 300 },
			end: { x: - canvas.width / 2.5, y: 300 },
			text: "Ruang benda (depan)",
			color: "#3E8497",
		});

		writeText({
			ctx: context,
			start: { x: - canvas.width / 2.5, y: 300 },
			end: { x: - canvas.width / 2.5, y: 300 },
			text: "Ruang benda (depan)",
			color: "#7D3796",
		});

		writeText({
			ctx: context,
			start: { x: -  canvas.width / 2.5, y: -300 },
			end: { x: - canvas.width / 2.5, y: - 300 },
			text: "Ruang bayangan (depan)",
			color: "#3E8497",
		});

		writeText({
			ctx: context,
			start: { x: canvas.width / 2.5, y: 300 },
			end: { x: canvas.width / 2.5, y: 300 },
			text: "Ruang benda (belakang)",
			color: "#7D3796",
		});

		writeText({
			ctx: context,
			start: { x: canvas.width / 2.5, y: -300 },
			end: { x: canvas.width / 2.5, y: - 300 },
			text: "Ruang bayangan (belakang)",
			color: "#3E8497",
		});
	}
}
