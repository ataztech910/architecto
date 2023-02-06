export const renderProgress = (CLI: any) => {
 
    const Progress = CLI.Progress;
    
    const thisProgressBar = new Progress(20);
    console.log(thisProgressBar.update(10, 30));
    
    // or
    
    // const thisPercentBar = new Progress(20);
    // console.log(thisPercentBar.update(0.4));

}