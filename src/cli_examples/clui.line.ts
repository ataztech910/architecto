export const renderLine = (CLI: any, clc: any) => {
    const Line = CLI.Line;
    const LineBuffer = CLI.LineBuffer;

    const outputBuffer = new LineBuffer({
        x: 0,
        y: 0,
        width: 'console',
        height: 'console'
    });

    const headers = new Line(outputBuffer)
    .padding(2)
    .column('Column One', 20, [clc.cyan])
    .column('Column Two', 20, [clc.cyan])
    .column('Column Three', 20, [clc.cyan])
    .column('Column Four', 20, [clc.cyan])
    .fill()
    .output();
    
    const line = new Line(outputBuffer)
    .padding(2)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 20)
    .column((Math.random()*100).toFixed(3), 20)
    .fill()
    .output();

    return outputBuffer;
}