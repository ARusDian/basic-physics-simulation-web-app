import { ChangeEventHandler } from "react";

interface SliderInterface {
	min: number,
	max: number,
	className?: string,
	handler: ChangeEventHandler<HTMLInputElement>
	value: number,
	step:number
}


const Slider = (props: SliderInterface) => {
	// console.log(props.value);
	return (
		<input type="range" min={props.min} max={props.max} className={props.className} onChange={props.handler} value={props.value} step={props.step} />
	);
};

export default Slider;
