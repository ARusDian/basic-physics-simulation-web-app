const DDA = (startC: { x: number, y: number }, endC: { x: number, y: number }) => {
	const dX = endC.x - startC.x;
	const dY = endC.y - startC.y;
	// const M = dY / dX;
	const steps = Math.abs(Math.abs(dX) > Math.abs(dY) ? dX : dY);

	const xi = dX / steps;
	const yi = dY / steps;
	const values = [];

	values.push({
		x: startC.x,
		y: startC.y
	});

	let x: number = startC.x, y: number = startC.y;
	for (let i = 0; i < steps; i++) {
		x += xi;
		y += yi;
		values.push({
			x,
			y
		});
	}

	return {steps,values};

};


export default DDA;
