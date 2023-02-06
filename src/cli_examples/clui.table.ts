export const renderTable = (CLI: any, clc: any) => {
    const Line = CLI.Line;

    const LineBuffer = CLI.LineBuffer;
    
    const outputBuffer = new LineBuffer({
        x: 0,
        y: 0,
        width: 'console',
        height: 'console'
        });
    
    const message = new Line(outputBuffer)
        .column('Title of the table data', 30, [clc.green])
        .fill()
        .store();
    
    const blankLine = new Line(outputBuffer)
    .fill()
    .store();
    
    const header = new Line(outputBuffer)
        .column('ID', 10, [clc.cyan])
        .column('Volume', 20, [clc.cyan])
        .column('Counter', 20, [clc.cyan])
        .column('Date', 11, [clc.cyan])
        .fill()
        .store();
    
    let line;
    for(let l = 0; l < 20; l++)
    {
    line = new Line(outputBuffer)
        .column((Math.random()*100).toFixed(3), 10)
        .column((Math.random()*100).toFixed(3), 20)
        .column((Math.random()*100).toFixed(3), 20)
        .column((Math.random()*100).toFixed(3), 11)
        .fill()
        .store();
    }
    return outputBuffer;
}