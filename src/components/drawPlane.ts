import writeText from "@/utils/writeText";
import drawLine from "@/utils/drawLine";



export default function drawPlane(
	context: CanvasRenderingContext2D,
	objectDistance: number,
	objectHeight: number,
) {
//draw Boeing 767
const planeTipDistance =  2* objectDistance
const planeTipHeight = 3/4 *objectHeight
writeText({
    ctx: context,
    start: { x: -planeTipDistance - 30, y: planeTipHeight + 12},
    end: {x: -planeTipDistance - 30, y: planeTipHeight + 12},
    text: "boeing 767",
    color: "black",
})
    //plane's head
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance, y: planeTipHeight},
        end: { x: -planeTipDistance - 10, y: planeTipHeight + 10},
        color: "#5A5A5A",
    })
    //plane's pilot window
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 15, y: planeTipHeight + 6},
        end: { x: -planeTipDistance - 6, y: planeTipHeight + 6},
        color: "#5A5A5A",
    })
    //plane's bottom 1
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance, y: planeTipHeight},
        end: { x: -planeTipDistance - 25, y: planeTipHeight},
        color: "#5A5A5A",
    })
    //plane's bottom 2
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 35, y: planeTipHeight + 1},
        end: { x: -planeTipDistance - 52, y: planeTipHeight + 2},
        color: "#5A5A5A",
    })
    //plane's upper
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 10, y: planeTipHeight + 10},
        end: { x: -planeTipDistance - 50, y: planeTipHeight + 10},
        color: "#5A5A5A",
    })
    //plane's tail
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 50, y: planeTipHeight + 10},
        end: { x: -planeTipDistance - 55, y: planeTipHeight + 17},
        color: "#5A5A5A",
    })
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 55, y: planeTipHeight + 17},
        end: { x: -planeTipDistance - 59, y: planeTipHeight + 17},
        color: "#5A5A5A",
    })
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 59, y: planeTipHeight + 17},
        end: { x: -planeTipDistance - 56, y: planeTipHeight + 5},
        color: "#5A5A5A",
    })
    //plane's wing 1
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 47, y: planeTipHeight + 5},
        end: { x: -planeTipDistance - 56, y: planeTipHeight},
        color: "#5A5A5A",
    })
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 56, y: planeTipHeight},
        end: { x: -planeTipDistance - 62, y: planeTipHeight},
        color: "#5A5A5A",
    })
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 60, y: planeTipHeight},
        end: { x: -planeTipDistance - 54, y: planeTipHeight + 5},
        color: "#5A5A5A",
    })
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 54, y: planeTipHeight + 5},
        end: { x: -planeTipDistance - 47, y: planeTipHeight + 5},
        color: "#5A5A5A",
    })
    //plane's wing 2
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 20, y: planeTipHeight + 3},
        end: { x: -planeTipDistance - 42, y: planeTipHeight - 10},
        color: "#5A5A5A",
    })
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 42, y: planeTipHeight - 10},
        end: { x: -planeTipDistance - 50, y: planeTipHeight - 10},
        color: "#5A5A5A",
    })
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 48, y: planeTipHeight - 10},
        end: { x: -planeTipDistance - 32, y: planeTipHeight + 3},
        color: "#5A5A5A",
    })
    drawLine({
        ctx: context,
        start: { x: -planeTipDistance - 32, y: planeTipHeight + 3},
        end: { x: -planeTipDistance - 20, y: planeTipHeight + 3},
        color: "#5A5A5A",
    })

}